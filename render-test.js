/* Functional render test: mount every item in a real DOM, drive the widget to
   the CORRECT answer, and assert the engine marks it right. Run: node render-test.js */
const fs = require('fs');
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!doctype html><body><div id="host"></div></body>', { pretendToBeVisual: true });
global.window = dom.window; global.document = dom.window.document;
global.CustomEvent = dom.window.CustomEvent; global.Event = dom.window.Event;

/* content.js and engine.js are browser scripts: run them in this window */
new Function(fs.readFileSync('./content.js', 'utf8'))();
new Function(fs.readFileSync('./engine.js', 'utf8'))();

const E = window.Engine, C = window.CONTENT;
const host = document.getElementById('host');
let ok = 0, fails = [];

function allItems() {
  const out = [];
  C.STAGES.forEach(st => {
    st.lessons.forEach(ls => ls.items.forEach(i => out.push([ls.id, i])));
    st.challenge.items.forEach(i => out.push([st.challenge.id, i]));
  });
  Object.keys(C.VERIFY).forEach(k => C.VERIFY[k].forEach(i => out.push(['verify-' + k, i])));
  return out;
}

function clickAll(nodes, pred) { nodes.forEach((n, i) => { if (pred(n, i)) n.dispatchEvent(new window.MouseEvent('click', { bubbles: true })); }); }
const $$ = s => Array.from(host.querySelectorAll(s));

allItems().forEach(([where, item]) => {
  let view;
  try { view = E.mount(item, host); }
  catch (e) { fails.push(item.id + ' (' + where + '): mount threw — ' + e.message); return; }

  try {
    switch (item.type) {
      case 'choose': case 'equiv': case 'judge': case 'table':
        clickAll($$('.opt'), (n, i) => i === item.answer); break;
      case 'gap':
        if (item.options) clickAll($$('.opt'), (n, i) => i === item.answer);
        else { const inp = host.querySelector('input.typed'); inp.value = item.accept[0]; inp.dispatchEvent(new window.Event('input', { bubbles: true })); }
        break;
      case 'pick':
        clickAll($$('.goods'), (n, i) => i === item.answer); break;
      case 'spot':
        clickAll($$('.tok'), (n, i) => i === item.answer); break;
      case 'build': {
        /* tap tiles in the order the solution needs, matching by text */
        const want = item.solution.split(/\s+/);
        want.forEach(w => {
          const btn = $$('.tiles .tile').find(b => !b.disabled && b.textContent === w);
          if (btn) btn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
        });
        break;
      }
      case 'order':
        item.items.forEach(txt => {
          const btn = $$('.rank-pool .rank').find(b => !b.disabled && b.textContent === txt);
          if (btn) btn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
        });
        break;
      case 'sort': {
        const boxes = $$('.sort-bin');
        item.items.forEach(x => {
          const chip = $$('.sort-pool .chip-i').find(b => !b.disabled && b.innerHTML === x.text);
          if (!chip) return;
          chip.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
          const bi = item.bins.findIndex(b => b.key === x.bin);
          boxes[bi].dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
        });
        break;
      }
      default: fails.push(item.id + ': no renderer for type "' + item.type + '"'); return;
    }

    if (!view.hasResponse()) { fails.push(item.id + ' (' + where + '): widget never registered a complete response'); return; }
    const res = view.check();
    if (!res.correct) fails.push(item.id + ' (' + where + '): correct answer marked WRONG — given "' + res.givenText + '" vs expected "' + res.expectedText + '"');
    else { view.lock(); ok++; }
  } catch (e) {
    fails.push(item.id + ' (' + where + '): driving the widget threw — ' + e.message);
  }
});

/* teacher-side paper generation must work at every level */
for (let lv = 1; lv <= 8; lv++) {
  [8, 10, 12, 14].forEach(n => {
    const p = E.Bank.verifyPaper(lv, n);
    if (!p.length) fails.push('verifyPaper(' + lv + ',' + n + ') returned nothing');
    const seen = {};
    p.forEach(i => { if (seen[i.id]) fails.push('verifyPaper(' + lv + ',' + n + ') repeated item ' + i.id); seen[i.id] = 1; });
  });
}

/* progress model smoke test */
const p = E.Progress.blank('test', 'Test');
C.STAGES.forEach(st => { E.Progress.finishChallenge(p, st.challenge.id, 1, false); st.lessons.forEach(l => E.Progress.finishLesson(p, l.id, 1)); });
if (E.Progress.stageClearedCount(p) !== 8) fails.push('stageClearedCount should be 8 after clearing all, got ' + E.Progress.stageClearedCount(p));
if (E.Progress.readiness(p) !== 100) fails.push('readiness should be 100 at full marks, got ' + E.Progress.readiness(p));
if (E.Progress.rank(p).n !== 8) fails.push('rank should be 8');

console.log('items driven to a correct answer: ' + ok);
if (fails.length) { console.log('\nFAILURES (' + fails.length + ')'); fails.forEach(f => console.log('  x ' + f)); process.exit(1); }
console.log('teacher level-check papers: OK at all 8 levels');
console.log('progress model: 8/8 legs, readiness 100%, rank 8');
console.log('\nPASS — every item renders and marks correctly.');
