import { spawn } from 'node:child_process';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;
const BASE = 'http://localhost:4173';
const routes = ['/', '/destinations', '/destination/1', '/hotels', '/hotels/1', '/promo', '/culinary', '/login', '/register', '/404'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDevtools() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(250);
  }
  throw new Error('devtools not ready');
}

const AUDIT = `(() => {
  const out = { url: location.pathname, issues: [] };
  const vw = window.innerWidth;
  const de = document.documentElement;
  if (de.scrollWidth > vw + 1) out.issues.push({ type: 'horizontal-overflow', scrollWidth: de.scrollWidth, vw });
  document.querySelectorAll('img').forEach((img) => {
    const r = img.getBoundingClientRect();
    if (img.naturalWidth === 0 || r.width < 2 || r.height < 2) {
      out.issues.push({ type: 'img-broken', src: (img.currentSrc || img.src || '').slice(0, 90), w: Math.round(r.width), h: Math.round(r.height), nat: img.naturalWidth });
    }
  });
  const els = document.querySelectorAll('*');
  els.forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.position !== 'absolute' && cs.position !== 'fixed') return;
    if (el.getAttribute('aria-hidden') === 'true') return;
    let ne = el.parentElement;
    while (ne && getComputedStyle(ne).position === 'static') ne = ne.parentElement;
    let card = el.parentElement;
    while (card && !/shadow-(float|card)/.test(card.className || '')) card = card.parentElement;
    if (card && ne && !card.contains(ne) && ne !== card) {
      out.issues.push({ type: 'escaped-absolute', el: (el.className || '').toString().slice(0, 70), card: (card.className || '').toString().slice(0, 50), anchoredTo: ne.tagName + '.' + (ne.className || '').toString().slice(0, 50) });
    }
  });
  const vh = window.innerHeight;
  document.querySelectorAll('h1,h2,h3,p,span').forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.05 && el.textContent.trim().length > 3) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0 && r.width > 0) {
        out.issues.push({ type: 'invisible-text-in-viewport', text: el.textContent.trim().slice(0, 40) });
      }
    }
  });
  return JSON.stringify(out);
})()`;

function makeClient(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    const listeners = new Map();
    ws.addEventListener('open', () => resolve({ send, on, close: () => ws.close() }));
    ws.addEventListener('error', reject);
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve: res, reject: rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
      } else if (msg.method && listeners.has(msg.method)) {
        listeners.get(msg.method).forEach((fn) => fn(msg.params));
        listeners.delete(msg.method);
      }
    });
    function send(method, params = {}) {
      return new Promise((res, rej) => {
        const mid = ++id;
        pending.set(mid, { resolve: res, reject: rej });
        ws.send(JSON.stringify({ id: mid, method, params }));
      });
    }
    function on(method) {
      return new Promise((res) => {
        if (!listeners.has(method)) listeners.set(method, []);
        listeners.get(method).push(res);
      });
    }
  });
}

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`, '--user-data-dir=C:\\Users\\Project\\Travelindo\\.shots\\chrome-profile',
  '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });

try {
  await waitForDevtools();
  const results = [];
  for (const route of routes) {
    const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?${BASE}${route}`, { method: 'PUT' })).json();
    const client = await makeClient(t.webSocketDebuggerUrl);
    await client.send('Runtime.enable');
    await client.send('Page.enable');
    const loaded = client.on('Page.loadEventFired');
    await client.send('Page.navigate', { url: `${BASE}${route}` });
    await loaded;
    await sleep(3500);
    const res = await client.send('Runtime.evaluate', { expression: AUDIT, returnByValue: true });
    results.push(JSON.parse(res.result.value));
    await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`);
    client.close();
  }
  console.log(JSON.stringify(results, null, 2));
} catch (e) {
  console.error('AUDIT-ERROR', e.message);
} finally {
  chrome.kill();
}
