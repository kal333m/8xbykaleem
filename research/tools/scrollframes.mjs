// Usage: node scrollframes.mjs <outDir> <url> [stepPx=450] [vp=desktop|mobile]
// Real wheel-scrolls the page and grabs a viewport frame at each step, so scroll-pinned
// and scroll-scrubbed animations are captured the way a visitor sees them.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const [outDir, url, stepArg = '450', vp = 'desktop'] = process.argv.slice(2);
const step = Number(stepArg);
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport(vp === 'mobile'
  ? { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true }
  : { width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
const name = new URL(url).pathname.replace(/\W+/g, '_') || '_home';
const dir = path.join(outDir, `${new URL(url).hostname}${name}_${vp}`);
await fs.mkdir(dir, { recursive: true });
await page.mouse.move(720, 450);
let last = -1, same = 0;
for (let i = 0; i < 120; i++) {
  await page.screenshot({ path: path.join(dir, `f${String(i).padStart(3, '0')}.png`) });
  await page.mouse.wheel({ deltaY: step });
  await new Promise((r) => setTimeout(r, 900));
  const y = await page.evaluate(() => window.scrollY);
  if (y === last && ++same > 2) break;
  last = y;
}
console.log(dir);
await browser.close();
