import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await p.goto(process.argv[2], { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));
const out = await p.evaluate(() => {
  const W = document.documentElement.clientWidth; const res = [];
  document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect(); if (r.right > W + 1 && !e.closest('.strip')) res.push(`${e.tagName}.${[...e.classList].join('.')} right=${Math.round(r.right)} w=${Math.round(r.width)}`); });
  return { W, sw: document.documentElement.scrollWidth, res: res.slice(0, 25) };
});
console.log(JSON.stringify(out, null, 1)); await b.close();
