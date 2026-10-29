const https = require('https');

const SUPABASE_HOST = 'svrjdipjfplwquljhmrx.supabase.co';
const CLOUDFLARE_IP = '172.64.149.246';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2cmpkaXBqZnBsd3F1bGpobXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NDQ1MzUsImV4cCI6MjEwNzEyMDUzNX0.j_o5mv2ZeRh3zDgKsmbefPlQLtA-57-0z1s-4ZQCLRs';

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
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
    }, proxyRes => {
      let b = '';
      proxyRes.on('data', c => b += c);
      proxyRes.on('end', () => {
        try {
          const list = JSON.parse(b || '[]');
          res.status(200).json({ ok: true, count: list.length, source: 'supabase.audit_logs', logs: list });
        } catch (e) {
          res.status(500).json({ ok: false, error: e.message });
        }
      });
    });
    forwardReq.on('error', err => res.status(502).json({ ok: false, error: err.message }));
    forwardReq.end();
    return;
  }

  if (req.method === 'POST') {
    let rawBody = req.body;
    let payload = {};
    if (typeof rawBody === 'string') {
      try { payload = JSON.parse(rawBody || '{}'); } catch(e) {}
    } else if (rawBody && typeof rawBody === 'object') {
      payload = rawBody;
    }

    const record = {
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
    }, supaRes => {
      res.status(200).json({ ok: true, saved_to: 'supabase.audit_logs', status: supaRes.statusCode });
    });
    postReq.on('error', err => res.status(502).json({ ok: false, error: err.message }));
    postReq.write(JSON.stringify(record));
    postReq.end();
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
