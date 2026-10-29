const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const q = (req.query?.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing query parameter q' });

  try {
    const libPath = path.join(process.cwd(), 'data', 'pantone-library.json');
    if (fs.existsSync(libPath)) {
      const lib = JSON.parse(fs.readFileSync(libPath, 'utf8'));
      const cleanQ = q.replace(/^PANTONE\s*/i, '').replace(/^PMS\s*/i, '').replace(/[^\w\d]/g, '').toUpperCase();
      const hex = lib[cleanQ] || lib[cleanQ + 'C'] || lib[q.toUpperCase()] || lib[cleanQ + 'TCX'];
      if (hex) {
        return res.status(200).json({ found: true, code: q, hex: hex, source: 'pantone-library' });
      }
    }
  } catch (e) {}

  return res.status(200).json({ found: false, code: q, message: 'Pantone code not found' });
};
