/* ===========================================================
   Jirah Hub General Trading — site logic (vanilla JS, no build step)
   Three real pages: index.html (home), products.html, contact.html
   — <body data-page="home|products|contact"> tells this script
   which sections to build into #app-main.
=========================================================== */
(function () {
  'use strict';

  /* ---------------- Data ---------------- */
  const CATALOG = [
    { key: 'cups', name: 'Paper Cups', cat: 'Foodservice', seg: 'food', sub: 'Single, double wall & ripple, 4–16 oz with lids.', price: 'AED 96 / carton', img: 'assets/cups.webp', img2: 'assets/cups-alt.webp' },
    { key: 'plates', name: 'Paper Plates', cat: 'Foodservice', seg: 'food', sub: 'Round, square and compartment, paper & bagasse.', price: 'AED 68 / carton', img: 'assets/plates.webp', img2: 'assets/plates-alt.webp' },
    { key: 'packaging', name: 'Kraft Food Boxes', cat: 'Packaging', seg: 'food', sub: 'Leak-resistant boxes, clamshells and carry bags.', price: 'AED 115 / carton', img: 'assets/packaging.webp', img2: 'assets/packaging-alt.webp' },
    { key: 'foil', name: 'Foil & Cling Film', cat: 'Packaging', seg: 'food', sub: 'Catering rolls, hot-food containers, every gauge.', price: 'AED 88 / carton', img: 'assets/foil.webp', img2: 'assets/foil-alt.webp' },
    { key: 'disposables', name: 'Disposables', cat: 'Foodservice', seg: 'food', sub: 'Cutlery, straws, stirrers and portion cups.', price: 'AED 54 / carton', img: 'assets/disposables.webp', img2: 'assets/disposables-alt.webp' },
    { key: 'tissue', name: 'Tissue Paper', cat: 'Hygiene', seg: 'hygiene', sub: 'Facial, kitchen, toilet rolls and napkins.', price: 'AED 78 / carton', img: 'assets/tissue.webp', img2: 'assets/tissue-alt.webp' },
    { key: 'bags', name: 'Garbage Bags', cat: 'Hygiene', seg: 'hygiene', sub: 'Bin liners and refuse sacks, roll or flat.', price: 'AED 62 / carton', img: 'assets/bags.webp', img2: 'assets/bags-alt.webp' },
    { key: 'freshener', name: 'Air Freshener', cat: 'Hygiene', seg: 'hygiene', sub: 'Aerosol and auto-dispenser fragrance ranges.', price: 'AED 18 / can', img: 'assets/freshener.webp', img2: 'assets/freshener-alt.webp' },
    { key: 'cleaning', name: 'Cleaning Range', cat: 'Cleaning', seg: 'hygiene', sub: 'Detergents, sanitisers and the tools to use them.', price: 'AED 42 / 5 L', img: 'assets/cleaning.webp', img2: 'assets/cleaning-alt.webp' },
    { key: 'stationery', name: 'Office Stationery', cat: 'Office', seg: 'office', sub: 'Pens, paper, files and everyday desk supplies.', price: 'AED 24 / box', img: 'assets/stationery.webp', img2: 'assets/stationery-alt.webp' },
    { key: 'tea', name: 'Premium Tea Powder', cat: 'Pantry', seg: 'brand', sub: 'Strong, consistent blends in retail & catering packs.', price: 'AED 32 / kg', img: 'assets/tea.webp', img2: 'assets/tea-alt.webp' },
    { key: 'tees', name: 'Corporate T-Shirts', cat: 'Branded', seg: 'brand', sub: 'Polo and round-neck, printed with your logo.', price: 'AED 34 / pc', img: 'assets/tees.webp', img2: 'assets/tees-alt.webp' },
    { key: 'jacket', name: 'Jacket Logo Printing', cat: 'Branded', seg: 'brand', sub: 'Softshell jackets printed or embroidered with your logo.', price: 'AED 65 / pc', img: 'assets/jacket.webp', img2: 'assets/jacket-alt.webp' },
    { key: 'cap', name: 'Cap Printing', cat: 'Branded', seg: 'brand', sub: 'Cotton caps printed with your design, any colour.', price: 'AED 18 / pc', img: 'assets/cap.webp', img2: 'assets/cap-alt.webp' },
    { key: 'safetyshoe', name: 'Safety Shoe', cat: 'Safety', seg: 'safety', sub: 'Steel-toe safety boots for site and warehouse work.', price: 'AED 65 / pair', img: 'assets/safetyshoe.webp', img2: 'assets/safetyshoe-alt.webp' },
    { key: 'helmet', name: 'Safety Helmet', cat: 'Safety', seg: 'safety', sub: 'Impact-rated hard hats with adjustable strap.', price: 'AED 38 / pc', img: 'assets/helmet.webp', img2: 'assets/helmet-alt.webp' },
    { key: 'boilersuit', name: 'Boiler Safety Suit', cat: 'Safety', seg: 'safety', sub: 'Flame-resistant coveralls with reflective safety tape.', price: 'AED 85 / pc', img: 'assets/boilersuit.webp', img2: 'assets/boilersuit-alt.webp' },
    { key: 'mug', name: 'Mug Printing', cat: 'Branded', seg: 'brand', sub: 'Ceramic mugs printed with your logo or design.', price: 'AED 15 / pc', img: 'assets/mug.webp', img2: 'assets/mug-alt.webp' },
    { key: 'pen', name: 'Corporate Pen Printing', cat: 'Branded', seg: 'brand', sub: 'Metal-body pens engraved or printed with your brand.', price: 'AED 6 / pc', img: 'assets/pen.webp', img2: 'assets/pen-alt.webp' }
  ];

  const FAVOURITE_KEYS = ['cups', 'tissue', 'packaging', 'cleaning', 'tees'];
  const HERO_SLIDE_KEYS = ['cups', 'tissue', 'packaging', 'cleaning', 'tees', 'tea'];
  const SEGMENTS = [
    ['all', 'All products'], ['food', 'Foodservice'], ['hygiene', 'Hygiene & Cleaning'],
    ['office', 'Office'], ['safety', 'Safety & PPE'], ['brand', 'Pantry & Branded']
  ];
  const COVERAGE = ['Dubai', 'Sharjah', 'Ajman', 'Abu Dhabi', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
  const FAQ = [
    { q: 'What areas does Jirah Hub deliver to?', a: 'All seven emirates of the UAE — next-day delivery to Dubai, Sharjah and Ajman, with scheduled runs to Abu Dhabi, Umm Al Quwain, Ras Al Khaimah and Fujairah.' },
    { q: 'Do you sell wholesale and retail?', a: 'Both. Order by the carton for wholesale volume or by the pack for smaller retail orders — same fair pricing and reliable stock either way.' },
    { q: 'How fast will I get a quote?', a: 'Usually the same day. Send your requirements through the quote form or WhatsApp and we’ll confirm pricing and a delivery window.' },
    { q: 'What product categories do you carry?', a: 'Twelve categories: paper cups, paper plates, kraft food packaging, foil & cling film, disposables, tissue paper, garbage bags, air freshener, cleaning supplies, office stationery, premium tea powder, and branded corporate t-shirts.' },
    { q: 'How do I place an order?', a: 'Call or WhatsApp us, or fill out the quote request form with what you need — we’ll reply with pricing and confirm the order and delivery window.' }
  ];
  // Both numbers work for Call and WhatsApp; the first is used as the
  // default target when auto-redirecting after a form submission.
  const PHONE_NUMBERS = [
    { display: '+971 54 153 2561', digits: '971541532561' },
    { display: '+971 55 326 2561', digits: '971553262561' }
  ];
  const WHATSAPP_NUMBER = PHONE_NUMBERS[0].digits;
  const CONTACT_EMAIL = 'Sales@jirahhub.com';
  const PREFILL_KEY = 'jh_prefill';

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- State ---------------- */
  const state = {
    filter: 'all',
    search: '',
    favs: JSON.parse(localStorage.getItem('jh_favs') || '{}'),
    joined: localStorage.getItem('jh_joined') === '1',
    sent: false
  };

  function saveFavs() { localStorage.setItem('jh_favs', JSON.stringify(state.favs)); }

  /* ---------------- Icons ---------------- */
  const ICON = {
    search: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.3-4.3"/></svg>',
    bag: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14l1.2 13.2a1 1 0 01-1 1.1H4.8a1 1 0 01-1-1.1z"/><path d="M8.5 10V6.8a3.5 3.5 0 017 0V10"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    heart: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0112 8.4a4.2 4.2 0 017 2.3c0 4.9-7 9.3-7 9.3z"/></svg>',
    heartOn: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0112 8.4a4.2 4.2 0 017 2.3c0 4.9-7 9.3-7 9.3z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c0-8 5-14 16-15 0 10-5.5 15-11 15-2 0-5 0-5 0z"/><path d="M4 20c3-5 6.5-8 11.5-10.5"/></svg>',
    award: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14.5L8 22l4-2 4 2-1-7.5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h11v10H2zM13 9h4l3 3v4h-7z"/><circle cx="6" cy="18.5" r="1.7"/><circle cx="17" cy="18.5" r="1.7"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0113.7-5.6L21 9"/><path d="M21 4v5h-5"/><path d="M20 12a8 8 0 01-13.7 5.6L3 15"/><path d="M3 20v-5h5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>',
    headset: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 1116 0v2"/><rect x="2.5" y="13.5" width="4" height="6" rx="1.6"/><rect x="17.5" y="13.5" width="4" height="6" rx="1.6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
    bagLine: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14l1.2 13.2a1 1 0 01-1 1.1H4.8a1 1 0 01-1-1.1z"/><path d="M8.5 10V6.8a3.5 3.5 0 017 0V10"/></svg>',
    heartLine: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5S4 15.6 4 10.4A4.6 4.6 0 0112 7.9a4.6 4.6 0 018 2.5c0 5.2-8 10.1-8 10.1z"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.8 2z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.8-5.3A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.2-1.1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    sprig: '<svg viewBox="0 0 60 70" width="60" height="70" fill="none" stroke="#7FA466" stroke-width="1.2" stroke-linecap="round"><path d="M42 4C30 20 22 42 20 66"/><path d="M38 14c-9-2-16 2-18 10 8 3 15-1 18-10z"/><path d="M33 28c-9-2-17 2-19 11 9 3 16-2 19-11z"/><path d="M28 43c-9-2-17 3-19 12 9 2 16-3 19-12z"/></svg>',
    leafBig: '<svg viewBox="0 0 70 80" width="66" height="76" fill="none" stroke="#8FBF74" stroke-width="1.1" stroke-linecap="round"><path d="M52 6C36 24 26 48 24 76"/><path d="M48 20c-11-3-20 2-23 12 10 4 19-2 23-12z"/><path d="M40 40c-11-3-21 3-24 14 11 3 20-3 24-14z"/></svg>',
    paw: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20c-3.6 0-6-1.9-6-4.3 0-2 1.7-3.2 3-4.6C10.4 9.5 11 8 12 8s1.6 1.5 3 3.1c1.3 1.4 3 2.6 3 4.6 0 2.4-2.4 4.3-6 4.3z"/><circle cx="7" cy="7.5" r="1.8"/><circle cx="17" cy="7.5" r="1.8"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2c.6 4.2 2.4 7 6.5 7.7-4.1.7-5.9 3.5-6.5 7.7-.6-4.2-2.4-7-6.5-7.7 4.1-.7 5.9-3.5 6.5-7.7z"/></svg>'
  };

  function seal() {
    return '<svg viewBox="0 0 140 140" width="100%" height="100%" style="display:block">' +
      '<defs><path id="sealArc" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"/></defs>' +
      '<circle cx="70" cy="70" r="62" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1"/>' +
      '<text fill="#FFFFFF" style="font-family:Jost,sans-serif;font-size:13px;letter-spacing:3.1px">' +
      '<textPath href="#sealArc" startOffset="2%">QUALITY&#160;&#160;&#183;&#160;&#160;TRUSTED&#160;&#160;&#183;&#160;&#160;JIRAH&#160;HUB&#160;&#183;</textPath></text>' +
      '<g transform="translate(58,56) scale(1)" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round">' +
      '<path d="M2 26c0-11 7-19 22-20 0 13-7 20-15 20-3 0-7 0-7 0z"/><path d="M2 26c4-7 9-11 16-14"/></g></svg>';
  }

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  /* ---------------- Favourites ---------------- */
  function toggleFav(key) {
    state.favs[key] = !state.favs[key];
    saveFavs();
    const name = (CATALOG.find((p) => p.key === key) || {}).name || key;
    $$(`[data-fav="${key}"]`).forEach((btn) => {
      const active = !!state.favs[key];
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('aria-label', (active ? 'Remove ' : 'Save ') + name + (active ? ' from your enquiry list' : ' to your enquiry list'));
      btn.innerHTML = active ? ICON.heartOn : ICON.heart;
      btn.classList.add('pop');
      setTimeout(() => btn.classList.remove('pop'), 350);
    });
    const count = Object.values(state.favs).filter(Boolean).length;
    const badge = $('#cart-badge');
    if (badge) { badge.textContent = count; badge.classList.remove('pulse'); void badge.offsetWidth; badge.classList.add('pulse'); }
  }

  function heartButton(key, name) {
    const active = !!state.favs[key];
    const label = (active ? 'Remove ' : 'Save ') + (name || key) + (active ? ' from your enquiry list' : ' to your enquiry list');
    return `<button class="heart-btn${active ? ' active' : ''}" data-fav="${key}" aria-label="${esc(label)}" aria-pressed="${active}">${active ? ICON.heartOn : ICON.heart}</button>`;
  }

  /* ---------------- Card templates ---------------- */
  function favouriteCard(p) {
    return `<article class="card reveal">
      <a href="category-${p.key}.html" aria-label="View details for ${esc(p.name)}">
      <div class="card-media">
        <img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
      </div>
      </a>
      ${heartButton(p.key, p.name)}
      <div class="card-body">
        <a href="category-${p.key}.html" class="card-name">${esc(p.name)}</a>
        <span class="card-cat">${esc(p.cat)}</span>
        <button class="quote-link" data-quote="${p.key}" style="margin-top:10px">Get a quote &rarr;</button>
      </div>
    </article>`;
  }

  function catalogueCard(p) {
    return `<article class="card reveal">
      <a href="category-${p.key}.html" aria-label="View details for ${esc(p.name)}">
      <div class="card-media ratio-43 card-slides" data-slideshow>
        <img class="card-slide-img active" src="${p.img}" alt="${esc(p.name)}" loading="lazy">
        <img class="card-slide-img" src="${p.img2}" alt="${esc(p.name)} detail" loading="lazy">
        <span class="card-slide-dots" aria-hidden="true"><i class="on"></i><i></i></span>
      </div>
      </a>
      ${heartButton(p.key, p.name)}
      <div class="card-body">
        <span class="card-tag">${esc(p.cat)}</span>
        <a href="category-${p.key}.html" class="card-name" style="margin-top:4px">${esc(p.name)}</a>
        <span class="card-sub">${esc(p.sub)}</span>
        <div class="card-foot">
          <button class="btn-outline btn" data-quote="${p.key}" style="padding:9px 20px;font-size:13.5px">Get a quote &rarr;</button>
        </div>
      </div>
    </article>`;
  }

  /* ---------------- Per-card auto slideshow (crossfades every ~1s) ---------------- */
  let slideshowTimers = [];
  function initCardSlideshows() {
    slideshowTimers.forEach(clearInterval);
    slideshowTimers = [];
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    $$('[data-slideshow]').forEach((host, idx) => {
      const imgs = $$('.card-slide-img', host);
      const dots = $$('.card-slide-dots i', host);
      if (imgs.length < 2) return;
      let i = 0;
      const timer = setInterval(() => {
        const next = (i + 1) % imgs.length;
        imgs[i].classList.remove('active');
        imgs[next].classList.add('active');
        if (dots.length) { dots[i].classList.remove('on'); dots[next].classList.add('on'); }
        i = next;
      }, 1000 + (idx % 4) * 120);
      slideshowTimers.push(timer);
    });
  }

  /* ---------------- HOME page ---------------- */
  function renderHero() {
    const slides = HERO_SLIDE_KEYS.map((k) => CATALOG.find((p) => p.key === k)).filter(Boolean);
    const slidesHtml = slides.map((p, i) =>
      `<img class="hero-carousel-img${i === 0 ? ' active' : ''}" src="${p.img}" alt="${esc(p.name)}">`
    ).join('');
    return `
    <section class="hero wrap" id="home">
      <div class="hero-blob-a"></div>
      <div class="hero-blob-b"></div>
      <div class="hero-grid">
        <div class="hero-copy reveal">
          <h1 class="hero-title">Better choices.<br>Beautiful supply.
            <span class="hero-leaf">${ICON.leafBig}</span>
          </h1>
          <p class="hero-lede">Eco-conscious consumables for the businesses of the UAE.</p>
          <a href="products.html" class="btn btn-primary" style="margin-top:34px">
            <span>Shop the Collection</span>
            <span class="btn-arrow">${ICON.arrow}</span>
          </a>
          <div class="trust-row">
            <span class="trust-item">${ICON.leaf} Eco-Friendly</span>
            <span class="trust-item">${ICON.truck} Bulk &amp; Retail</span>
            <span class="trust-item">${ICON.award} Premium Quality</span>
          </div>
        </div>
        <div class="hero-visual reveal">
          <div class="hero-photo" id="hero-carousel">${slidesHtml}</div>
          <div class="hero-seal">${seal()}</div>
        </div>
      </div>
    </section>

    <section class="wrap promises-wrap">
      <div class="promises reveal">
        <div class="promise"><span class="promise-icon" style="background:#E1F0D8;color:#2F6B1D">${ICON.truck}</span><span class="promise-title">UAE-Wide Delivery</span><span class="promise-body">All seven emirates</span></div>
        <div class="promise"><span class="promise-icon" style="background:#E3E9F6;color:#234070">${ICON.refresh}</span><span class="promise-title">Flexible Orders</span><span class="promise-body">Carton or single pack</span></div>
        <div class="promise"><span class="promise-icon" style="background:#E1F0D8;color:#2F6B1D">${ICON.lock}</span><span class="promise-title">Reliable Supply</span><span class="promise-body">Stock always held</span></div>
        <div class="promise"><span class="promise-icon" style="background:#E3E9F6;color:#234070">${ICON.headset}</span><span class="promise-title">Direct Support</span><span class="promise-body">Here to help anytime</span></div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <h2 class="section-title reveal">Shop Our Favourites</h2>
        <a href="products.html" class="section-link">View all products ${ICON.chevron}</a>
      </div>
      <div class="grid-5" id="favourites-grid"></div>
    </section>

    <section class="wrap" style="padding:clamp(24px,3vw,40px) var(--pad)">
      <div class="circle-band reveal">
        <div class="circle-copy">
          <h3 class="circle-title">Join the Jirah Trade Circle</h3>
          <p class="circle-lede">Contract pricing, early access to new stock, and monthly restock reminders for your account.</p>
          <div id="circle-slot"></div>
        </div>
        <div class="circle-photo"><img src="assets/packaging.webp" alt="Kraft packaging ready for delivery"></div>
        <div class="circle-quote">
          <span class="circle-quote-mark">&ldquo;</span>
          <p class="circle-quote-text">Supply with purpose makes every order easier to place.</p>
          <span class="circle-quote-leaf">${ICON.sprig}</span>
        </div>
      </div>
    </section>

    <section class="wrap values-section">
      <h3 class="values-title reveal">Good for your floor.<br>Good for the planet.</h3>
      <span style="opacity:.65">${ICON.sprig}</span>
      <div class="values-list">
        <div class="value-item reveal">${ICON.bagLine}<span>Sustainable<br><small>Materials</small></span></div>
        <div class="value-item reveal">${ICON.globe}<span>Ethically<br><small>Sourced</small></span></div>
        <div class="value-item reveal">${ICON.heartLine}<span>Positive Impact<br><small>Every order</small></span></div>
      </div>
    </section>`;
  }

  function renderStory() {
    const mission = [
      { title: 'One-stop supply', body: 'Twelve categories under one account — no juggling a dozen vendors for the things you use daily.' },
      { title: 'Wholesale & retail', body: 'Buy by the carton or by the pack. Same fair pricing and reliable stock, whatever your volume.' },
      { title: 'Kinder materials', body: 'Bagasse, kraft and recycled-content lines offered wherever a greener option performs as well.' }
    ];
    return `
    <div class="about-hero wrap" id="story">
      <div class="about-blob"></div>
      <div class="about-grid">
        <div class="reveal">
          <span class="eyebrow">Our story</span>
          <h1 class="about-title">A supplier that grows with you.</h1>
          <div class="about-copy">
            <p>Jirah Hub General Trading is a Sharjah-based wholesale and retail supplier of the everyday consumables a business can't run without — foodservice disposables, packaging, hygiene and cleaning supplies, office essentials and branded goods.</p>
            <p>We built it on one promise: quality products, trusted service, better value — with kinder materials wherever a greener option exists. One order, one invoice, one reliable delivery across all seven emirates.</p>
          </div>
        </div>
        <div class="about-photo reveal about-photo-logo"><img src="assets/logo-full.webp" alt="Jirah Hub General Trading"></div>
      </div>
    </div>
    <div class="wrap" style="padding-bottom:clamp(48px,6vw,84px)">
      <div class="mission-grid">
        ${mission.map((m, i) => `<div class="mission-card reveal"><span class="mission-no">0${i + 1}</span><h3>${esc(m.title)}</h3><p>${esc(m.body)}</p></div>`).join('')}
      </div>
    </div>`;
  }

  function renderFavouritesGrid() {
    const favourites = FAVOURITE_KEYS.map((k) => CATALOG.find((p) => p.key === k));
    $('#favourites-grid').innerHTML = favourites.map(favouriteCard).join('');
  }

  function renderCircleSlot() {
    const slot = $('#circle-slot');
    slot.innerHTML = state.joined
      ? `<span class="circle-joined">Welcome in &mdash; price list on its way &#10003;</span>`
      : `<form id="circle-form" class="circle-form">
          <input type="email" id="circle-email" required placeholder="Enter your email" aria-label="Email address">
          <button type="submit">Join Now</button>
        </form>`;
    const circleForm = $('#circle-form');
    if (circleForm) circleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#circle-email').value.trim();
      if (!email) return;
      state.joined = true;
      localStorage.setItem('jh_joined', '1');
      const msg = `Hi Jirah Hub, please add me to the Trade Circle.\nEmail: ${email}`;
      renderCircleSlot();
      toast('Redirecting you to WhatsApp to confirm…');
      setTimeout(() => { window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`; }, 500);
    });
  }

  /* ---------------- Hero image carousel (crossfade every 1s) ---------------- */
  function initHeroCarousel() {
    const host = $('#hero-carousel');
    if (!host) return;
    const imgs = $$('.hero-carousel-img', host);
    if (imgs.length < 2) return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    let i = 0;
    setInterval(() => {
      const next = (i + 1) % imgs.length;
      imgs[i].classList.remove('active');
      imgs[next].classList.add('active');
      i = next;
    }, 1000);
  }

  /* ---------------- PRODUCTS page ---------------- */
  function renderShopShell() {
    return `
    <section class="shop-hero" id="shop">
      <span class="shop-hero-dot sd-1"></span>
      <span class="shop-hero-dot sd-2"></span>
      <span class="shop-hero-sparkle sk-1">${ICON.sparkle}</span>
      <span class="shop-hero-sparkle sk-2">${ICON.sparkle}</span>
      <div class="shop-hero-wave-a"></div>
      <div class="shop-hero-wave-b"></div>
      <div class="wrap shop-hero-grid">
        <div class="shop-hero-copy reveal">
          <span class="shop-hero-brandline">${ICON.leaf} Jirah Hub Catalogue</span>
          <h1 class="shop-hero-title"><span class="accent">Everyday</span><br>Essentials.</h1>
          <span class="eyebrow" style="margin-top:14px">Wholesale &amp; retail &middot; Kinder choices</span>
          <p class="shop-hero-lede">Everyday essentials, safety wear and branded goods in one account. Tap a product for details, then send it straight to a quote.</p>
          <a href="contact.html" class="btn btn-primary" style="margin-top:26px">
            <span>Get a Quote</span>
            <span class="btn-arrow">${ICON.arrow}</span>
          </a>
        </div>
        <div class="shop-hero-visual reveal">
          <div class="shop-hero-photo-main"><img src="assets/cups.webp" alt="Paper cup range"></div>
          <div class="shop-hero-photo-sub"><img src="assets/tea.webp" alt="Premium tea powder"></div>
          <span class="shop-hero-leaf">${ICON.leafBig}</span>
        </div>
      </div>
      <div class="wrap">
        <div class="seg-row" id="seg-row"></div>
      </div>
    </section>
    <div class="section wrap" style="padding-top:clamp(14px,2vw,24px)">
      <div class="grid-fill" id="shop-grid"></div>
    </div>`;
  }

  function renderSegRow() {
    $('#seg-row').innerHTML = SEGMENTS.map(([key, label]) =>
      `<button class="btn-pill${state.filter === key ? ' active' : ''}" data-filter="${key}">${esc(label)}</button>`
    ).join('');
  }

  function renderShopGrid() {
    const q = state.search.trim().toLowerCase();
    const visible = CATALOG
      .filter((p) => state.filter === 'all' || p.seg === state.filter)
      .filter((p) => !q || (p.name + ' ' + p.sub + ' ' + p.cat).toLowerCase().includes(q));
    $('#shop-grid').innerHTML = visible.length
      ? visible.map(catalogueCard).join('')
      : `<p style="grid-column:1/-1;color:var(--ink-faint);padding:20px 0">No products match &ldquo;${esc(state.search)}&rdquo;.</p>`;
    initReveal();
    initCardSlideshows();
  }

  /* ---------------- CONTACT page ---------------- */
  function renderContactMarkup() {
    const contacts = [
      {
        label: 'Call', icon: ICON.phone,
        links: PHONE_NUMBERS.map((p) => ({ text: p.display, href: 'tel:+' + p.digits }))
      },
      {
        label: 'WhatsApp', icon: ICON.chat,
        links: PHONE_NUMBERS.map((p) => ({ text: p.display, href: 'https://wa.me/' + p.digits }))
      },
      { label: 'Email', icon: ICON.mail, links: [{ text: CONTACT_EMAIL, href: 'mailto:' + CONTACT_EMAIL }] },
      { label: 'Visit', icon: ICON.pin, links: [{ text: 'Samnan, Sharjah, UAE', href: 'https://maps.google.com/?q=Samnan,Sharjah,UAE' }] }
    ];
    return `
    <div class="contact-hero wrap" id="contact">
      <div class="contact-blob"></div>
      <span class="eyebrow reveal">Get in touch</span>
      <h1 class="contact-title reveal">Request a quote</h1>
      <div class="contact-layout">
        <div class="contact-card reveal">
          <div id="quote-form-slot"></div>
        </div>
        <div class="reveal">
          <div class="contact-list">
            ${contacts.map((c) => `<div class="contact-row">
              <span class="contact-icon">${c.icon}</span>
              <span>
                <span class="contact-label">${esc(c.label)}</span>
                <span class="contact-value-row">${c.links.map((l) => `<a href="${l.href}" ${l.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} class="contact-value">${esc(l.text)}</a>`).join('')}</span>
              </span>
            </div>`).join('')}
          </div>
          <p class="contact-note">Serving all seven emirates &middot; Delivery available UAE-wide</p>
        </div>
      </div>
    </div>
    <div class="wrap" style="padding-bottom:clamp(48px,6vw,84px)">
      <div class="coverage-band reveal">
        <div class="coverage-copy">
          <span class="eyebrow">Coverage</span>
          <h2 class="coverage-title">All seven emirates,<br>one delivery route.</h2>
          <p class="coverage-lede">Next-day drops across Dubai, Sharjah and Ajman; scheduled runs to Abu Dhabi, Umm Al Quwain, Ras Al Khaimah and Fujairah.</p>
          <div class="coverage-pills">${COVERAGE.map((e) => `<span class="coverage-pill">${esc(e)}</span>`).join('')}</div>
        </div>
        <div class="map-holder">
          <uae-map></uae-map>
          <div class="map-loading" id="map-loading"><span class="map-loading-spin"></span> Loading coverage map&hellip;</div>
        </div>
      </div>
    </div>
    <div class="wrap" style="padding-bottom:clamp(48px,6vw,84px)">
      <span class="eyebrow reveal">Common questions</span>
      <h2 class="section-title reveal" style="margin-top:12px">Frequently asked</h2>
      <div class="faq-list">
        ${FAQ.map((f) => `<div class="faq-item reveal">
          <h3 class="faq-q">${esc(f.q)}</h3>
          <p class="faq-a">${esc(f.a)}</p>
        </div>`).join('')}
      </div>
    </div>`;
  }

  function renderQuoteFormSlot() {
    const slot = $('#quote-form-slot');
    slot.innerHTML = state.sent
      ? `<div class="sent-state">
          <span class="sent-check">${ICON.check}</span>
          <h3>Request received</h3>
          <p>Taking you to WhatsApp to confirm &mdash; we'll send pricing and a delivery window, usually the same day.</p>
          <button class="btn-outline" id="reset-form">Send another</button>
        </div>`
      : `<form id="quote-form" class="qform" novalidate>
          <label>Name
            <input name="name" required autocomplete="name" aria-describedby="err-name">
            <span class="field-error" id="err-name"></span>
          </label>
          <label>Company
            <input name="company" autocomplete="organization">
            <span class="field-error"></span>
          </label>
          <label>Phone / WhatsApp
            <input name="phone" required autocomplete="tel" aria-describedby="err-phone">
            <span class="field-error" id="err-phone"></span>
          </label>
          <label>Email
            <input name="email" type="email" autocomplete="email" aria-describedby="err-email">
            <span class="field-error" id="err-email"></span>
          </label>
          <label class="full">What do you need?
            <textarea name="message" placeholder="e.g. 20 cartons 8oz cups, 500 kraft boxes, monthly cleaning supplies…"></textarea>
            <span class="field-error"></span>
          </label>
          <button type="submit" class="btn btn-primary submit">Send request</button>
        </form>`;

    const quoteForm = $('#quote-form');
    if (quoteForm) {
      const stored = sessionStorage.getItem(PREFILL_KEY);
      const fromUrl = new URLSearchParams(location.search).get('msg');
      const prefill = fromUrl || stored;
      if (prefill) {
        const ta = $('#quote-form textarea[name="message"]');
        if (ta) ta.value = prefill;
        sessionStorage.removeItem(PREFILL_KEY);
        if (fromUrl) {
          const clean = new URL(location.href);
          clean.searchParams.delete('msg');
          history.replaceState(null, '', clean.pathname + clean.search + clean.hash);
        }
      }
      const clearErrors = () => {
        $$('.field-error', quoteForm).forEach((el) => { el.textContent = ''; });
        $$('input, textarea', quoteForm).forEach((el) => el.classList.remove('invalid'));
      };
      const showError = (name, msg) => {
        const field = quoteForm.querySelector(`[name="${name}"]`);
        if (!field) return;
        field.classList.add('invalid');
        const err = document.getElementById('err-' + name);
        if (err) err.textContent = msg;
      };

      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        const data = Object.fromEntries(new FormData(quoteForm).entries());
        let firstInvalid = null;
        if (!data.name || !data.name.trim()) { showError('name', 'Please enter your name.'); firstInvalid = firstInvalid || 'name'; }
        if (!data.phone || !data.phone.trim()) { showError('phone', 'Please enter a phone or WhatsApp number.'); firstInvalid = firstInvalid || 'phone'; }
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showError('email', 'That email address doesn\'t look right.'); firstInvalid = firstInvalid || 'email'; }
        if (firstInvalid) {
          quoteForm.querySelector(`[name="${firstInvalid}"]`).focus();
          toast('Please fix the highlighted fields.');
          return;
        }
        const lines = [
          `Hi Jirah Hub, I'd like a quote.`,
          `Name: ${data.name}`,
          data.company ? `Company: ${data.company}` : '',
          `Phone: ${data.phone}`,
          data.email ? `Email: ${data.email}` : '',
          data.message ? `Details: ${data.message}` : ''
        ].filter(Boolean).join('\n');

        // Fire-and-forget: emails the request to Jirah Hub via FormSubmit
        // (no signup needed; the first-ever submission triggers a one-time
        // confirmation email FormSubmit sends to CONTACT_EMAIL).
        fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `New quote request from ${data.name} — Jirah Hub website`,
            Name: data.name,
            Company: data.company || '—',
            Phone: data.phone,
            Email: data.email || '—',
            Details: data.message || '—'
          })
        }).catch(() => {});

        state.sent = true;
        renderQuoteFormSlot();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
        }, 1400);
      });
    }

    const resetBtn = $('#reset-form');
    if (resetBtn) resetBtn.addEventListener('click', () => { state.sent = false; renderQuoteFormSlot(); });
  }

  /* ---------------- Reveal on scroll ---------------- */
  let io;
  function initReveal() {
    const els = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- Quote message builder ---------------- */
  function buildQuoteMessage(prefillKey) {
    const savedNames = Object.keys(state.favs).filter((k) => state.favs[k]).map((k) => (CATALOG.find((p) => p.key === k) || {}).name).filter(Boolean);
    if (prefillKey) {
      const p = CATALOG.find((x) => x.key === prefillKey);
      return p ? `Hi Jirah Hub, I'd like a quote for: ${p.name}.` : '';
    }
    if (savedNames.length) return `Hi Jirah Hub, I'd like a quote for: ${savedNames.join(', ')}.`;
    return '';
  }

  function goToContactWithMessage(msg) {
    const page = document.body.dataset.page;
    if (page === 'contact') {
      const ta = $('#quote-form textarea[name="message"]');
      if (ta && msg) ta.value = msg;
      $('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (msg) sessionStorage.setItem(PREFILL_KEY, msg); else sessionStorage.removeItem(PREFILL_KEY);
    window.location.href = 'contact.html' + (msg ? '?msg=' + encodeURIComponent(msg) : '');
  }

  /* ---------------- Global event delegation ---------------- */
  function bindGlobalEvents() {
    document.body.addEventListener('click', (e) => {
      const favBtn = e.target.closest('[data-fav]');
      if (favBtn) { toggleFav(favBtn.dataset.fav); return; }

      const filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        state.filter = filterBtn.dataset.filter;
        renderSegRow();
        renderShopGrid();
        return;
      }

      const quoteBtn = e.target.closest('[data-quote]');
      if (quoteBtn) {
        e.preventDefault();
        goToContactWithMessage(buildQuoteMessage(quoteBtn.dataset.quote));
        return;
      }
    });
  }

  /* ---------------- Chrome (header/footer, shared across pages) ---------------- */
  function initChrome() {
    const page = document.body.dataset.page;

    $$('.nav-link').forEach((a) => {
      if (a.dataset.page === page) a.setAttribute('aria-current', 'page');
    });
    if (page === 'home' && location.hash === '#story') {
      $$('.nav-link').forEach((a) => a.removeAttribute('aria-current'));
      const storyLink = $('.nav-link[data-page="story"]');
      if (storyLink) storyLink.setAttribute('aria-current', 'page');
    }

    const searchForm = $('#search-form');
    const searchInput = $('#search-input');
    const params = new URLSearchParams(location.search);
    const qParam = params.get('q');

    if (page === 'products' && $('#shop-grid')) {
      if (qParam) { state.search = qParam; searchInput.value = qParam; }
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        state.filter = 'all';
        renderSegRow();
        renderShopGrid();
        $('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderShopGrid();
      });
    } else {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = searchInput.value.trim();
        window.location.href = 'products.html' + (v ? '?q=' + encodeURIComponent(v) : '');
      });
    }

    $('#cart-btn').addEventListener('click', () => {
      const count = Object.values(state.favs).filter(Boolean).length;
      if (!count) { toast('Heart a product to add it to your enquiry list.'); return; }
      goToContactWithMessage(buildQuoteMessage());
    });
    const navToggle = $('#nav-toggle');
    const navLinksEl = $('#nav-links');
    navToggle.addEventListener('click', () => {
      const open = navLinksEl.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav-link').forEach((a) => a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
    $('#year').textContent = new Date().getFullYear();

    const count = Object.values(state.favs).filter(Boolean).length;
    const badge = $('#cart-badge');
    if (badge) badge.textContent = count;
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    const main = $('#app-main');

    // Header/nav/search/cart/footer wiring — runs on every page, including
    // static category detail pages that don't render into #app-main.
    initChrome();
    bindGlobalEvents();

    if (page === 'home' && main) {
      main.innerHTML = renderHero() + renderStory();
      renderFavouritesGrid();
      renderCircleSlot();
      initHeroCarousel();
    } else if (page === 'products' && main) {
      main.innerHTML = renderShopShell();
      renderSegRow();
      renderShopGrid();
    } else if (page === 'contact' && main) {
      main.innerHTML = renderContactMarkup();
      renderQuoteFormSlot();
      const mapLoading = $('#map-loading');
      const mapEl = $('.map-holder uae-map');
      if (mapLoading && mapEl) {
        const hide = () => mapLoading.classList.add('hide');
        mapEl.addEventListener('map-ready', hide, { once: true });
        mapEl.addEventListener('map-error', hide, { once: true });
      }
    }

    // Product-detail pages ship their own static markup with a
    // [data-quote] CTA and heart button already in the HTML — bindGlobalEvents()
    // (delegated on document.body) picks those up automatically.
    $$('[data-fav]').forEach((btn) => {
      const active = !!state.favs[btn.dataset.fav];
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
      if (active) btn.innerHTML = ICON.heartOn;
    });

    initReveal();
  });
})();
