/* ===========================================================================
   POSTCARDS & PLANS — api.js
   One client for both consoles.

   CLOUD MODE   Talks to the Google Apps Script Web App in Code.gs.
                Requests are POST with Content-Type: text/plain so the browser
                treats them as "simple requests" and skips the CORS preflight
                that Apps Script cannot answer. Do not change that header.

   DEMO MODE    If no API URL is configured (or the network call fails), every
                operation runs against localStorage instead, so the app is
                fully playable offline. Progress then lives in that one
                browser only, and the banner says so.
   =========================================================================== */
(function (global) {
  'use strict';

  /* ---- WHERE THE SERVER ADDRESS COMES FROM -------------------------------
     1. A student's own override, saved under Settings (localStorage)
     2. window.PP_API_URL — set in index.html and teacher.html. Edit it there.
     3. The fallback below, if you would rather keep it in one place.      */
  var API_URL = (typeof window !== 'undefined' && window.PP_API_URL) || '';
  /* ----------------------------------------------------------------------- */

  var LS_URL = 'pp.apiUrl';
  var LS_DEMO = 'pp.demo.v1';
  var LS_SESSION = 'pp.session';
  var LS_OUTBOX = 'pp.outbox.v1';   /* answers written but not yet acknowledged */
  var LS_TOKEN = 'pp.token';        /* per-student session token from the server */

  try { API_URL = localStorage.getItem(LS_URL) || API_URL; } catch (e) {}

  var state = {
    mode: API_URL ? 'cloud' : 'demo',
    url: API_URL,
    student: null,
    sessionId: null,
    sessionStart: 0,
    queue: [],
    token: null,
    lastError: null
  };
  try { state.token = localStorage.getItem(LS_TOKEN) || null; } catch (e) {}

  /* ------------------------------------------------------------- outbox
     Answers are queued here the moment they happen and only cleared once the
     server has acknowledged them. Because the queue lives in localStorage it
     survives a reload, a closed laptop lid and a flat battery — which is what
     lets the app stay quiet about a dropped connection instead of alarming a
     sixteen-year-old mid-lesson. */
  function outbox() {
    try { return JSON.parse(localStorage.getItem(LS_OUTBOX)) || []; } catch (e) { return []; }
  }
  function setOutbox(rows) {
    try { localStorage.setItem(LS_OUTBOX, JSON.stringify(rows.slice(-3000))); } catch (e) {}
  }

  /* -------------------------------------------------------------- storage */
  function db() {
    try { return JSON.parse(localStorage.getItem(LS_DEMO)) || { students: {}, attempts: [], sessions: [] }; }
    catch (e) { return { students: {}, attempts: [], sessions: [] }; }
  }
  function saveDb(d) {
    try { localStorage.setItem(LS_DEMO, JSON.stringify(d)); } catch (e) {}
  }
  function hash(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; }
    return 'h' + h.toString(36);
  }

  /* ---------------------------------------------------------------- cloud */
  /* A stalled network is worse than a failed one: a captive portal or a
     half-connected hotspot can leave a fetch hanging for minutes, and the
     student just sees "Creating your account…" forever. Time every request
     out so it fails fast and the local fallback takes over. */
  var TIMEOUT_MS = 12000;

  function post(action, payload) {
    if (state.token) payload.token = state.token;
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer;
    var req = fetch(state.url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: action, payload: payload || {} }),
      redirect: 'follow',
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
    var guard = new Promise(function (_, reject) {
      timer = setTimeout(function () {
        if (ctrl) { try { ctrl.abort(); } catch (e) {} }
        reject(new Error('Timed out after ' + (TIMEOUT_MS / 1000) + 's'));
      }, TIMEOUT_MS);
    });
    return Promise.race([req, guard]).then(
      function (v) { clearTimeout(timer); return v; },
      function (e) { clearTimeout(timer); throw e; }
    );
  }

  /* Try cloud, fall back to the local implementation on any failure.
     A classroom wifi drop should degrade to demo, not to a blank screen. */
  function call(action, payload, localFn) {
    if (state.mode !== 'cloud') return Promise.resolve(localFn());
    return post(action, payload).catch(function (err) {
      state.lastError = String(err.message || err);
      state.mode = 'demo';
      if (global.API && typeof global.API.onModeChange === 'function') global.API.onModeChange('demo', state.lastError);
      return localFn();
    });
  }

  /* ------------------------------------------------------------- students */
  function localRegister(id, pw, name) {
    var d = db();
    if (d.students[id]) return { ok: false, error: 'That student ID is already taken. Try logging in instead.' };
    d.students[id] = { id: id, name: name || id, pw: hash(pw), created: new Date().toISOString() };
    d.students[id].progress = global.Engine.Progress.blank(id, name || id);
    saveDb(d);
    return { ok: true, progress: d.students[id].progress };
  }
  function localLogin(id, pw) {
    var d = db();
    var s = d.students[id];
    if (!s) return { ok: false, error: 'No account with that ID. Create one first.' };
    if (s.pw !== hash(pw)) return { ok: false, error: 'Wrong password.' };
    return { ok: true, progress: s.progress };
  }
  function localSave(progress, attempts) {
    var d = db();
    if (!d.students[progress.studentId]) {
      d.students[progress.studentId] = { id: progress.studentId, name: progress.displayName, pw: hash('demo'), created: new Date().toISOString() };
    }
    d.students[progress.studentId].progress = progress;
    d.students[progress.studentId].name = progress.displayName;
    (attempts || []).forEach(function (a) { d.attempts.push(a); });
    if (d.attempts.length > 6000) d.attempts = d.attempts.slice(-6000);
    saveDb(d);
    return { ok: true };
  }
  function localRoster() {
    var d = db();
    return {
      ok: true,
      students: Object.keys(d.students).map(function (k) {
        var s = d.students[k];
        return { id: s.id, name: s.name, created: s.created, progress: s.progress };
      })
    };
  }
  function localDetail(id) {
    var d = db();
    var s = d.students[id];
    if (!s) return { ok: false, error: 'Not found' };
    return {
      ok: true, student: { id: s.id, name: s.name, created: s.created }, progress: s.progress,
      attempts: d.attempts.filter(function (a) { return a.studentId === id; }),
      sessions: d.sessions.filter(function (x) { return x.studentId === id; })
    };
  }
  function localSession(kind, row) {
    var d = db();
    if (kind === 'start') { d.sessions.push(row); }
    else {
      for (var i = d.sessions.length - 1; i >= 0; i--) {
        if (d.sessions[i].sessionId === row.sessionId) {
          d.sessions[i].logoutTs = row.logoutTs;
          d.sessions[i].durationSec = row.durationSec;
          d.sessions[i].items = row.items;
          d.sessions[i].correct = row.correct;
          break;
        }
      }
    }
    if (d.sessions.length > 2000) d.sessions = d.sessions.slice(-2000);
    saveDb(d);
    return { ok: true };
  }
  function localAssign(id, paper) {
    var d = db();
    if (!d.students[id]) return { ok: false, error: 'Not found' };
    d.students[id].progress.assignment = paper;
    saveDb(d);
    return { ok: true };
  }

  /* ------------------------------------------------------------------ API */
  var API = {
    get mode() { return state.mode; },
    get url() { return state.url; },
    get lastError() { return state.lastError; },
    onModeChange: null,

    /* Called on a timer while offline: if an address is configured, flip back
       to cloud and let the next real call prove it. */
    retryCloud: function () {
      if (state.url && state.mode !== 'cloud') { state.mode = 'cloud'; return true; }
      return false;
    },
    setUrl: function (u) {
      state.url = (u || '').trim();
      state.mode = state.url ? 'cloud' : 'demo';
      try { state.url ? localStorage.setItem(LS_URL, state.url) : localStorage.removeItem(LS_URL); } catch (e) {}
      return state.mode;
    },
    ping: function () {
      if (state.mode !== 'cloud') return Promise.resolve({ ok: false, mode: 'demo' });
      return post('ping', {}).then(function (r) { return { ok: !!r.ok, mode: 'cloud', sheet: r.sheet }; })
        .catch(function (e) { return { ok: false, mode: 'cloud', error: String(e.message || e) }; });
    },

    register: function (id, pw, name) {
      return call('register', { id: id, pw: pw, name: name }, function () { return localRegister(id, pw, name); })
        .then(keepToken);
    },
    login: function (id, pw) {
      return call('login', { id: id, pw: pw }, function () { return localLogin(id, pw); })
        .then(keepToken);
    },

    /* Queue answers immediately; hand the whole outstanding queue to the
       server on every attempt, and only clear what it confirms. */
    enqueue: function (rows) {
      if (!rows || !rows.length) return;
      setOutbox(outbox().concat(rows));
    },
    pendingCount: function () { return outbox().length; },
    save: function (progress) {
      var rows = outbox();
      var n = rows.length;
      return call('save', { progress: progress, attempts: rows },
        function () { return localSave(progress, rows); })
        .then(function (r) {
          if (r && r.ok) {
            var now = outbox();
            setOutbox(now.slice(n));          /* anything added mid-flight stays */
          }
          return r;
        });
    },

    /* Last-gasp send when the tab is closing. fetch() is cancelled on unload;
       sendBeacon is not. */
    flushBeacon: function (progress) {
      var rows = outbox();
      if (!state.url || state.mode !== 'cloud' || !navigator.sendBeacon) return false;
      try {
        var body = new Blob([JSON.stringify({
          action: 'save', payload: { progress: progress, attempts: rows, token: state.token }
        })], { type: 'text/plain;charset=utf-8' });
        var ok = navigator.sendBeacon(state.url, body);
        if (ok) setOutbox([]);
        return ok;
      } catch (e) { return false; }
    },

    startSession: function (studentId) {
      state.sessionId = 'S' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      state.sessionStart = Date.now();
      var row = { sessionId: state.sessionId, studentId: studentId, loginTs: new Date().toISOString(), logoutTs: '', durationSec: 0, items: 0, correct: 0 };
      try { localStorage.setItem(LS_SESSION, JSON.stringify(row)); } catch (e) {}
      return call('session', { kind: 'start', row: row }, function () { return localSession('start', row); });
    },
    endSession: function (studentId, items, correct) {
      if (!state.sessionId) return Promise.resolve({ ok: true });
      var row = {
        sessionId: state.sessionId, studentId: studentId,
        logoutTs: new Date().toISOString(),
        durationSec: Math.round((Date.now() - state.sessionStart) / 1000),
        items: items || 0, correct: correct || 0
      };
      var sid = state.sessionId;
      state.sessionId = null;
      try { localStorage.removeItem(LS_SESSION); } catch (e) {}
      return call('session', { kind: 'end', row: row }, function () { return localSession('end', row); })
        .then(function (r) { r.sessionId = sid; return r; });
    },

    /* teacher */
    teacherLogin: function (pin) {
      return call('teacherLogin', { pin: pin }, function () {
        var d = db();
        var want = d.teacherPin || '1234';
        return want === String(pin) ? { ok: true } : { ok: false, error: 'Wrong teacher PIN. The demo PIN is 1234.' };
      });
    },
    roster: function () { return call('roster', {}, localRoster); },
    detail: function (id) { return call('detail', { id: id }, function () { return localDetail(id); }); },
    assign: function (id, paper) { return call('assign', { id: id, paper: paper }, function () { return localAssign(id, paper); }); },

    /* Local store, used only as an offline fallback for a real account.
       There is no preview or demo mode: every interaction belongs to a
       signed-in student and is queued for the class sheet. */
    localCount: function () { return Object.keys(db().students).length; }
  };

  function keepToken(r) {
    if (r && r.ok && r.token) {
      state.token = r.token;
      try { localStorage.setItem(LS_TOKEN, r.token); } catch (e) {}
    }
    return r;
  }
  API.clearToken = function () {
    state.token = null;
    try { localStorage.removeItem(LS_TOKEN); } catch (e) {}
  };

  global.API = API;
})(window);
