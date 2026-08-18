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
on breakpoint (see the Lighthouse "responsive images" audit), so a single
flat file can't be right for all of them — templates pair the medium file
with a srcset of all three sizes and a `sizes` estimate of the CSS layout,
letting the browser pick the closest match for its viewport and DPR.

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
MEDIUM = 600
LARGE = 960
QUALITY = 62
ALPHA_QUALITY = 66
METHOD = 6

# The logo doubles as the 40x40 brand mark in the header on every page;
# it gets its own tiny variant instead of the shared -360 one.
EXTRA = {'logo-full.webp': [('logo-64.webp', 64)]}


def encode(im, cap, dest):
    longest = max(im.width, im.height)
    if cap < longest:
        scale = cap / longest
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    im.save(dest, 'WEBP', quality=QUALITY, method=METHOD, alpha_quality=ALPHA_QUALITY)
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
            after += encode(im, extra_cap, os.path.join(OUT, extra_name))
        print(f'  {name}')

    print(f'\n{before / 1024:.0f} KiB source -> {after / 1024:.0f} KiB generated')


if __name__ == '__main__':
    main()
