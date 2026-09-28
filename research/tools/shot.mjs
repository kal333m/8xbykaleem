import puppeteer from 'puppeteer-core';
const [url, out, w = 1440, h = 900, wait = 5000] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage(); await p.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: 'networkidle0' }); await new Promise(r => setTimeout(r, +wait));
await p.screenshot({ path: out, fullPage: true }); await b.close();
