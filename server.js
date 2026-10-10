const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SUPABASE_HOST = 'svrjdipjfplwquljhmrx.supabase.co';
const CLOUDFLARE_IP = '172.64.149.246'; // Direct Cloudflare edge IP bypassing poisoned ISP DNS

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  // 1. Supabase Cloud API & Storage Gateway
  if (req.url.startsWith('/supabase-proxy/')) {
    const targetPath = req.url.replace('/supabase-proxy', '');
    const headers = { ...req.headers };
    delete headers.host;
    headers.host = SUPABASE_HOST;

    const proxyOptions = {
      hostname: CLOUDFLARE_IP,
      servername: SUPABASE_HOST,
      port: 443,
      path: targetPath,
      method: req.method,
      headers: headers
    };

    const proxyReq = https.request(proxyOptions, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, {
        ...proxyRes.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      });
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error('Supabase Proxy Error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Supabase Gateway Error', message: err.message }));
    });

    req.pipe(proxyReq);
    return;
  }

  // Handle CORS preflight options for proxy
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    });
    res.end();
    return;
  }

  // 2. Static File Server
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`LabelTrack Server running with ISP-Resilient Supabase Gateway at http://localhost:${PORT}`);
});
