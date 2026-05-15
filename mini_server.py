#!/usr/bin/env python3
import http.server
import socketserver
import subprocess
import threading
import time
import os
import signal

PORT = 3000

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Proxy to Next.js
        try:
            import urllib.request
            url = f"http://127.0.0.1:3001{self.path}"
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=30) as resp:
                self.send_response(resp.status)
                for key, val in resp.getheaders():
                    if key.lower() not in ('transfer-encoding', 'connection'):
                        self.send_header(key, val)
                self.end_headers()
                self.wfile.write(resp.read())
        except Exception as e:
            self.send_error(502, f"Backend error: {e}")

def keep_next_alive():
    """Keep restarting the Next.js dev server"""
    while True:
        proc = subprocess.Popen(
            ["npx", "next", "dev", "-p", "3001", "-H", "0.0.0.0"],
            cwd="/home/z/my-project",
            stdout=open("/tmp/next_3001.log", "a"),
            stderr=subprocess.STDOUT
        )
        proc.wait()
        time.sleep(2)

if __name__ == "__main__":
    # Start Next.js on port 3001 in background
    t = threading.Thread(target=keep_next_alive, daemon=True)
    t.start()
    
    # Wait for Next.js to be ready
    time.sleep(8)
    
    # Start Python proxy on port 3000
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHandler) as httpd:
        print(f"Proxy server running on port {PORT}")
        httpd.serve_forever()
