const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const PORT = 3000;
const SUPABASE_HOST = 'svrjdipjfplwquljhmrx.supabase.co';
const CLOUDFLARE_IP = '172.64.149.246'; // Direct Cloudflare edge IP bypassing poisoned ISP DNS
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2cmpkaXBqZnBsd3F1bGpobXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NDQ1MzUsImV4cCI6MjEwNzEyMDUzNX0.j_o5mv2ZeRh3zDgKsmbefPlQLtA-57-0z1s-4ZQCLRs';

// Console-only logging (NO disk logging, 100% cloud stored in Supabase DB)
function logConsole(level, category, message, details = null) {
  const ts = new Date().toISOString();
  const detailStr = details ? ` | ${typeof details === 'object' ? JSON.stringify(details) : details}` : '';
  const line = `[${ts}] [${level}] [${category}] ${message}${detailStr}`;
  if (level === 'ERROR') console.error(line);
  else if (level === 'WARN') console.warn(line);
  else console.log(line);
}

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

// In-memory cache for Pantone color library (eliminates repetitive 344KB disk reads)
let pantoneLibraryCache = null;
function getPantoneLibrary() {
  if (!pantoneLibraryCache) {
    const libPath = path.join(__dirname, 'data', 'pantone-library.json');
    if (fs.existsSync(libPath)) {
      try {
        pantoneLibraryCache = JSON.parse(fs.readFileSync(libPath, 'utf8'));
      } catch (e) {
        logConsole('ERROR', 'PANTONE', 'Error reading pantone-library.json: ' + e.message);
      }
    }
  }
  return pantoneLibraryCache;
}

// In-memory cache & Gzip compressor for static assets
const staticCache = new Map();
const COMPRESSIBLE_EXTS = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt', '.xml']);

function getCachedStaticFile(filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return null;
    
    const cached = staticCache.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs) {
      return cached;
    }
    
    const rawBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const isCompressible = COMPRESSIBLE_EXTS.has(ext);
    const gzipBuffer = isCompressible ? zlib.gzipSync(rawBuffer, { level: 6 }) : null;
    const hash = crypto.createHash('md5').update(rawBuffer).digest('hex').slice(0, 16);
    const etag = `"${hash}-${stat.size}"`;
    
    const entry = {
      mtimeMs: stat.mtimeMs,
      rawBuffer,
      gzipBuffer,
      etag,
      contentType: MIME[ext] || 'application/octet-stream',
      isHtml: ext === '.html'
    };
    staticCache.set(filePath, entry);
    return entry;
  } catch (e) {
    return null;
  }
}

const server = http.createServer((req, res) => {
  const startTime = Date.now();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const cat = req.url.startsWith('/supabase-proxy') ? 'DB-GATEWAY' : (req.url.startsWith('/api') ? 'API' : 'HTTP');
    logConsole('INFO', cat, `${req.method} ${req.url} -> ${res.statusCode} (${duration}ms) - IP: ${clientIp}`);
  });

  // 1. Audit Logs API (Proxies directly to Supabase audit_logs table - ZERO local disk files)
  if (req.url.startsWith('/api/logs') && req.method === 'GET') {
    const forwardReq = https.request({
      hostname: CLOUDFLARE_IP,
      servername: SUPABASE_HOST,
      port: 443,
      path: '/rest/v1/audit_logs?order=event_time.desc&limit=100',
      method: 'GET',
      headers: {
        'host': SUPABASE_HOST,
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }, (proxyRes) => {
      let body = '';
      proxyRes.on('data', chunk => { body += chunk; });
      proxyRes.on('end', () => {
        try {
          const list = JSON.parse(body || '[]');
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ ok: true, count: list.length, source: 'supabase.audit_logs', logs: list }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        }
      });
    });
    forwardReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    });
    forwardReq.end();
    return;
  }

  if (req.url === '/api/logs' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const auditRecord = {
          event_type: payload.category || 'CLIENT_EVENT',
          reference_no: payload.details?.poNumber || payload.details?.shipmentId || 'SYS',
          vendor_or_user: payload.user || 'User',
          details: payload.message || 'Audit event',
          metadata: payload.details || {}
        };

        const postReq = https.request({
          hostname: CLOUDFLARE_IP,
          servername: SUPABASE_HOST,
          port: 443,
          path: '/rest/v1/audit_logs',
          method: 'POST',
          headers: {
            'host': SUPABASE_HOST,
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          }
        }, (supaRes) => {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ ok: true, saved_to: 'supabase.audit_logs', status: supaRes.statusCode }));
        });

        postReq.on('error', (err) => {
          res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        });

        postReq.write(JSON.stringify(auditRecord));
        postReq.end();
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // 2. Pantone Color Search & Dynamic Web Lookup API
  if (req.url.startsWith('/api/pantone')) {
    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const q = (parsedUrl.searchParams.get('q') || '').trim();
    if (!q) {
      res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: 'Missing query parameter q' }));
      return;
    }

    const lib = getPantoneLibrary();
    if (lib) {
      const cleanQ = q.replace(/^PANTONE\s*/i, '').replace(/^PMS\s*/i, '').replace(/[^\w\d]/g, '').toUpperCase();
      const hex = lib[cleanQ] || lib[cleanQ + 'C'] || lib[q.toUpperCase()] || lib[cleanQ + 'TCX'];
      if (hex) {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ found: true, code: q, hex: hex, source: 'pantone-library' }));
        return;
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ found: false, code: q, message: 'Pantone code not found' }));
    return;
  }

  // 3. Supabase Cloud API & Storage Gateway
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
      logConsole('ERROR', 'SUPABASE-PROXY', `Gateway connection failure: ${err.message}`);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Supabase Gateway Error', message: err.message }));
    });

    req.pipe(proxyReq);
    return;
  }

  // Handle CORS preflight options for proxy and APIs
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    });
    res.end();
    return;
  }

  // 4. High-Performance Static File Server (In-memory cached, Gzip compressed, ETag enabled)
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.normalize(path.join(__dirname, reqPath));

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  const asset = getCachedStaticFile(filePath);
  if (!asset) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  // Conditional request (ETag validation)
  const clientEtag = req.headers['if-none-match'];
  if (clientEtag && clientEtag === asset.etag) {
    res.writeHead(304, {
      'ETag': asset.etag,
      'Cache-Control': asset.isHtml ? 'no-cache' : 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*'
    });
    res.end();
    return;
  }

  const acceptEncoding = req.headers['accept-encoding'] || '';
  const canGzip = asset.gzipBuffer && acceptEncoding.includes('gzip');
  const bufferToSend = canGzip ? asset.gzipBuffer : asset.rawBuffer;

  const headers = {
    'Content-Type': asset.contentType,
    'Content-Length': bufferToSend.length,
    'ETag': asset.etag,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': asset.isHtml ? 'no-cache' : 'public, max-age=3600, stale-while-revalidate=86400'
  };

  if (canGzip) {
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
  }

  res.writeHead(200, headers);
  res.end(bufferToSend);
});

server.listen(PORT, () => {
  logConsole('INFO', 'SERVER', `LabelTrack Server running with 100% Supabase Cloud DB Storage (Zero Local Data/Logs) at http://localhost:${PORT}`);
});
