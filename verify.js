/* Structural integrity check for content.js. Run: node verify.js */
const C = require('./content.js');
let errs = [], warns = [], ids = {}, tagsUsed = {}, count = 0;

function check(it, where) {
  count++;
  if (!it.id) errs.push(where + ': item with no id');
  if (ids[it.id]) errs.push('duplicate id: ' + it.id + ' (' + where + ')');
  ids[it.id] = where;
  if (!it.type) errs.push(it.id + ': no type');
  if (!it.tag) errs.push(it.id + ': no tag');
  else {
    tagsUsed[it.tag] = (tagsUsed[it.tag] || 0) + 1;
    if (!C.REMEDIATION[it.tag]) errs.push(it.id + ': tag "' + it.tag + '" missing from REMEDIATION');
  }
  if (!it.level) errs.push(it.id + ': no level');
  else if (C.CEFR.indexOf(it.level) < 0) errs.push(it.id + ': bad level "' + it.level + '"');
  if (!it.why) errs.push(it.id + ': no why');

  const T = it.type;
  if (['choose', 'equiv', 'table'].includes(T)) {
    if (!Array.isArray(it.options) || it.options.length < 2) errs.push(it.id + ': needs options');
    else if (!(it.answer >= 0 && it.answer < it.options.length)) errs.push(it.id + ': answer out of range');
  }
  if (T === 'gap') {
    if (!it.lines) errs.push(it.id + ': gap needs lines');
    else if (!it.lines.some(l => /___/.test(l.text))) errs.push(it.id + ': gap has no ___ blank');
    if (it.options) {
      if (!(it.answer >= 0 && it.answer < it.options.length)) errs.push(it.id + ': answer out of range');
    } else if (!it.accept) errs.push(it.id + ': gap needs options or accept');
  }
  if (T === 'judge') {
    if (!it.given) errs.push(it.id + ': judge needs given');
    if (!(it.answer >= 0 && it.answer <= 2)) errs.push(it.id + ': judge answer must be 0-2');
  }
  if (T === 'equiv' && !it.given) errs.push(it.id + ': equiv needs given');
  if (T === 'spot') {
    if (!Array.isArray(it.words)) errs.push(it.id + ': spot needs words');
    else if (!(it.answer >= 0 && it.answer < it.words.length)) errs.push(it.id + ': spot answer out of range');
    if (!it.fix) errs.push(it.id + ': spot needs fix');
    if (Array.isArray(it.words) && it.words.some(w => /\s/.test(w))) warns.push(it.id + ': a "word" contains a space');
  }
  if (T === 'build') {
    if (!Array.isArray(it.tiles)) errs.push(it.id + ': build needs tiles');
    if (!it.solution) errs.push(it.id + ': build needs solution');
    else if (Array.isArray(it.tiles)) {
      const norm = s => String(s).toLowerCase().replace(/[’']/g, "'").replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
      const joined = norm(it.tiles.join(' '));
      const oks = [it.solution].concat(it.alt || []).map(norm);
      if (!oks.includes(joined)) errs.push(it.id + ': tiles cannot form the solution\n      tiles -> "' + joined + '"\n      soln  -> "' + oks[0] + '"');
      const seen = {};
      it.tiles.forEach(t => { if (seen[t]) warns.push(it.id + ': repeated tile "' + t + '"'); seen[t] = 1; });
    }
  }
  if (T === 'order') {
    if (!Array.isArray(it.items) || it.items.length < 2) errs.push(it.id + ': order needs items');
  }
  if (T === 'sort') {
    if (!Array.isArray(it.bins) || !Array.isArray(it.items)) errs.push(it.id + ': sort needs bins and items');
    else {
      const keys = it.bins.map(b => b.key);
      if (new Set(keys).size !== keys.length) errs.push(it.id + ': duplicate bin keys');
      it.items.forEach(x => { if (!keys.includes(x.bin)) errs.push(it.id + ': item "' + x.text + '" has bin "' + x.bin + '" with no matching box'); });
      keys.forEach(k => { if (!it.items.some(x => x.bin === k)) warns.push(it.id + ': box "' + k + '" is empty'); });
      it.bins.forEach(b => { if (!b.label) errs.push(it.id + ': bin missing label'); });
    }
  }
  if (T === 'pick') {
    if (!Array.isArray(it.items)) errs.push(it.id + ': pick needs items');
    else if (!(it.answer >= 0 && it.answer < it.items.length)) errs.push(it.id + ': pick answer out of range');
  }
  if (it.art && !['lounge','desk','tags','timetable','contract','board','nightflight','arrivals','hotel','shop','suitcase'].includes(it.art)) {
    errs.push(it.id + ': unknown art "' + it.art + '"');
  }
}

/* ---- stages ---- */
if (C.STAGES.length !== 8) errs.push('expected 8 stages, got ' + C.STAGES.length);
C.STAGES.forEach((st, i) => {
  const n = i + 1;
  if (st.id !== 's' + n) errs.push('stage ' + n + ': id should be s' + n + ', got ' + st.id);
  if (st.n !== n) errs.push('stage ' + n + ': n field is ' + st.n);
  ['name', 'cefr', 'gate', 'blurb', 'art'].forEach(k => { if (!st[k]) errs.push(st.id + ': missing ' + k); });
  if (!st.challenge) errs.push(st.id + ': no challenge attached');
  else {
    if (st.challenge.id !== 's' + n + 'ch') errs.push(st.id + ': challenge id should be s' + n + 'ch (Code.gs depends on this)');
    if (st.challenge.items.length < 8) warns.push(st.id + ': challenge has only ' + st.challenge.items.length + ' items');
    st.challenge.items.forEach(it => check(it, st.id + ' challenge'));
  }
  if (st.lessons.length !== 3) errs.push(st.id + ': expected 3 lessons, got ' + st.lessons.length);
  st.lessons.forEach((ls, j) => {
    const want = 's' + n + 'l' + (j + 1);
    if (ls.id !== want) errs.push(st.id + ': lesson id should be ' + want + ', got ' + ls.id);
    /* student.js does E.Bank.stage(+lessonId.charAt(1)) — this must hold */
    if (+String(ls.id).charAt(1) !== n) errs.push(ls.id + ': charAt(1) must be the stage number (student.js openLesson)');
    if (!ls.name || !ls.cefr) errs.push(ls.id + ': missing name or cefr');
    const t = ls.theory || {};
    if (!t.key) errs.push(ls.id + ': theory has no key');
    if (!Array.isArray(t.body) || t.body.length < 3) errs.push(ls.id + ': theory body too short');
    if (!Array.isArray(t.simple) || t.simple.length < 3) errs.push(ls.id + ': no simple-English version');
    if (!Array.isArray(t.examples) || t.examples.length < 2) errs.push(ls.id + ': needs examples');
    else t.examples.forEach(e => { if (!e.s || !e.g) errs.push(ls.id + ': example missing s or g'); });
    if (ls.items.length < 5) warns.push(ls.id + ': only ' + ls.items.length + ' items');
    ls.items.forEach(it => check(it, ls.id));
  });
});

/* ---- verify bank ---- */
for (let lv = 1; lv <= 8; lv++) {
  const pool = C.VERIFY[lv];
  if (!pool) { errs.push('VERIFY level ' + lv + ' missing'); continue; }
  if (pool.length < 6) warns.push('VERIFY level ' + lv + ': only ' + pool.length + ' items (verifyPaper wants ~6 at level)');
  pool.forEach(it => check(it, 'VERIFY ' + lv));
}

/* ---- ranks / badges ---- */
if (C.RANKS.length !== 9) errs.push('RANKS must have 9 entries (0-8), got ' + C.RANKS.length);
C.RANKS.forEach((r, i) => { if (r.n !== i) errs.push('RANKS[' + i + '].n is ' + r.n); if (!r.name || !r.note) errs.push('RANKS[' + i + '] incomplete'); });
const BADGE_TESTS = ['passport','streak3','streak7','streak14','upgrade','firstclass','solo','reclaim','tailwind','rebooked','nonstop','quickdraw','frequent'];
BADGE_TESTS.forEach(id => { if (!C.BADGES.some(b => b.id === id)) errs.push('engine.js has a test for badge "' + id + '" but content.js does not define it'); });
C.BADGES.forEach(b => {
  if (!BADGE_TESTS.includes(b.id)) errs.push('badge "' + b.id + '" has no test in engine.js — it can never be earned');
  if (!b.name || !b.perk || !b.how) errs.push('badge ' + b.id + ' incomplete');
});

/* ---- remediation coverage ---- */
Object.keys(C.REMEDIATION).forEach(t => {
  const r = C.REMEDIATION[t];
  if (!r.name || !r.principle) errs.push('REMEDIATION.' + t + ' incomplete');
  if (!r.reteach) warns.push('REMEDIATION.' + t + ': no reteach line');
  if (!Array.isArray(r.activities) || !r.activities.length) warns.push('REMEDIATION.' + t + ': no activities');
  if (!tagsUsed[t]) warns.push('tag "' + t + '" is defined but never used by any item');
});

/* ---- report ---- */
console.log('items checked: ' + count + '  ·  unique ids: ' + Object.keys(ids).length);
console.log('tags in use: ' + Object.keys(tagsUsed).length + ' of ' + Object.keys(C.REMEDIATION).length);
const lv = {};
Object.values(ids); C.STAGES.forEach(s => s.lessons.forEach(l => l.items.forEach(i => lv[i.level] = (lv[i.level] || 0) + 1)));
console.log('lesson items by CEFR: ' + C.CEFR.map(x => x + '=' + (lv[x] || 0)).join('  '));
if (warns.length) { console.log('\nWARNINGS (' + warns.length + ')'); warns.forEach(w => console.log('  ! ' + w)); }
if (errs.length) { console.log('\nERRORS (' + errs.length + ')'); errs.forEach(e => console.log('  x ' + e)); process.exit(1); }
console.log('\nPASS — no structural errors.');
