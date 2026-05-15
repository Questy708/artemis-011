#!/usr/bin/env python3
import subprocess
import time
import http.server
import socketserver
import threading
import urllib.request
import os
import sys

PORT = 3000
NEXT_PORT = 3001

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.proxy_request()
    
    def do_POST(self):
        self.proxy_request()
    
    def proxy_request(self):
        try:
            url = f"http://127.0.0.1:{NEXT_PORT}{self.path}"
            req = urllib.request.Request(url)
            # Read request body for POST
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
            self.send_error(502, f"Backend unavailable: {e}")
    
    def log_message(self, format, *args):
        pass  # Suppress logging

def keep_next_alive():
    while True:
        print(f"[serve.py] Starting Next.js on port {NEXT_PORT}...")
        proc = subprocess.Popen(
            ["node", "node_modules/.bin/next", "dev", "-p", str(NEXT_PORT), "-H", "0.0.0.0"],
            cwd="/home/z/my-project",
            stdout=open("/tmp/next_proxy.log", "a"),
            stderr=subprocess.STDOUT
        )
        proc.wait()
        print(f"[serve.py] Next.js died, restarting in 2s...")
        time.sleep(2)

if __name__ == "__main__":
    # Start Next.js in background thread
    t = threading.Thread(target=keep_next_alive, daemon=True)
    t.start()
    
    # Wait for Next.js to be ready
    print("[serve.py] Waiting for Next.js to start...")
    for i in range(30):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{NEXT_PORT}", timeout=2)
            print("[serve.py] Next.js is ready!")
            break
        except:
            time.sleep(1)
    
    # Start Python proxy on port 3000
    with socketserver.TCPServer(("0.0.0.0", PORT), ProxyHandler) as httpd:
        print(f"[serve.py] Proxy server running on port {PORT}")
        httpd.serve_forever()
