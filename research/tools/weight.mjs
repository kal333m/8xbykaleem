import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
for (const url of process.argv.slice(2)) {
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
  let bytes = 0, n = 0; const byType = {};
  p.on('response', async r => { try { const len = (await r.buffer()).length; bytes += len; n++; const t = r.request().resourceType(); byType[t] = (byType[t]||0) + len; } catch {} });
  const t0 = Date.now(); await p.goto(url, { waitUntil: 'networkidle0', timeout: 90000 }).catch(()=>{});
  const perf = await p.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; const lcp = performance.getEntriesByType('largest-contentful-paint'); return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) }; });
  console.log(url, `${n} req`, (bytes/1e6).toFixed(1)+'MB', JSON.stringify(Object.fromEntries(Object.entries(byType).map(([k,v])=>[k,(v/1e6).toFixed(2)]))), JSON.stringify(perf));
  await p.close();
}
await b.close();
