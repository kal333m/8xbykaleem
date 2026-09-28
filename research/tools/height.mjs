import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await p.goto('http://localhost:4178/', { waitUntil: 'networkidle0' });
console.log(await p.evaluate(() => ({ h: document.documentElement.scrollHeight, h1: document.querySelectorAll('h1').length, fitTop: Math.round(document.querySelector('#fit').getBoundingClientRect().top + scrollY), rolesTop: Math.round(document.querySelector('#roles').getBoundingClientRect().top + scrollY) })));
// screenshot the fit→roles boundary directly, no stitching
await p.evaluate(() => document.querySelector('#verdict').scrollIntoView({ block: 'center' }));
await new Promise(r => setTimeout(r, 1200));
await p.screenshot({ path: '../../review/m_verdict.png' });
await b.close();
