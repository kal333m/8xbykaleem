import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
for (const url of process.argv.slice(2)) {
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
  await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(e=>console.log('ERR',e.message));
  const t = await p.evaluate(() => document.body.innerText.replace(/\n{2,}/g,'\n'));
  console.log('\n######## ' + url + '\n' + t.slice(0, 3500));
  await p.close();
}
await b.close();
