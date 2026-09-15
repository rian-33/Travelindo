import { spawn } from 'node:child_process';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9444;
const URL = process.env.CHECK_URL || 'http://localhost:5199/';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDevtools() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) return; } catch {}
    await sleep(250);
  }
  throw new Error('devtools not ready');
}

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
      }
    });
    function send(method, params = {}) {
      return new Promise((res, rej) => { const mid = ++id; pending.set(mid, { resolve: res, reject: rej }); ws.send(JSON.stringify({ id: mid, method, params })); });
    }
    function on(method, fn) {
      if (!listeners.has(method)) listeners.set(method, []);
      listeners.get(method).push(fn);
    }
  });
}

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`, '--user-data-dir=C:\\Users\\Project\\Travelindo\\.shots\\chrome-profile2',
  '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });

try {
  await waitForDevtools();
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
  const c = await makeClient(t.webSocketDebuggerUrl);
  const logs = [];
  await c.send('Runtime.enable');
  await c.send('Page.enable');
  await c.send('Log.enable');
  c.on('Runtime.consoleAPICalled', (p) => logs.push({ kind: 'console.' + p.type, text: p.args.map((a) => a.value ?? a.description ?? a.type).join(' ').slice(0, 300) }));
  c.on('Runtime.exceptionThrown', (p) => logs.push({ kind: 'exception', text: (p.exceptionDetails.exception?.description || p.exceptionDetails.text || '').slice(0, 500) }));
  c.on('Log.entryAdded', (p) => { if (p.entry.level === 'error') logs.push({ kind: 'log.' + p.entry.source, text: p.entry.text.slice(0, 300) }); });
  c.on('Page.loadEventFired', async () => {});
  await c.send('Page.navigate', { url: URL });
  await sleep(5000);
  const evalRes = await c.send('Runtime.evaluate', {
    expression: `JSON.stringify({
      title: document.title,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      colorScheme: getComputedStyle(document.documentElement).colorScheme,
      rootHtmlLen: (document.getElementById('root')?.innerHTML || '').length,
      navCount: document.querySelectorAll('nav').length,
      skipLinkStyled: (() => { const a = document.querySelector('a[href="#main-content"]'); if (!a) return 'missing'; return getComputedStyle(a).position + '/' + getComputedStyle(a).clip; })(),
      styleSheets: document.styleSheets.length,
      bodyText: (document.body.innerText || '').slice(0, 200)
    })`,
    returnByValue: true,
  });
  console.log('=== STATE ===');
  console.log(evalRes.result.value);
  console.log('=== LOGS ===');
  for (const l of logs) console.log(JSON.stringify(l));
} catch (e) {
  console.error('CHECK-ERROR', e.message);
} finally {
  chrome.kill();
}
