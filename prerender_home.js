/* ===========================================================
   prerender_home.js — bake the home page markup into index.html

   Why: app.js renders the home page into an empty <main id="app-main">.
   The browser paints whatever it has parsed while app.js is still
   downloading, so on a slow connection it paints the header, an empty
   main and the footer directly underneath — then the footer jumps down
   once the content lands. Lighthouse attributed 100% of the page's CLS
   (0.276) to <footer class="site-footer"> because of exactly that, and
   the same JS dependency added 850 ms of LCP "element render delay" to
   the hero image, which cannot paint until app.js has built the DOM.

   This script evaluates app.js's own template functions and writes their
   output into index.html, so the markup here can never drift from the
   markup app.js would have produced. app.js detects the prerendered
   content at boot and only attaches behaviour.

   Re-run after changing any home-page template in app.js:
       node prerender_home.js
=========================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const appPath = path.join(dir, 'app.js');
const indexPath = path.join(dir, 'index.html');

const BOOT_MARKER = '  /* ---------------- Boot ---------------- */';

/* ---- 1. Load app.js with the boot IIFE removed and the templates exported ---- */
const appSrc = fs.readFileSync(appPath, 'utf8');
const bootAt = appSrc.indexOf(BOOT_MARKER);
if (bootAt === -1) {
  throw new Error('Could not find the boot section marker in app.js — has it been renamed?');
}

// Keep everything up to the boot IIFE (pure template + data definitions),
// then close the module IIFE ourselves after exporting what we need.
const headless = appSrc.slice(0, bootAt) + `
  module.exports = { renderHero, renderStory, favouritesGridHtml, circleSlotHtml };
})();
`;

// The definitions touch localStorage while building `state`; nothing else
// reaches for the DOM until boot, which we just removed.
const sandboxModule = { exports: {} };
vm.createContext(
  Object.assign(Object.create(null), {
    module: sandboxModule,
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    console
  })
);
vm.runInNewContext(headless, {
  module: sandboxModule,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  console
}, { filename: 'app.js' });

const { renderHero, renderStory, favouritesGridHtml, circleSlotHtml } = sandboxModule.exports;

/* ---- 2. Build the same DOM app.js would have built ---- */
function fillSlot(html, emptyTag, contents) {
  if (!html.includes(emptyTag)) {
    throw new Error(`Expected to find ${emptyTag} in the rendered home markup`);
  }
  return html.replace(emptyTag, emptyTag.replace('></', '>' + contents + '</'));
}

let main = renderHero();
main = fillSlot(main, '<div class="grid-5" id="favourites-grid"></div>', favouritesGridHtml());
main = fillSlot(main, '<div id="circle-slot"></div>', circleSlotHtml());
main += renderStory();

/* ---- 3. Write it into index.html, preserving the file's CRLF line endings ---- */
const indexSrc = fs.readFileSync(indexPath, 'utf8');
const mainRe = /<main id="app-main">[\s\S]*?<\/main>/;
if (!mainRe.test(indexSrc)) {
  throw new Error('Could not find <main id="app-main"> … </main> in index.html');
}

const crlf = indexSrc.includes('\r\n');
const block = `<main id="app-main">${main}</main>`;
let out = indexSrc.replace(mainRe, () => (crlf ? block.replace(/\r?\n/g, '\r\n') : block));

fs.writeFileSync(indexPath, out);
console.log(`index.html updated — ${main.length} chars of prerendered home markup`);
