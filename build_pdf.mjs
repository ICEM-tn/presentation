// build_pdf.mjs
// Screenshot each slide of the React deck at 1920x1080 and combine into
// KOMAX_deck.pdf (40 pages, 16:9). Requires: puppeteer + pdfkit.
//
// Run:
//   node build_pdf.mjs
//
// It will:
//   - Spawn `npm run dev` on port 5179 (silent, background)
//   - Wait for the dev server to be ready
//   - Launch headless Chromium at 1920x1080
//   - Hide chrome (progress bar, page-nav, counter, hint, presenter button)
//   - Press ArrowRight (SLIDES - 1) times, capturing a PNG after each
//   - Compose the SLIDES PNGs into a single PDF
//   - Kill the dev server, exit

import { spawn, execSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync, existsSync, rmSync, writeFileSync, readFileSync, createWriteStream } from 'node:fs';
import puppeteer from 'puppeteer';
import PDFDocument from 'pdfkit';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5179;
// ?noanim=1 freezes Framer Motion animations at target state (see main.jsx)
const URL = `http://localhost:${PORT}/?noanim=1`;
const SLIDES = 43;
const VIEWPORT = { width: 1920, height: 1080, deviceScaleFactor: 1 };
const OUT_PDF = resolve(__dirname, 'KOMAX_deck.pdf');
const TMP_DIR = resolve(__dirname, '.pdf-tmp');

const HIDE_CHROME_CSS = `
  .progress-bar,
  .slide-counter,
  .hint,
  .page-nav,
  .presenter-launch,
  .nav-btn,
  .nav-prev,
  .nav-next { display: none !important; }
  .slide-viewport {
    height: 100vh !important;
    padding: 3vh 4vw !important;
  }
  html, body, #root { background: #050b1e !important; }
`;

// --------------------------------------------------------------------------
// 1. Boot dev server (spawn `npm run dev -- --port 5179`)
// --------------------------------------------------------------------------
async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url, { method: 'GET' });
      if (r.ok || r.status === 304) return true;
    } catch { /* not up yet */ }
    await sleep(400);
  }
  throw new Error(`dev server never came up at ${url}`);
}

function killPort(port) {
  // best-effort cleanup of anything squatting on the port (Windows).
  if (process.platform !== 'win32') return;
  try {
    const { execSync } = require('node:child_process');
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    const pids = new Set();
    out.split(/\r?\n/).forEach((line) => {
      const m = line.match(/LISTENING\s+(\d+)/);
      if (m) pids.add(m[1]);
    });
    pids.forEach((pid) => {
      try { execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' }); } catch {}
    });
  } catch { /* nothing on port */ }
}

function startDevServer() {
  killPort(PORT);
  console.log(`[server] starting vite dev on port ${PORT} ...`);
  const isWin = process.platform === 'win32';
  const child = spawn('npm', ['run', 'dev', '--', '--port', String(PORT), '--strictPort'], {
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: isWin,   // required on Windows so npm.cmd resolves
  });
  child.stdout.on('data', (d) => {
    const s = d.toString();
    if (s.includes('error') || s.includes('ready in')) process.stdout.write(`[vite] ${s}`);
  });
  child.stderr.on('data', (d) => process.stderr.write(`[vite-err] ${d}`));
  return child;
}

// --------------------------------------------------------------------------
// 2. Capture all slides
// --------------------------------------------------------------------------
async function capture(browser) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  console.log(`[capture] navigate ${URL}`);
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60_000 });
  await page.addStyleTag({ content: HIDE_CHROME_CSS });

  // ensure fonts loaded
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await sleep(1500);

  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
  mkdirSync(TMP_DIR, { recursive: true });

  const paths = [];
  for (let i = 0; i < SLIDES; i++) {
    // With ?noanim=1, only layout paint + font metrics need to settle.
    // Keep a small margin (400ms) so PageNav thumbnails and lazy images
    // finish rendering.
    await sleep(500);
    const p = resolve(TMP_DIR, `slide_${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({
      path: p,
      type: 'png',
      omitBackground: false,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    });
    paths.push(p);
    process.stdout.write(`\r[capture] slide ${i + 1}/${SLIDES}   `);
    if (i < SLIDES - 1) {
      await page.keyboard.press('ArrowRight');
    }
  }
  console.log('\n[capture] done');
  await page.close();
  return paths;
}

// --------------------------------------------------------------------------
// 3. Build PDF from PNGs (16:9 pages, native slide dimensions)
// --------------------------------------------------------------------------
function buildPdf(pngPaths) {
  console.log(`[pdf] composing ${pngPaths.length} pages -> ${OUT_PDF}`);
  // Page size = 960 x 540 pt (matches PowerPoint 16:9: 13.333" x 7.5")
  // Screenshots are 1920x1080 so embedded at 2x DPI (retina-crisp)
  const PAGE_W = 960;
  const PAGE_H = 540;

  const doc = new PDFDocument({
    size: [PAGE_W, PAGE_H],
    margin: 0,
    info: {
      Title: 'Maintenance prédictive — Komax Alpha 433 H & Gamma 333 PC',
      Author: 'Moutia Bensaad — ISET Nabeul',
      Subject: 'PFE — Soutenance',
      Keywords: 'komax, maintenance prédictive, IoT, ML, ICEM',
      Creator: 'build_pdf.mjs',
    },
  });

  const stream = createWriteStream(OUT_PDF);
  doc.pipe(stream);

  pngPaths.forEach((p, i) => {
    if (i > 0) doc.addPage({ size: [PAGE_W, PAGE_H], margin: 0 });
    doc.image(p, 0, 0, { width: PAGE_W, height: PAGE_H });
  });

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

// --------------------------------------------------------------------------
// 4. Orchestrate
// --------------------------------------------------------------------------
async function main() {
  const server = startDevServer();
  let browser;
  let exitCode = 0;
  try {
    await waitForServer(URL);
    console.log('[server] ready');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
    const pngs = await capture(browser);
    await buildPdf(pngs);
    console.log(`[done] -> ${OUT_PDF}`);
  } catch (e) {
    console.error('[error]', e);
    exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    // kill the whole tree on Windows (vite spawns children)
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' });
      } else {
        server.kill('SIGTERM');
      }
    } catch { /* ignore */ }
    // cleanup screenshots
    if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
  }
  process.exit(exitCode);
}

main();
