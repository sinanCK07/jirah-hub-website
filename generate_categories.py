# -*- coding: utf-8 -*-
"""One-off generator for the 12 static category detail pages.
Run with: python generate_categories.py
Safe to re-run any time the CATEGORIES data below changes.
"""
import html

CATEGORIES = [
    {
        "key": "cups", "name": "Paper Cups", "cat": "Foodservice", "price": "AED 96 / carton",
        "img": "assets/cups.webp", "img2": "assets/cups-alt.webp",
        "lede": "Our paper cup range covers every hot and cold beverage need — from double-wall ripple cups that insulate without a sleeve, to single-wall cups for cold drinks. Stocked in the sizes UAE cafés and offices order most, with matching lids always in stock.",
        "specs": [
            "Sizes: 4oz, 6oz, 8oz, 10oz, 12oz, 16oz",
            "Wall types: single wall, double wall, ripple wall",
            "Colours: kraft brown, white, black",
            "Lids: flat, dome and sip-through for every size",
            "Pack: sold by the carton (sleeves of 50)",
        ],
        "uses": ["Cafés & coffee shops", "Office pantries", "Catering & events", "Food trucks & kiosks"],
    },
    {
        "key": "plates", "name": "Paper Plates", "cat": "Foodservice", "price": "AED 68 / carton",
        "img": "assets/plates.webp", "img2": "assets/plates-alt.webp",
        "lede": "Round, square and compartment plates in paper and bagasse, built to hold hot food without soaking through — a practical, biodegradable alternative to reusable crockery for busy kitchens.",
        "specs": [
            "Sizes: 6″, 7″, 9″, 10″",
            "Materials: coated paper, bagasse (sugarcane pulp)",
            "Styles: round, square, 3-compartment, 5-compartment",
            "Grease & moisture-resistant coating",
            "Pack: 500 or 1000 per carton depending on size",
        ],
        "uses": ["Buffets & catering", "Canteens & staff cafeterias", "Takeaway counters", "School & labour camp messing"],
    },
    {
        "key": "packaging", "name": "Kraft Food Boxes", "cat": "Packaging", "price": "AED 115 / carton",
        "img": "assets/packaging.webp", "img2": "assets/packaging-alt.webp",
        "lede": "Leak-resistant kraft boxes, clamshells, carry bags and foil trays for hot, cold and greasy food — the full packaging line a kitchen needs to get orders out the door looking sharp.",
        "specs": [
            "Formats: kraft carry bags, food boxes, clamshells, foil trays",
            "Sizes: small, medium, large and family-size options",
            "Leak & grease-resistant lining",
            "Stackable, space-efficient carton packing",
            "Custom branding available on request (MOQ applies)",
        ],
        "uses": ["Delivery & takeaway", "Cloud kitchens", "Bakeries & patisseries", "Retail food counters"],
    },
    {
        "key": "foil", "name": "Foil & Cling Film", "cat": "Packaging", "price": "AED 88 / carton",
        "img": "assets/foil.webp", "img2": "assets/foil-alt.webp",
        "lede": "Catering-grade aluminium foil, cling film and disposable foil containers in every gauge a commercial kitchen runs through daily — from wrapping to full hot-food service trays.",
        "specs": [
            "Foil widths: 30cm, 45cm rolls; catering & jumbo lengths",
            "Foil containers: multiple tray sizes with matching lids",
            "Cling film: food-grade, various widths",
            "Heavy-duty and standard gauge options",
            "Pack: boxed rolls, cartons of trays",
        ],
        "uses": ["Hot food holding & transport", "Kitchen prep & storage", "Catering service lines", "Grocery & butchery counters"],
    },
    {
        "key": "disposables", "name": "Disposables", "cat": "Foodservice", "price": "AED 54 / carton",
        "img": "assets/disposables.webp", "img2": "assets/disposables-alt.webp",
        "lede": "Cutlery, straws, stirrers and portion cups for every foodservice counter — practical, consistent quality at prices that make sense at volume.",
        "specs": [
            "Cutlery: fork, knife, spoon — individually or as kits",
            "Straws: paper and plastic, regular & jumbo",
            "Portion cups: 1oz–4oz with lids for sauces & condiments",
            "Stirrers: wood and plastic",
            "Pack: boxes of 1000, cartons of 10 boxes",
        ],
        "uses": ["Restaurants & cafés", "Catering & events", "Office pantries", "Food courts"],
    },
    {
        "key": "tissue", "name": "Tissue Paper", "cat": "Hygiene", "price": "AED 78 / carton",
        "img": "assets/tissue.webp", "img2": "assets/tissue-alt.webp",
        "lede": "Facial tissue, kitchen rolls, toilet rolls and napkins in soft and strong grades, supplied in the volumes a hotel, office or restaurant actually uses.",
        "specs": [
            "Types: facial tissue, kitchen towel, toilet rolls, napkins",
            "Ply: 1-ply, 2-ply and 3-ply options",
            "Sheet counts & roll lengths matched to commercial dispensers",
            "Recycled-content lines available",
            "Pack: cartons of 10–48 rolls/packs depending on type",
        ],
        "uses": ["Washrooms & housekeeping", "Hotel & hospitality", "Restaurant tables", "Office pantries"],
    },
    {
        "key": "bags", "name": "Garbage Bags", "cat": "Hygiene", "price": "AED 62 / carton",
        "img": "assets/bags.webp", "img2": "assets/bags-alt.webp",
        "lede": "Bin liners and refuse sacks in every size and thickness a facility needs, from kitchen bins to industrial waste — sold by the roll or flat-packed.",
        "specs": [
            "Sizes: small (30L), medium (60L), large (100L+), heavy-duty (150L+)",
            "Colours: black, clear / transparent",
            "Gauge: light, medium and heavy-duty thickness",
            "Format: roll or flat-pack",
            "Pack: cartons of 5–20 rolls depending on size",
        ],
        "uses": ["Kitchens & housekeeping", "Facilities & janitorial", "Industrial & warehouse waste", "Construction sites"],
    },
    {
        "key": "freshener", "name": "Air Freshener", "cat": "Hygiene", "price": "AED 18 / can",
        "img": "assets/freshener.webp", "img2": "assets/freshener-alt.webp",
        "lede": "Aerosol and auto-dispenser fragrance ranges that keep washrooms, offices and vehicles smelling clean all day — consistent scent, consistent stock.",
        "specs": [
            "Formats: aerosol cans, auto-dispenser refills",
            "Multiple fragrance options in stock",
            "Dispenser units available for auto-spray systems",
            "Long-lasting, continuous-release formulas",
            "Pack: cartons of 12 cans / 6 refills",
        ],
        "uses": ["Washrooms & lobbies", "Offices & reception areas", "Hospitality & guest rooms", "Vehicles & fleets"],
    },
    {
        "key": "cleaning", "name": "Cleaning Range", "cat": "Cleaning", "price": "AED 42 / 5 L",
        "img": "assets/cleaning.webp", "img2": "assets/cleaning-alt.webp",
        "lede": "Detergents, sanitisers, degreasers and the tools to use them — a complete cleaning programme for kitchens, washrooms and general facilities under one account.",
        "specs": [
            "Detergents: floor, glass, multi-surface, dishwash",
            "Sanitisers & disinfectants for food-contact and general surfaces",
            "Tools: mops, buckets, gloves, scourers, microfibre cloths",
            "Concentrate and ready-to-use formats",
            "Pack: 5L, 20L containers; tools sold individually or in kits",
        ],
        "uses": ["Commercial kitchens", "Housekeeping & facilities", "Washrooms", "Industrial cleaning"],
    },
    {
        "key": "stationery", "name": "Office Stationery", "cat": "Office", "price": "AED 24 / box",
        "img": "assets/stationery.webp", "img2": "assets/stationery-alt.webp",
        "lede": "Pens, paper, files and the everyday desk supplies an office reorders every month — one line item on your invoice instead of a dozen.",
        "specs": [
            "Writing: pens, pencils, markers, highlighters",
            "Paper: A4 copy paper, notepads, sticky notes",
            "Filing: files, folders, envelopes, binders",
            "Desk accessories: staplers, tape, clips, organisers",
            "Pack: boxes and packs sized for office reordering",
        ],
        "uses": ["Corporate offices", "Schools & training centres", "Government & institutional accounts", "Retail stationery counters"],
    },
    {
        "key": "tea", "name": "Premium Tea Powder", "cat": "Pantry", "price": "AED 32 / kg",
        "img": "assets/tea.webp", "img2": "assets/tea-alt.webp",
        "lede": "Strong, consistent tea blends in retail and catering pack sizes — the same reliable cup, whether you're brewing one pot or serving a canteen.",
        "specs": [
            "Blends: classic strong blend; premium cardamom on request",
            "Pack sizes: retail (250g–1kg), catering bulk (5kg–25kg)",
            "Consistent strength batch to batch",
            "Private-label packaging available (MOQ applies)",
            "Shelf-stable, long shelf life",
        ],
        "uses": ["Cafeterias & canteens", "Hospitality & catering", "Retail & grocery", "Office pantries"],
    },
    {
        "key": "tees", "name": "Corporate T-Shirts", "cat": "Branded", "price": "AED 34 / pc",
        "img": "assets/tees.webp", "img2": "assets/tees-alt.webp",
        "lede": "Customised polo, round-neck and other t-shirt styles printed with your company logo and name — perfect for teams, promotions, events, uniforms and giveaways. Choose the style, colours and quantities that suit your requirements, with professional-quality printing and reliable service from Jirah Hub.",
        "specs": [
            "Styles: polo, round-neck and other t-shirt styles",
            "Sleeves: full sleeve or half sleeve, with or without cuffs",
            "Colours: plain, single-colour or contrast-colour, full range available",
            "Sizes: S–3XL",
            "Printing: screen print, embroidery or heat transfer",
            "MOQ applies per print method — ask for details",
        ],
        "uses": ["Staff uniforms", "Corporate events & promotions", "Giveaways & merchandising", "Team & franchise branding"],
    },
    {
        "key": "jacket", "name": "Jacket Logo Printing", "cat": "Branded", "price": "AED 65 / pc",
        "img": "assets/jacket.webp", "img2": "assets/jacket-alt.webp",
        "lede": "Softshell and windbreaker jackets printed or embroidered with your company logo — a step up from t-shirts for staff who work outdoors or represent your brand off-site.",
        "specs": [
            "Styles: softshell, windbreaker, fleece-lined",
            "Colours: black, navy and custom on request",
            "Sizes: S–3XL",
            "Branding: chest print, back print or embroidery",
            "MOQ applies — ask for details",
        ],
        "uses": ["Field & site staff", "Corporate uniforms", "Winter promotions", "Team & franchise branding"],
    },
    {
        "key": "cap", "name": "Cap Printing", "cat": "Branded", "price": "AED 18 / pc",
        "img": "assets/cap.webp", "img2": "assets/cap-alt.webp",
        "lede": "Cotton dad caps printed with your logo or design — a low-cost, high-visibility branded item for staff, giveaways and events.",
        "specs": [
            "Material: 100% cotton twill",
            "Colours: yellow, red, white and more on request",
            "Adjustable strap, one size fits most",
            "Branding: embroidery or screen print",
            "Pack: sold individually or in bulk cartons",
        ],
        "uses": ["Staff uniforms", "Trade shows & events", "Retail giveaways", "Team branding"],
    },
    {
        "key": "safetyshoe", "name": "Safety Shoe", "cat": "Safety", "price": "AED 65 / pair",
        "img": "assets/safetyshoe.webp", "img2": "assets/safetyshoe-alt.webp",
        "lede": "Steel-toe safety boots built for site, warehouse and industrial work — reliable protection at a price that works across a full crew.",
        "specs": [
            "Toe protection: steel toe cap",
            "Sole: slip-resistant, oil-resistant rubber",
            "Upper: genuine leather",
            "Sizes: 39–46 (EU)",
            "Pack: sold by the pair, bulk crew orders available",
        ],
        "uses": ["Construction sites", "Warehouses & logistics", "Industrial facilities", "Maintenance crews"],
    },
    {
        "key": "helmet", "name": "Safety Helmet", "cat": "Safety", "price": "AED 38 / pc",
        "img": "assets/helmet.webp", "img2": "assets/helmet-alt.webp",
        "lede": "Impact-rated hard hats with an adjustable ratchet strap and reflective safety panels — standard-issue protection for any site or warehouse crew.",
        "specs": [
            "Shell: high-density impact-resistant plastic",
            "Strap: adjustable ratchet, four-point harness",
            "Reflective safety panels for low-light visibility",
            "Colours: yellow, white, red, blue",
            "Pack: sold individually or in bulk crew orders",
        ],
        "uses": ["Construction sites", "Warehouses & logistics", "Industrial facilities", "Site visitors & contractors"],
    },
    {
        "key": "boilersuit", "name": "Boiler Safety Suit", "cat": "Safety", "price": "AED 85 / pc",
        "img": "assets/boilersuit.webp", "img2": "assets/boilersuit-alt.webp",
        "lede": "Flame-resistant coveralls with reflective safety tape — full-body protection for oilfield, industrial and site work crews.",
        "specs": [
            "Material: flame-resistant treated cotton",
            "Reflective tape on arms and legs",
            "Multiple pockets, reinforced stitching",
            "Colours: orange, navy",
            "Sizes: S–3XL",
        ],
        "uses": ["Oilfield & industrial sites", "Warehouses & logistics", "Maintenance crews", "Site contractors"],
    },
    {
        "key": "mug", "name": "Mug Printing", "cat": "Branded", "price": "AED 15 / pc",
        "img": "assets/mug.webp", "img2": "assets/mug-alt.webp",
        "lede": "Ceramic mugs printed with your logo or design — a practical everyday branded item for offices, gifting and giveaways.",
        "specs": [
            "Material: ceramic, dishwasher-safe printing",
            "Capacity: 11oz standard",
            "Colours: white body, full-colour print",
            "Branding: full-wrap or single-side print",
            "Pack: sold individually or in bulk cartons",
        ],
        "uses": ["Office gifting", "Corporate giveaways", "Retail merchandising", "Events & promotions"],
    },
    {
        "key": "pen", "name": "Corporate Pen Printing", "cat": "Branded", "price": "AED 6 / pc",
        "img": "assets/pen.webp", "img2": "assets/pen-alt.webp",
        "lede": "Metal-body pens engraved or printed with your brand — a low-cost giveaway that keeps your name on every desk it lands on.",
        "specs": [
            "Body: metal, matte or gloss finish",
            "Colours: navy, white, black and more on request",
            "Branding: laser engraving or pad print",
            "MOQ applies — ask for details",
            "Pack: sold in bulk cartons",
        ],
        "uses": ["Corporate giveaways", "Events & conferences", "Office supplies", "Client gifting"],
    },
]

ICON_CHECK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
ICON_ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'

def e(s):
    return html.escape(s, quote=True)

def subnav(active_key):
    items = []
    for c in CATEGORIES:
        current = ' aria-current="page"' if c["key"] == active_key else ''
        items.append(f'<a href="category-{c["key"]}.html"{current}>{e(c["name"])}</a>')
    return '\n        '.join(items)

def page(cat, idx):
    key = cat["key"]
    n = len(CATEGORIES)
    prev_cat = CATEGORIES[(idx - 1) % n]
    next_cat = CATEGORIES[(idx + 1) % n]
    quote_msg = f"Hi Jirah Hub, I'd like a quote for: {cat['name']}."
    specs_html = '\n            '.join(
        f'<div class="spec-item">{ICON_CHECK}<span>{e(s)}</span></div>' for s in cat["specs"]
    )
    uses_html = '\n            '.join(f'<span class="use-chip">{e(u)}</span>' for u in cat["uses"])
    img_small = cat['img'][:-5] + '-360.webp'
    img_large = cat['img'][:-5] + '-960.webp'
    img_sizes = '(max-width: 720px) 92vw, 552px'
    img_srcset = f'{img_small} 360w, {cat["img"]} 480w, {img_large} 960w'

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(cat["name"])} — Jirah Hub General Trading</title>
<meta name="description" content="{e(cat['lede'][:155])}">
<meta name="theme-color" content="#0F2E5C">

<link rel="icon" href="assets/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="canonical" href="https://jirahhub.com/category-{key}.html">

<meta property="og:type" content="product">
<meta property="og:url" content="https://jirahhub.com/category-{key}.html">
<meta property="og:site_name" content="Jirah Hub General Trading">
<meta property="og:title" content="{e(cat['name'])} — Jirah Hub General Trading">
<meta property="og:description" content="{e(cat['lede'][:155])}">
<meta property="og:image" content="https://jirahhub.com/{cat['img']}">
<meta property="og:locale" content="en_AE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(cat['name'])} — Jirah Hub General Trading">
<meta name="twitter:description" content="{e(cat['lede'][:155])}">
<meta name="twitter:image" content="https://jirahhub.com/{cat['img']}">

<link rel="preload" as="font" type="font/woff2" href="assets/fonts/jost-var-latin.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/dm-serif-display-400-latin.woff2" crossorigin>
<link rel="preload" as="image" href="{cat['img']}" imagesrcset="{img_srcset}" imagesizes="{img_sizes}" fetchpriority="high">
<link rel="stylesheet" href="styles.css?v=8">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{e(cat['name'])}",
  "category": "{e(cat['cat'])}",
  "description": "{e(cat['lede'])}",
  "image": "https://jirahhub.com/{cat['img']}",
  "brand": {{ "@type": "Brand", "name": "Jirah Hub General Trading" }}
}}
</script>
</head>
<body data-page="products">

<a href="#main" class="sr-only">Skip to content</a>

<header class="site-header">
  <nav class="nav">
    <a href="/" class="brand">
      <span class="brand-mark"><img src="assets/logo-64.webp" alt="" width="40" height="40"></span>
      <span class="brand-text">
        <span class="brand-name">jirah <span>hub</span></span>
        <span class="brand-sub">Quality &middot; Trusted &middot; Value</span>
      </span>
    </a>

    <div class="nav-links" id="nav-links">
      <a href="/" class="nav-link" data-page="home">Home</a>
      <a href="/products" class="nav-link" data-page="products" aria-current="page">Shop All</a>
      <a href="/#story" class="nav-link" data-page="story">Our Story</a>
      <a href="/contact" class="nav-link" data-page="contact">Contact</a>
    </div>

    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>

    <form id="search-form" class="nav-search" role="search">
      <input id="search-input" type="text" placeholder="Search products&hellip;" aria-label="Search products">
      <button type="submit" aria-label="Search"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.3-4.3"/></svg></button>
    </form>

    <button id="cart-btn" class="icon-btn" aria-label="View enquiry list, 0 items">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14l1.2 13.2a1 1 0 01-1 1.1H4.8a1 1 0 01-1-1.1z"/><path d="M8.5 10V6.8a3.5 3.5 0 017 0V10"/></svg>
      <span class="badge" id="cart-badge">0</span>
    </button>
  </nav>
</header>

<nav class="cat-subnav" aria-label="Product categories">
  <div class="cat-subnav-inner">
        {subnav(key)}
  </div>
</nav>

<main id="main">
  <div class="wrap">
    <p class="breadcrumb">
      <a href="/">Home</a> &rsaquo;
      <a href="/products">Shop All</a> &rsaquo;
      <span class="current">{e(cat["name"])}</span>
    </p>
  </div>

  <section class="cat-hero wrap">
    <div class="cat-hero-grid">
      <div class="reveal">
        <span class="card-tag">{e(cat["cat"])}</span>
        <h1 class="cat-hero-title">{e(cat["name"])}</h1>
        <p class="cat-hero-lede">{e(cat["lede"])}</p>
        <div class="cat-hero-ctas">
          <button type="button" class="btn btn-primary" data-quote="{key}">
            <span>Get a quote</span>
            <span class="btn-arrow">{ICON_ARROW}</span>
          </button>
          <a href="/products" class="btn-outline btn">Back to full catalogue</a>
        </div>
      </div>
      <div class="cat-hero-media reveal">
        <img src="{cat['img']}" srcset="{img_srcset}" sizes="{img_sizes}" alt="{e(cat['name'])}" fetchpriority="high">
      </div>
    </div>
  </section>

  <section class="cat-section wrap">
    <h2 class="cat-section-title reveal">Specifications</h2>
    <div class="spec-grid reveal">
            {specs_html}
    </div>
  </section>

  <section class="cat-section wrap">
    <h2 class="cat-section-title reveal">Ideal for</h2>
    <div class="use-chip-row reveal">
            {uses_html}
    </div>
  </section>

  <section class="cat-section wrap" style="border-top:0">
    <div class="cat-cta-band reveal">
      <div>
        <h3>Need {e(cat["name"])} for your business?</h3>
        <p>Tell us the quantity and delivery timeline &mdash; we'll send pricing and confirm the drop-off window, usually the same day.</p>
      </div>
      <button type="button" class="btn btn-primary" data-quote="{key}">
        <span>Request pricing</span>
        <span class="btn-arrow">{ICON_ARROW}</span>
      </button>
    </div>
  </section>

  <nav class="wrap cat-prevnext" aria-label="More categories">
    <a href="category-{prev_cat['key']}.html">
      <span class="dir">&larr; Previous</span>
      <span class="name">{e(prev_cat["name"])}</span>
    </a>
    <a href="category-{next_cat['key']}.html" class="cp-next">
      <span class="dir">Next &rarr;</span>
      <span class="name">{e(next_cat["name"])}</span>
    </a>
  </nav>
</main>

<footer class="site-footer">
  <div class="wrap footer-row">
    <span class="footer-brand">jirah <span>hub</span><small>General Trading</small></span>
    <div class="footer-links">
      <a href="tel:+971541532561">+971 54 153 2561</a>
      <a href="tel:+971553262561">+971 55 326 2561</a>
      <a href="mailto:Sales@jirahhub.com">Sales@jirahhub.com</a>
      <span>Samnan, Sharjah &middot; Serving all seven emirates</span>
    </div>
  </div>
  <div class="wrap" style="padding-bottom:18px;font-size:12px;color:rgba(255,255,255,.65)">
    &copy; <span id="year"></span> Jirah Hub General Trading. All rights reserved. &middot; Developed by Adrovia Digital
  </div>
</footer>

<div class="toast" id="toast"></div>

<script src="app.js?v=12"></script>
</body>
</html>
'''

if __name__ == "__main__":
    for i, cat in enumerate(CATEGORIES):
        out_path = f"category-{cat['key']}.html"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(page(cat, i))
        print("wrote", out_path)
