import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const shots = [['desktop', 1440, 900, null], ['work', 1440, 900, '#work'], ['growth', 1440, 900, '#growth'], ['mobile', 390, 844, null]];
for (const [n, w, h, sel] of shots) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h, isMobile: w < 500, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:4178/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 3800));
  if (sel) { await p.evaluate(s => { document.documentElement.style.scrollBehavior = 'auto'; const el = document.querySelector(s); el.scrollIntoView(); scrollBy(0, 150); }, sel); await new Promise(r => setTimeout(r, 1800)); }
  else await p.evaluate(() => scrollBy(0, innerWidth < 500 ? 900 : 330)), await new Promise(r => setTimeout(r, 800));
  await p.screenshot({ path: `../../review/v2_${n}.png` });
  if (errs.length) console.log(n, errs);
  await p.close();
}
await b.close(); console.log('shots ok');
