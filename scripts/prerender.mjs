// ============================================================
// prerender.mjs — build-time static HTML generation
//
// Runs after `vite build`. Loads each page module in a jsdom
// document (via Vite's SSR module loader), fires DOMContentLoaded
// so the page renders itself, then writes the fully-rendered HTML
// (content + JSON-LD structured data) back into dist/*.html.
//
// Why: the site renders client-side; Google can execute JS but
// most AI crawlers (GPTBot, ClaudeBot, PerplexityBot) cannot.
// Prerendering puts all content and schema in the static HTML.
// No browser needed — safe to run on Vercel's build machines.
// ============================================================
import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://aaronskoshe.com.au';
const dist = path.resolve('dist');

const PAGES = [
  { html: 'index.html', module: '/src/pages/home.ts', url: `${SITE}/` },
  { html: 'menu.html', module: '/src/pages/menu.ts', url: `${SITE}/menu.html` },
  { html: 'about.html', module: '/src/pages/about.ts', url: `${SITE}/about.html` },
  { html: 'coffee.html', module: '/src/pages/coffee.ts', url: `${SITE}/coffee.html` },
  { html: 'breakfast.html', module: '/src/pages/breakfast.ts', url: `${SITE}/breakfast.html` },
  { html: 'drinks.html', module: '/src/pages/drinks.ts', url: `${SITE}/drinks.html` },
  { html: 'gallery.html', module: '/src/pages/gallery.ts', url: `${SITE}/gallery.html` },
  { html: 'contact.html', module: '/src/pages/contact.ts', url: `${SITE}/contact.html` },
  { html: 'blog.html', module: '/src/pages/blog.ts', url: `${SITE}/blog.html` },
  { html: 'specialty-coffee-guide.html', module: '/src/pages/blog-post.ts', url: `${SITE}/specialty-coffee-guide.html` },
  { html: 'bondi-breakfast-guide.html', module: '/src/pages/blog-post.ts', url: `${SITE}/bondi-breakfast-guide.html` },
  { html: 'cafe-culture-bondi-beach.html', module: '/src/pages/blog-post.ts', url: `${SITE}/cafe-culture-bondi-beach.html` },
];

class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}

function installGlobals(dom) {
  const w = dom.window;
  w.IntersectionObserver = NoopObserver;
  w.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);

  const map = {
    window: w,
    document: w.document,
    location: w.location,
    history: w.history,
    HTMLElement: w.HTMLElement,
    HTMLImageElement: w.HTMLImageElement,
    Element: w.Element,
    Node: w.Node,
    Event: w.Event,
    CustomEvent: w.CustomEvent,
    getComputedStyle: w.getComputedStyle.bind(w),
    IntersectionObserver: NoopObserver,
    requestAnimationFrame: w.requestAnimationFrame,
    navigator: w.navigator,
  };
  for (const [key, value] of Object.entries(map)) {
    try {
      Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    } catch {
      /* non-configurable global — skip */
    }
  }
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

let failed = false;

for (const page of PAGES) {
  const filePath = path.join(dist, page.html);
  if (!fs.existsSync(filePath)) {
    console.error(`✗ ${page.html}: missing from dist/`);
    failed = true;
    continue;
  }

  const dom = new JSDOM(fs.readFileSync(filePath, 'utf8'), {
    url: page.url,
    pretendToBeVisual: true,
  });
  installGlobals(dom);

  // Fresh module execution per page so DOMContentLoaded listeners
  // bind to the current document.
  server.moduleGraph.invalidateAll();
  await server.ssrLoadModule(page.module);

  dom.window.document.dispatchEvent(
    new dom.window.Event('DOMContentLoaded', { bubbles: true, cancelable: false })
  );
  await new Promise((r) => setTimeout(r, 50));

  const app = dom.window.document.getElementById('app');
  const schemaCount = dom.window.document.querySelectorAll('script[type="application/ld+json"]').length;
  if (!app || app.children.length === 0) {
    console.error(`✗ ${page.html}: prerender produced empty #app`);
    failed = true;
  } else {
    fs.writeFileSync(filePath, '<!DOCTYPE html>' + dom.window.document.documentElement.outerHTML);
    console.log(`✓ ${page.html} — ${(app.innerHTML.length / 1024).toFixed(1)} KB content, ${schemaCount} JSON-LD blocks`);
  }
  dom.window.close();
}

await server.close();

if (failed) {
  console.error('Prerender FAILED');
  process.exit(1);
}
console.log('Prerender complete: all pages contain static content + structured data.');
process.exit(0);
