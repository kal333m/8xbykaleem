import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
for (const [n, w, h] of [['live-desktop', 1440, 900], ['live-mobile', 390, 844]]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h, isMobile: w < 500 });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('FAIL ' + r.url()));
  await p.goto('https://8xbykaleem.vercel.app/', { waitUntil: 'networkidle0' }); await new Promise(r => setTimeout(r, 4000));
  await p.screenshot({ path: `../../review/${n}.png` });
  console.log(n, errs.length ? errs : 'no errors');
}
await b.close();
