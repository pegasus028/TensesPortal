/* End-to-end smoke test in a real browser.
   Serves the folder, registers a student, walks a lesson, checks the UI reacts. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

/* The test server blanks window.PP_API_URL on the way out, so the app starts in
   local mode and this suite can NEVER write a test account into the real class
   sheet. Do not remove: an earlier version of this file did exactly that. */
const server = http.createServer((req, res) => {
  const f = path.join(__dirname, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end('no'); }
    let body = d;
    if (path.extname(f) === '.html') {
      body = d.toString().replace(/window\.PP_API_URL\s*=\s*'[^']*'/g, "window.PP_API_URL = ''");
      if (/PP_API_URL\s*=\s*'[^']/.test(body)) { console.error('FATAL: could not blank the API URL — refusing to run'); process.exit(1); }
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' });
    res.end(body);
  });
});

(async () => {
  await new Promise(r => server.listen(8099, r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });   /* phone width */
  const errors = [];
  page.on('pageerror', e => errors.push('JS error: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|net::/.test(m.text())) errors.push('console: ' + m.text()); });

  await page.goto('http://localhost:8099/index.html');
  await page.click('#tab-new');
  await page.fill('#f-id', 'test-student');
  await page.fill('#f-name', 'Ploy');
  await page.fill('#f-pw', 'pass1234');
  await page.click('#btn-go');

  await page.waitForSelector('#screen-app:not(.hidden)', { timeout: 20000 });
  const legs = await page.locator('.gate').count();
  console.log('legs rendered on the itinerary: ' + legs);
  if (legs !== 8) errors.push('expected 8 legs, saw ' + legs);

  const legNames = await page.locator('.gate-name').allTextContents();
  console.log('legs: ' + legNames.join(' | '));

  /* no horizontal overflow at phone width */
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over > 1) errors.push('page scrolls horizontally at 420px by ' + over + 'px');

  /* open the first lesson via the resume card */
  await page.click('#resume');
  await page.waitForSelector('.card.theory');
  console.log('theory opened: ' + (await page.locator('.theory h3').textContent()));

  /* the simple-English toggle must swap the prose */
  const full = await page.locator('.theory .prose').textContent();
  await page.click('#p-simple');
  await page.waitForTimeout(150);
  const simple = await page.locator('.theory .prose').textContent();
  if (full === simple) errors.push('the "explain more simply" button changed nothing');
  else console.log('simple-English toggle: works');
  await page.click('#p-simple');

  /* walk the whole first lesson, always picking option A */
  await page.click('#p-start');
  let n = 0;
  for (let i = 0; i < 20; i++) {
    if (await page.locator('.result').count()) break;
    await page.waitForSelector('#p-check', { timeout: 5000 });
    const type = await page.locator('#qhost').getAttribute('data-type');
    if (await page.locator('.opt').count()) await page.locator('.opt').first().click();
    else if (await page.locator('.goods').count()) await page.locator('.goods').first().click();
    else if (await page.locator('.tok').count()) await page.locator('.tok').first().click();
    else if (await page.locator('.tiles .tile').count()) {
      const t = await page.locator('.tiles .tile').count();
      for (let k = 0; k < t; k++) await page.locator('.tiles .tile:not(.used)').first().click();
    } else if (await page.locator('.sort-pool .chip-i').count()) {
      /* arm one chip, drop it in a box, and wait for the pool to shrink before
         touching the next — clicking an already-armed chip un-arms it */
      const total = await page.locator('.sort-pool .chip-i').count();
      for (let k = 0; k < total; k++) {
        const left = page.locator('.sort-pool .chip-i:not(.gone)');
        const before = await left.count();
        if (!before) break;
        await left.first().click();
        await page.locator('.sort-bin').first().locator('.sort-h').click();  /* header, not centre: the centre can land on an already-placed chip and take it back out */
        await page.waitForFunction(
          b => document.querySelectorAll('.sort-pool .chip-i:not(.gone)').length < b,
          before, { timeout: 3000 }
        );
      }
    } else if (await page.locator('.rank-pool .rank').count()) {
      const c = await page.locator('.rank-pool .rank').count();
      for (let k = 0; k < c; k++) await page.locator('.rank-pool .rank:not(.used)').first().click();
    } else if (await page.locator('input.typed').count()) await page.fill('input.typed', 'x');
    const enabled = await page.locator('#p-check').isEnabled();
    if (!enabled) {
      const dbg = await page.evaluate(() => ({
        type: document.querySelector('#qhost').dataset.type,
        html: document.querySelector('#qhost').innerHTML.slice(0, 400)
      }));
      console.log('STUCK on item ' + (n + 1) + ' type=' + dbg.type + '\n' + dbg.html);
      errors.push('Check button never enabled on a ' + dbg.type + ' item');
      break;
    }
    await page.click('#p-check');                                  /* mark it */
    if (!(await page.locator('#feedback .verdict').count())) errors.push('no feedback shown on a ' + type + ' item');
    n++;
    await page.click('#p-check');                                  /* next */
    await page.waitForTimeout(80);
  }
  console.log('questions answered: ' + n);
  await page.waitForSelector('.result', { timeout: 5000 });
  console.log('result screen: ' + (await page.locator('.result h3').textContent()) +
              ' — ' + (await page.locator('.score-ring i').textContent()));

  /* a keepsake modal fires ~600ms after the result screen — collect it */
  await page.waitForTimeout(1200);
  for (let i = 0; i < 4; i++) {
    if (!(await page.locator('.modal [data-close]').count())) break;
    console.log('keepsake awarded: ' + (await page.locator('.modal-card h3').textContent()));
    await page.locator('.modal [data-close]').click();
    await page.waitForTimeout(600);
  }

  /* every other view must paint without throwing */
  for (const v of ['review', 'pass', 'test', 'settings', 'map']) {
    await page.click('.nav button[data-view="' + v + '"]');
    await page.waitForTimeout(150);
    const txt = await page.locator('#view-' + v).textContent();
    if (!txt || txt.trim().length < 20) errors.push('view "' + v + '" rendered empty');
  }
  console.log('all five views paint: OK');

  /* dark mode must not leave anything unstyled */
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForTimeout(120);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('dark-mode body background: ' + bg);
  if (bg === 'rgba(0, 0, 0, 0)' || bg === 'rgb(255, 255, 255)') errors.push('body has no dark background');

  await page.screenshot({ path: 'screenshot-itinerary.png', fullPage: false });

  await browser.close();
  server.close();
  if (errors.length) { console.log('\nFAILURES'); errors.forEach(e => console.log('  x ' + e)); process.exit(1); }
  console.log('\nPASS — the app runs end to end in a browser.');
})();
