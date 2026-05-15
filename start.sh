#!/bin/bash
cd /home/z/my-project
kill $(lsof -t -i:3000 2>/dev/null) 2>/dev/null
sleep 1
exec node .next/standalone/server.js -p 3000
