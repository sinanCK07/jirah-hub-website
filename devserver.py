#!/usr/bin/env python3
"""Local preview server that mimics Cloudflare Pages' URL handling.

Production serves this site from Cloudflare Pages, which resolves
extensionless paths to the matching .html file (/products -> products.html)
and 307-redirects the .html form back to the clean one. Internal links,
canonicals and the sitemap all use the clean form, so a plain
`python -m http.server` would 404 on every one of them.

    python devserver.py [port]
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))


class CleanURLHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        local = super().translate_path(path)
        # /products -> products.html, matching Cloudflare Pages.
        if not os.path.exists(local) and not local.endswith(
            (".html", "/", os.sep)
        ):
            candidate = local + ".html"
            if os.path.isfile(candidate):
                return candidate
        return local

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            page = os.path.join(ROOT, "404.html")
            if os.path.isfile(page):
                body = open(page, "rb").read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
        super().send_error(code, message, explain)

    def end_headers(self):
        # Never cache during development.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def handle_one_request(self):
        # The browser routinely drops keep-alive connections mid-response
        # while loading assets in parallel; that surfaces as a
        # ConnectionAbortedError traceback per request and is just noise.
        try:
            super().handle_one_request()
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
            self.close_connection = True


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    print(f"serving {ROOT} on http://localhost:{port} (clean URLs)")
    # Threading: a single-threaded server stalls on parallel asset requests
    # and the browser aborts them mid-flight.
    ThreadingHTTPServer(("", port), CleanURLHandler).serve_forever()
