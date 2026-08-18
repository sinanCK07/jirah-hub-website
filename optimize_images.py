#!/usr/bin/env python3
"""Rebuild the responsive .webp set in assets/ from the originals in assets-src/.

For every source image we emit three sizes, capped on the longest edge so tall
and wide shots both come out to a comparable pixel budget:

    assets/<name>-360.webp   small  — product cards, thumbnails
    assets/<name>.webp       medium — default src for hero / category hero /
                                       circle & about photos (plain filename,
                                       so every existing reference stays valid)
    assets/<name>-960.webp   large  — retina/desktop srcset descriptor for
                                       the same hero-class images

Real display widths for the hero-class photos run ~230-650 CSS px depending
on breakpoint (measured directly off Lighthouse's "responsive images" audit
across several runs), clustering around 320px on mobile and 450-530px on
everything from tablet up to the ~1240px container max. MEDIUM is set to
480 to sit right in that cluster — templates pair it with a srcset of all
three sizes and a `sizes` estimate of the CSS layout, letting the browser
pick the closest match for its viewport and DPR instead of always
downloading whichever tier happens to be the default.

Product shots are cut-outs on transparent backgrounds, so the alpha channel has
to survive. `alpha_quality` below 100 is where most of the byte saving comes
from — WebP stores alpha losslessly at 100.

Run from the site/ directory:  python optimize_images.py
"""
import os
import sys
from PIL import Image

SRC = 'assets-src'
OUT = 'assets'

SMALL = 360
MEDIUM = 480
LARGE = 960
QUALITY = 58
ALPHA_QUALITY = 58
METHOD = 6

# The logo doubles as the 40x40 brand mark in the header on every page, so it
# gets its own tiny variants instead of the shared -360 one. A 40px box is 80
# physical pixels on a 2x phone and 120 on a 3x one, and a single 64px file
# was being upscaled on both — hence a small density set.
#
# These encode far above the shared QUALITY too. 58 is tuned for photographs;
# on a logo this small it smears the fine type and fringes the outlines, and
# the whole set still costs only a few KB.
EXTRA = {'logo-full.webp': [('logo-64.webp', 64), ('logo-80.webp', 80), ('logo-120.webp', 120)]}
EXTRA_QUALITY = 92
EXTRA_ALPHA_QUALITY = 100


def encode(im, cap, dest, quality=None, alpha_quality=None):
    longest = max(im.width, im.height)
    if cap < longest:
        scale = cap / longest
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    im.save(
        dest, 'WEBP', method=METHOD,
        quality=QUALITY if quality is None else quality,
        alpha_quality=ALPHA_QUALITY if alpha_quality is None else alpha_quality,
    )
    return os.path.getsize(dest)


def main():
    if not os.path.isdir(SRC):
        sys.exit(f'missing {SRC}/ — the original images live there')
    before = after = 0
    for name in sorted(os.listdir(SRC)):
        if not name.endswith('.webp'):
            continue
        src = os.path.join(SRC, name)
        im = Image.open(src).convert('RGBA')
        before += os.path.getsize(src)

        after += encode(im, SMALL, os.path.join(OUT, name[:-5] + '-360.webp'))
        after += encode(im, MEDIUM, os.path.join(OUT, name))
        after += encode(im, LARGE, os.path.join(OUT, name[:-5] + '-960.webp'))
        for extra_name, extra_cap in EXTRA.get(name, []):
            after += encode(im, extra_cap, os.path.join(OUT, extra_name),
                            EXTRA_QUALITY, EXTRA_ALPHA_QUALITY)
        print(f'  {name}')

    print(f'\n{before / 1024:.0f} KiB source -> {after / 1024:.0f} KiB generated')


if __name__ == '__main__':
    main()
