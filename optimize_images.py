#!/usr/bin/env python3
"""Rebuild the responsive .webp set in assets/ from the originals in assets-src/.

For every source image we emit two sizes, capped on the longest edge so tall
and wide shots both come out to a comparable pixel budget:

    assets/<name>-360.webp   small — product cards, thumbnails
    assets/<name>.webp       large — hero, category hero, about photo

The large file keeps the plain name so every existing reference in the HTML
and in app.js stays valid; templates add a srcset pointing at the -360 file.

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

LARGE = 720
SMALL = 360
QUALITY = 72
ALPHA_QUALITY = 80
METHOD = 5

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

        after += encode(im, LARGE, os.path.join(OUT, name))
        after += encode(im, SMALL, os.path.join(OUT, name[:-5] + '-360.webp'))
        for extra_name, extra_cap in EXTRA.get(name, []):
            after += encode(im, extra_cap, os.path.join(OUT, extra_name))
        print(f'  {name}')

    print(f'\n{before / 1024:.0f} KiB source -> {after / 1024:.0f} KiB generated')


if __name__ == '__main__':
    main()
