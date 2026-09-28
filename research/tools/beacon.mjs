import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage(); const hits = [];
await p.setUserAgent((await b.userAgent()).replace('HeadlessChrome', 'Chrome'));
await p.evaluateOnNewDocument(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
p.on('request', r => { if (r.url().includes('/_vercel/insights')) hits.push(`${r.method()} ${new URL(r.url()).pathname}`); });
p.on('response', r => { if (r.url().includes('/_vercel/insights/view')) hits.push(`-> ${r.status()}`); });
await p.goto('https://8xbykaleem.vercel.app/', { waitUntil: 'networkidle0' }); await new Promise(r => setTimeout(r, 3000));
console.log(hits); await b.close();
