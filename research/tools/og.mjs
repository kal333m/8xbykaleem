import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await p.goto('http://localhost:4178/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 4200));
await p.evaluate(() => { document.querySelector('.site-header').style.visibility = 'hidden'; document.querySelector('#notes-toggle').style.display = 'none'; });
await p.screenshot({ path: '/Users/kaleem/Desktop/8x/site/assets/og.png', clip: { x: 0, y: 40, width: 1200, height: 630 } });
await b.close();
