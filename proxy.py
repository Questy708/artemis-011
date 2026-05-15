#!/usr/bin/env python3
import http.server, socketserver, urllib.request

PORT = 3000
BACKEND = "http://127.0.0.1:3001"

class P(http.server.SimpleHTTPRequestHandler):
    def do_GET(self): self._p()
    def do_POST(self): self._p()
    def do_HEAD(self): self._p()
    def _p(self):
        try:
            cl = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(cl) if cl > 0 else None
            req = urllib.request.Request(BACKEND + self.path, data=body)
            with urllib.request.urlopen(req, timeout=60) as r:
                self.send_response(r.status)
                for k, v in r.getheaders():
                    if k.lower() not in ('transfer-encoding','connection'):
                        self.send_header(k, v)
                self.end_headers()
                self.wfile.write(r.read())
        except Exception as e:
            self.send_error(502, str(e))
    def log_message(self, *a): pass

class S(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    with S(("0.0.0.0", PORT), P) as h:
        print(f"Proxy :{PORT} -> :3001")
        h.serve_forever()
