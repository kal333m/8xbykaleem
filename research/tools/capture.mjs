// Usage: node capture.mjs <outDir> <url> [url...]
// Full-page desktop + mobile screenshots, plus HTML, text, links and a design-token dump.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const [outDir, ...urls] = process.argv.slice(2);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const MOBILE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';

const slug = (u) => {
  const { hostname, pathname } = new URL(u);
  return (hostname + pathname).replace(/\/$/, '').replace(/[^a-z0-9]+/gi, '_');
};

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
await fs.mkdir(outDir, { recursive: true });

for (const url of urls) {
  const name = slug(url);
  for (const [vp, viewport] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage();
    if (vp === 'mobile') await page.setUserAgent(MOBILE_UA);
    await page.setViewport(viewport);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    } catch (e) {
      console.error('goto', url, e.message);
    }
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, `${name}__${vp}__fold.png`) });
    await scrollThrough(page);
    await page.screenshot({ path: path.join(outDir, `${name}__${vp}__full.png`), fullPage: true });

    if (vp === 'desktop') {
      const data = await page.evaluate(() => {
        const els = [...document.querySelectorAll('body *')].filter((e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        });
        const tally = (fn) => {
          const m = {};
          els.forEach((e) => { const k = fn(getComputedStyle(e)); m[k] = (m[k] || 0) + 1; });
          return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 15);
        };
        const type = els.slice(0, 400).map((e) => {
          const s = getComputedStyle(e);
          return { tag: e.tagName, text: (e.innerText || e.textContent || "").trim().slice(0, 60), font: s.fontFamily.split(',')[0], size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color };
        });
        const bodyBg = getComputedStyle(document.body).backgroundColor;
        const bgs = {};
        document.querySelectorAll('body *').forEach((e) => { const b = getComputedStyle(e).backgroundColor; if (b !== 'rgba(0, 0, 0, 0)') bgs[b] = (bgs[b] || 0) + 1; });
        return {
          title: document.title,
          meta: [...document.querySelectorAll('meta')].map((m) => ({ n: m.name || m.getAttribute('property'), c: m.content })).filter((m) => m.n),
          links: [...document.querySelectorAll("a")].map((a) => ({ text: (a.innerText || "").trim().slice(0, 80), href: a.href })),
          fonts: tally((s) => s.fontFamily),
          sizes: tally((s) => `${s.fontSize}/${s.lineHeight} w${s.fontWeight}`),
          colors: tally((s) => s.color),
          bodyBg,
          bgs: Object.entries(bgs).sort((a, b) => b[1] - a[1]).slice(0, 12),
          height: document.body.scrollHeight,
          images: [...document.querySelectorAll('img,video,svg,canvas')].length,
          type,
          text: document.body.innerText,
        };
      });
      await fs.writeFile(path.join(outDir, `${name}.json`), JSON.stringify(data, null, 2));
      await fs.writeFile(path.join(outDir, `${name}.txt`), data.text);
      await fs.writeFile(path.join(outDir, `${name}.html`), await page.content());
    }
    await page.close();
  }
  console.log('done', url);
}
await browser.close();
