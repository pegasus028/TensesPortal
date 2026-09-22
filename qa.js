/* Pedagogical QA for content.js — the checks that catch BAD QUESTIONS rather
   than broken data. verify.js proves the items load; this proves they are fair.
   Run: node qa.js                                                            */
const C = require('./content.js');
const strip = x => String(x || '').replace(/<[^>]+>/g, '');
const norm = x => strip(x).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();

const items = [];
C.STAGES.forEach(st => {
  st.lessons.forEach(l => l.items.forEach(i => items.push([l.id, i])));
  st.challenge.items.forEach(i => items.push([st.challenge.id, i]));
});
Object.keys(C.VERIFY).forEach(k => C.VERIFY[k].forEach(i => items.push(['VERIFY' + k, i])));

const issues = [];
const flag = (id, where, msg) => issues.push({ id, where, msg });

items.forEach(([where, it]) => {
  const stem = norm(it.stem);

  /* 1. A "spot" item is rendered under the heading "Find the mistake". If its
        stem does not ask for a mistake, the student is being misdirected. */
  if (it.type === 'spot') {
    const asksForError = /\b(wrong|mistake|error|cannot stay|does not fit|should be|doing no work|too blunt|overstates|breaks|say the wrong thing)\b/.test(stem);
    if (!asksForError) flag(it.id, where, 'spot item, but the stem does not ask the student to find a mistake — the widget is labelled "Find the mistake"');

    /* 2. Only ONE token can be clicked, so a plural stem misdescribes the task. */
    if (/\b(words|phrase|phrases|two words)\b/.test(stem)) flag(it.id, where, 'spot stem says "' + stem.match(/\b(words|phrase|phrases|two words)\b/)[0] + '" but the widget accepts exactly one click');

    /* 3. On lock the app prints "<clicked word> → <fix>". If fix repeats the
          word, that renders as "had → had — ...". */
    const w = norm(it.words[it.answer]), f = norm(it.fix);
    if (f === w || f.startsWith(w + ' ')) flag(it.id, where, 'fix text starts with the clicked word, so the feedback line reads "' + strip(it.words[it.answer]) + ' → ' + strip(it.fix) + '"');
  }

  /* 4. A sort box hint must not enumerate the answers. */
  if (it.type === 'sort') {
    it.bins.forEach(b => {
      const hint = norm(b.hint);
      if (!hint) return;
      const given = it.items.filter(x => norm(hint).split(' ').includes(norm(x.text)) || hint.includes(norm(x.text)));
      if (given.length) flag(it.id, where, 'box "' + b.label + '" hint "' + b.hint + '" contains the text of ' + given.length + ' item(s) it is the answer for');
      /* the hint quoting a distinctive word from its own chips is the same leak */
      const hintWords = new Set(hint.split(' ').filter(w => w.length >= 4));
      const own = it.items.filter(x => x.bin === b.key);
      const leaked = own.filter(x => norm(x.text).split(' ').some(w => w.length >= 4 && hintWords.has(w)));
      if (leaked.length && !given.length) flag(it.id, where, 'box "' + b.label + '" hint shares a distinctive word with its own chips (' + leaked.map(x => '"' + strip(x.text) + '"').join(', ') + '): "' + b.hint + '"');
    });
    if (it.items.length > 6) flag(it.id, where, it.items.length + ' chips to place and sorting is all-or-nothing — consider splitting');
  }

  /* 5. Every gap must still be a sentence once the answer is dropped in.
        Catch the commonest breakage: a bare past participle or -ing with no
        auxiliary in front of it. */
  if (it.type === 'gap' && it.options) {
    const line = it.lines.find(l => /___/.test(l.text));
    const filled = norm(String(line.text).replace('___', strip(it.options[it.answer])));
    const bad = filled.match(/\b(?:i|we|you|they|he|she|it|[a-z]+s)\s+(?:just|still|already|yet|never|always|nearly)\s+(been|being|gone|done|seen|had|got)\b/);
    if (bad) flag(it.id, where, 'with the correct option the line reads "' + filled + '" — an auxiliary looks to be missing');
  }

  /* 6. Distractors should be distinct answers, not variants of each other. */
  if (it.options && it.options.length > 2) {
    for (let a = 0; a < it.options.length; a++)
      for (let b = a + 1; b < it.options.length; b++) {
        const x = norm(it.options[a]), y = norm(it.options[b]);
        if (x === y) flag(it.id, where, 'two identical options: "' + x + '"');
        else if (x && y && (x === y + ' with' || y === x + ' with' || x === y.replace(/^the /, '') || y === x.replace(/^the /, '')))
          flag(it.id, where, 'near-duplicate options: "' + x + '" / "' + y + '"');
      }
  }

  /* 7. A judge item whose own explanation hedges is not answerable T/F. */
  if (it.type === 'judge') {
    const why = norm(it.why);
    if (/\b(reasonably so|more or less|roughly|arguably|probably true|sort of)\b/.test(why))
      flag(it.id, where, 'True/False item whose explanation hedges — the stem is not cleanly answerable');
    if (!/\?$/.test(strip(it.stem).trim())) flag(it.id, where, 'judge stem is not a question');
  }
});

/* 8. The Hint button prints REMEDIATION[tag].principle. It must not contain the
      answer to any item carrying that tag. */
Object.keys(C.REMEDIATION).forEach(tag => {
  const hint = norm(C.REMEDIATION[tag].principle);
  items.filter(([, i]) => i.tag === tag).forEach(([where, it]) => {
    const answers = [];
    if (it.type === 'spot') answers.push(strip(it.fix).replace(/^delete\s*/i, '').replace(/["']/g, ''));
    if (it.type === 'build') answers.push(it.solution);
    if (it.options && it.type !== 'judge') answers.push(strip(it.options[it.answer]));
    answers.map(norm).filter(a => a.length > 4 && a.split(' ').length <= 4).forEach(a => {
      if (hint.includes(a)) flag(it.id, where, 'the Hint for tag "' + tag + '" contains this item\'s answer ("' + a + '")');
    });
  });
});

/* ---- report ---- */
console.log('items examined: ' + items.length);
if (!issues.length) { console.log('\nPASS — no pedagogical issues found.'); process.exit(0); }
const byMsg = {};
issues.forEach(i => { const k = i.msg.replace(/"[^"]*"/g, '"…"'); (byMsg[k] = byMsg[k] || []).push(i); });
console.log('\n' + issues.length + ' issue(s), ' + Object.keys(byMsg).length + ' kind(s):\n');
Object.keys(byMsg).forEach(k => {
  console.log('• ' + k);
  byMsg[k].forEach(i => console.log('    ' + i.id + ' [' + i.where + ']  ' + i.msg));
  console.log('');
});
process.exit(1);
