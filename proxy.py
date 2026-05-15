#!/usr/bin/env python3
import http.server
import socketserver
import urllib.request
import sys

PORT = 3000
NEXT_PORT = 3001

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.proxy_request()
    
    def do_POST(self):
        self.proxy_request()
    
    def do_HEAD(self):
        self.proxy_request()
    
    def proxy_request(self):
        try:
            url = f"http://127.0.0.1:{NEXT_PORT}{self.path}"
            req = urllib.request.Request(url)
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                body = self.rfile.read(content_length)
                req.data = body
            with urllib.request.urlopen(req, timeout=60) as resp:
                self.send_response(resp.status)
                for key, val in resp.getheaders():
                    if key.lower() not in ('transfer-encoding', 'connection'):
                        self.send_header(key, val)
                self.end_headers()
                self.wfile.write(resp.read())
        except Exception as e:
            self.send_error(502, f"Backend error: {e}")
    
    def log_message(self, format, *args):
        pass

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    with ReusableTCPServer(("0.0.0.0", PORT), ProxyHandler) as httpd:
        print(f"Proxy on :{PORT} -> :{NEXT_PORT}")
        httpd.serve_forever()
