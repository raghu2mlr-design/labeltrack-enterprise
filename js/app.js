// ==========================================
// LabelTrack Application Core Business Logic
// ==========================================

const DEFAULT_VENDORS = [
  { id: "v-1", name: "Apex Print Ltd", email: "dispatch@apexprint.com", code: "VEN-01" },
  { id: "v-2", name: "Royal Roll Printers", email: "dispatch@royalprinters.com", code: "VEN-02" },
  { id: "v-3", name: "pavan", email: "ch.saipavan@rsbrothers.net", code: "VEN-03" },
  { id: "v-4", name: "Sri Vigeneswara Labels", email: "svl@gmail.com", code: "SVL" }
];

// ==========================================
// Product Categories & Subdivided Models
// 1. Labels | 2. Tags | 3. Ribbons | 4. Cards
// ==========================================
const PRODUCT_CATEGORIES = {
  labels: {
    id: "labels",
    name: "Labels",
    icon: "🏷️",
    prefix: "LBL",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    models: [
      "Regular Label — 50x32 mm (Chromo | 3\" Core | 2 UPS | 5,000/roll)",
      "Regular Label — 50x32 mm (Chromo | 1\" Core | 2 UPS | 2,500/roll)",
      "D-Royal Label — 38x50 mm (Chromo | 3\" Core | 2 UPS | 2,500/roll)",
      "Value Zone Label — 50x50 mm (Chromo | 3\" Core | 2 UPS | 2,500/roll)",
      "Yellow Label (Gate Entry) — 100x150 mm (Chromo | 3\" Core | 1 UPS | 500/roll)",
      "Orange Label (DC Label) — 100x150 mm (Chromo | 1\" Core | 1 UPS | 250/roll)",
      "Grocery Label — 50x30 mm (DT Direct Thermal | 1\" Core | 1 UPS | 1,000/roll)",
      "PI Label — 40x25 mm (Chromo | 1\" Core | 1 UPS | 1,000/roll)",
      "Custom Label Specification"
    ]
  },
  tags: {
    id: "tags",
    name: "Tags",
    icon: "🔖",
    prefix: "TAG",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    models: [
      "Regular Tag — 50x101 mm (Synthetic | 3\" Core | 1 UPS | 1,000/roll)",
      "Value Zone Tag — 50x101 mm (Synthetic | 3\" Core | 1 UPS | 1,000/roll)",
      "Custom Tag Specification"
    ]
  },
  cards: {
    id: "cards",
    name: "Cards",
    icon: "💳",
    prefix: "CRD",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    models: [
      "Regular Card — 50x76 mm (Synthetic | 3\" Core | 2 UPS | 2,500/roll)",
      "Value Zone Card — 75x130 mm (Board | 3\" Core | 1 UPS | 1,000/roll)",
      "Custom Card Specification"
    ]
  },
  ribbons: {
    id: "ribbons",
    name: "Ribbons",
    icon: "🎗️",
    prefix: "RIB",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    models: [
      "Wax Ribbon (110mm x 300m | 1\" Core — for Chromo Paper Labels)",
      "Wax-Resin Ribbon (110mm x 300m | 1\" Core — Smudge-Proof for Semi-Gloss & Board)",
      "Full Resin Ribbon (110mm x 300m | 1\" Core — Scratch & Wash Proof for Synthetic)",
      "Custom Ribbon Specification"
    ]
  }
};

const MODEL_SPECS_MAP = {
  "Regular Label — 50x32 mm (Chromo | 3\" Core | 2 UPS | 5,000/roll)": "50x32mm | CHROMO | 3\" Core | 2 UPS | 5,000/roll",
  "Regular Label — 50x32 mm (Chromo | 1\" Core | 2 UPS | 2,500/roll)": "50x32mm | CHROMO | 1\" Core | 2 UPS | 2,500/roll",
  "D-Royal Label — 38x50 mm (Chromo | 3\" Core | 2 UPS | 2,500/roll)": "38x50mm | CHROMO | 3\" Core | 2 UPS | 2,500/roll",
  "Value Zone Label — 50x50 mm (Chromo | 3\" Core | 2 UPS | 2,500/roll)": "50x50mm | CHROMO | 3\" Core | 2 UPS | 2,500/roll",
  "Yellow Label (Gate Entry) — 100x150 mm (Chromo | 3\" Core | 1 UPS | 500/roll)": "100x150mm | CHROMO | 3\" Core | 1 UPS | 500/roll",
  "Orange Label (DC Label) — 100x150 mm (Chromo | 1\" Core | 1 UPS | 250/roll)": "100x150mm | CHROMO | 1\" Core | 1 UPS | 250/roll",
  "Grocery Label — 50x30 mm (DT Direct Thermal | 1\" Core | 1 UPS | 1,000/roll)": "50x30mm | DT LABELS | 1\" Core | 1 UPS | 1,000/roll",
  "PI Label — 40x25 mm (Chromo | 1\" Core | 1 UPS | 1,000/roll)": "40x25mm | CHROMO | 1\" Core | 1 UPS | 1,000/roll",
  "Regular Tag — 50x101 mm (Synthetic | 3\" Core | 1 UPS | 1,000/roll)": "50x101mm | SYNTHETIC | 3\" Core | 1 UPS | 1,000/roll",
  "Value Zone Tag — 50x101 mm (Synthetic | 3\" Core | 1 UPS | 1,000/roll)": "50x101mm | SYNTHETIC | 3\" Core | 1 UPS | 1,000/roll",
  "Regular Card — 50x76 mm (Synthetic | 3\" Core | 2 UPS | 2,500/roll)": "50x76mm | SYNTHETIC | 3\" Core | 2 UPS | 2,500/roll",
  "Value Zone Card — 75x130 mm (Board | 3\" Core | 1 UPS | 1,000/roll)": "75x130mm | BOARD | 3\" Core | 1 UPS | 1,000/roll",
  "Wax Ribbon (110mm x 300m | 1\" Core — for Chromo Paper Labels)": "110mm x 300m | WAX | 1\" Core (Chromo Labels)",
  "Wax-Resin Ribbon (110mm x 300m | 1\" Core — Smudge-Proof for Semi-Gloss & Board)": "110mm x 300m | WAX-RESIN | 1\" Core (Board & Gloss)",
  "Full Resin Ribbon (110mm x 300m | 1\" Core — Scratch & Wash Proof for Synthetic)": "110mm x 300m | FULL RESIN | 1\" Core (Synthetic Tags & Cards)"
};

// ==========================================
// Annual Master Color Codes & Physical Proofs Configuration
// Mandated color standards change annually (e.g. 2025: Emerald Green, 2026: Cyan/Yellow, 2027: Violet/Tangerine)
// ==========================================
const DEFAULT_ANNUAL_COLOR_CONFIG = {
  activeYear: 2026,
  years: [
    {
      year: 2025,
      colorName: "Emerald Green & White",
      hexColor: "#059669",
      secondaryHex: "#ecfdf5",
      status: "archived",
      guidelines: "2025 Mandate: Emerald green core ring band, green ink lot stamp."
    },
    {
      year: 2026,
      colorName: "Sapphire Cyan & Canary Yellow",
      hexColor: "#0284c7",
      secondaryHex: "#facc15",
      status: "active",
      guidelines: "2026 Active Mandate: Canary yellow roll core band, sapphire cyan approval stamp on outer cartons."
    },
    {
      year: 2027,
      colorName: "Royal Violet & Tangerine",
      hexColor: "#7c3aed",
      secondaryHex: "#fb923c",
      status: "upcoming",
      guidelines: "2027 Advance Release: Tangerine core insert with royal violet inspection mark."
    }
  ]
};

function normalizeModelKey(modelStr) {
  if (!modelStr) return 'standard_model';
  return String(modelStr)
    .toLowerCase()
    .replace(/[^\w\d]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function getProofKey(modelStr, year) {
  const norm = normalizeModelKey(modelStr);
  const y = Number(year) || getActiveYear();
  return `${norm}_${y}`;
}

function getActiveYear() {
  if (typeof state !== 'undefined' && state.annualColorConfig && state.annualColorConfig.activeYear) {
    return Number(state.annualColorConfig.activeYear);
  }
  return 2026;
}

function getYearColorConfig(year) {
  const targetYear = Number(year) || getActiveYear();
  const yearsList = (typeof state !== 'undefined' && state.annualColorConfig && Array.isArray(state.annualColorConfig.years))
    ? state.annualColorConfig.years
    : DEFAULT_ANNUAL_COLOR_CONFIG.years;

  const found = yearsList.find(y => Number(y.year) === targetYear);
  if (found) return found;

  return {
    year: targetYear,
    colorName: "Standard Cyan & White",
    hexColor: "#0284c7",
    secondaryHex: "#facc15",
    status: (targetYear === getActiveYear() ? "active" : "upcoming"),
    guidelines: `Annual color mandate for FY ${targetYear}. Suppliers must follow this color scheme.`
  };
}

function updateAnnualColorUI() {
  const activeYear = getActiveYear();
  const yearConfig = getYearColorConfig(activeYear);

  const dot = document.getElementById('adminActiveYearColorDot');
  if (dot) dot.style.backgroundColor = yearConfig.hexColor;

  const badgeText = document.getElementById('adminActiveYearColorBadgeText');
  if (badgeText) badgeText.textContent = `🎨 Annual Color Proofs (${activeYear})`;

  const activePill = document.getElementById('annualActiveYearPill');
  if (activePill) {
    activePill.textContent = activeYear;
    activePill.style.backgroundColor = yearConfig.hexColor;
  }
}

function getItemCategoryInfo(itemOrDescription) {
  if (!itemOrDescription) return PRODUCT_CATEGORIES.labels;
  
  if (typeof itemOrDescription === 'object') {
    if (itemOrDescription.category && PRODUCT_CATEGORIES[itemOrDescription.category.toLowerCase()]) {
      return PRODUCT_CATEGORIES[itemOrDescription.category.toLowerCase()];
    }
  }

  const str = (typeof itemOrDescription === 'string'
    ? itemOrDescription
    : `${itemOrDescription.category || ''} ${itemOrDescription.model || ''} ${itemOrDescription.sku || ''} ${itemOrDescription.description || ''}`).toLowerCase();

  if (str.includes('ribbon') || str.includes('wax') || str.includes('resin') || str.startsWith('rib')) {
    return PRODUCT_CATEGORIES.ribbons;
  }
  if (str.includes('tag') || str.includes('hang') || str.includes('inlay') || str.startsWith('tag')) {
    return PRODUCT_CATEGORIES.tags;
  }
  if (str.includes('card') || str.includes('pvc') || str.includes('cr80') || str.startsWith('crd')) {
    return PRODUCT_CATEGORIES.cards;
  }
  return PRODUCT_CATEGORIES.labels;
}

function formatProductDisplay(description) {
  if (!description) return { title: 'Item', specs: '', shortTitle: 'Item' };
  
  let raw = String(description).trim();

  // Extract all parenthesized specification groups (e.g. "(Chromo | 3\" Core | 2 UPS | 5,000/roll) (50x32mm | CHROMO | ...)")
  const parenGroups = [];
  const parenRegex = /\(([^()]+)\)/g;
  let match;
  while ((match = parenRegex.exec(raw)) !== null) {
    const val = match[1].trim();
    if (val && !parenGroups.includes(val)) {
      parenGroups.push(val);
    }
  }

  // Strip all parenthesized groups from raw text to isolate the clean product title
  let title = raw.replace(/\(([^()]+)\)/g, '').replace(/\s+/g, ' ').trim();
  title = title.replace(/[-—:]\s*$/, '').trim();
  if (!title && parenGroups.length > 0) {
    title = parenGroups.shift();
  }

  let specs = '';
  if (parenGroups.length === 1) {
    specs = parenGroups[0];
  } else if (parenGroups.length > 1) {
    // If multiple parenthesized groups exist, check if they are redundant / duplicate specs
    // e.g. Group 1: 'Chromo | 3" Core | 2 UPS | 5,000/roll'
    // e.g. Group 2: '50x32mm | CHROMO | 3" Core | 2 UPS | 5,000/roll'
    const g1 = parenGroups[0];
    const g2 = parenGroups[1];
    
    const tokens1 = g1.toLowerCase().split(/[|\s,]+/).filter(Boolean);
    const tokens2 = g2.toLowerCase().split(/[|\s,]+/).filter(Boolean);
    const commonTokens = tokens1.filter(t => tokens2.includes(t));

    // If they share 2 or more spec tokens (e.g., chromo, core, ups, roll), deduplicate to the most complete spec
    if (commonTokens.length >= 2 || g1.toLowerCase() === g2.toLowerCase()) {
      specs = g2.length >= g1.length ? g2 : g1;
    } else {
      // Distinct specifications: merge them cleanly
      specs = parenGroups.join(' | ');
    }
  } else {
    // Fallback: check for colon separation if no parentheses exist
    const colonMatch = raw.match(/^(.*?)\s*:\s*(.*)$/);
    if (colonMatch) {
      title = colonMatch[1].trim();
      specs = colonMatch[2].trim();
    }
  }

  // Ensure specs contain no stray or duplicate unclosed parentheses
  specs = specs.replace(/[()]/g, '').trim();

  return { title: title || raw, specs, shortTitle: title || raw };
}

// ==========================================
// TECHNICAL ARTWORK SPECIMEN & PROOF SYSTEM
// Universal Vector SVG Renderers for All 4 Categories
// ==========================================
function generateSampleArtworkSvg(modelName, customSpecs) {
  const model = String(modelName || '').trim();
  const specs = customSpecs || MODEL_SPECS_MAP[model] || '';
  
  // 1. Regular Label 50x32 (3" or 1" Core | 2 UPS)
  if (model.includes('50x32')) {
    const is3Core = model.includes('3"');
    const coreText = is3Core ? '3" Core (76.2mm)' : '1" Core (25.4mm)';
    const rollCapacity = is3Core ? '5,000 labels/roll' : '2,500 labels/roll';
    return `
      <svg viewBox="0 0 460 260" class="w-full max-w-md mx-auto drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="50%" stop-color="#e2e8f0"/>
            <stop offset="100%" stop-color="#f8fafc"/>
          </linearGradient>
          <filter id="labelShadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.12"/>
          </filter>
        </defs>
        <rect x="20" y="20" width="420" height="220" rx="10" fill="url(#webGrad)" stroke="#cbd5e1" stroke-width="1.5"/>
        <line x1="20" y1="20" x2="440" y2="20" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1"/>
        <line x1="20" y1="240" x2="440" y2="240" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1"/>
        
        <!-- Left Label (UPS 1) -->
        <g filter="url(#labelShadow)">
          <rect x="35" y="45" width="185" height="150" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
          <text x="45" y="65" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#0f172a">LABELTRACK &bull; CHROMO</text>
          <text x="175" y="65" font-family="monospace" font-size="8" font-weight="bold" fill="#2563eb">50x32</text>
          <line x1="45" y1="70" x2="210" y2="70" stroke="#e2e8f0" stroke-width="1"/>
          <g transform="translate(45, 76)">
            <rect x="0" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="5" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="9" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="17" y="0" width="1" height="35" fill="#0f172a"/>
            <rect x="21" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="28" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="32" y="0" width="6" height="35" fill="#0f172a"/>
            <rect x="42" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="47" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="52" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="60" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="65" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="72" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="76" y="0" width="6" height="35" fill="#0f172a"/>
            <rect x="85" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="91" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="96" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="103" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="107" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="115" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="120" y="0" width="1" height="35" fill="#0f172a"/>
            <rect x="124" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="131" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="137" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="145" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="150" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="157" y="0" width="3" height="35" fill="#0f172a"/>
          </g>
          <text x="127" y="121" font-family="monospace" font-size="8" font-weight="bold" fill="#334155" text-anchor="middle">8 904321 005432</text>
          <text x="45" y="137" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">STYLE: <tspan font-weight="bold" fill="#0f172a">TS-REG-01</tspan> &bull; SZ: <tspan font-weight="bold" fill="#0f172a">L</tspan></text>
          <text x="45" y="152" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">MRP: <tspan font-weight="bold" fill="#047857">₹ 799.00</tspan> (INCL. TAX)</text>
          <rect x="45" y="162" width="60" height="15" rx="3" fill="#eff6ff" stroke="#bfdbfe" stroke-width="0.5"/>
          <text x="75" y="173" font-family="system-ui, sans-serif" font-size="7" font-weight="bold" fill="#1d4ed8" text-anchor="middle">UPS 1 (LEFT)</text>
          <text x="175" y="173" font-family="monospace" font-size="7" fill="#94a3b8">GAP: 3mm</text>
        </g>

        <!-- Right Label (UPS 2) -->
        <g filter="url(#labelShadow)">
          <rect x="240" y="45" width="185" height="150" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
          <text x="250" y="65" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#0f172a">LABELTRACK &bull; CHROMO</text>
          <text x="380" y="65" font-family="monospace" font-size="8" font-weight="bold" fill="#2563eb">50x32</text>
          <line x1="250" y1="70" x2="415" y2="70" stroke="#e2e8f0" stroke-width="1"/>
          <g transform="translate(250, 76)">
            <rect x="0" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="5" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="9" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="17" y="0" width="1" height="35" fill="#0f172a"/>
            <rect x="21" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="28" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="32" y="0" width="6" height="35" fill="#0f172a"/>
            <rect x="42" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="47" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="52" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="60" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="65" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="72" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="76" y="0" width="6" height="35" fill="#0f172a"/>
            <rect x="85" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="91" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="96" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="103" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="107" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="115" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="120" y="0" width="1" height="35" fill="#0f172a"/>
            <rect x="124" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="131" y="0" width="3" height="35" fill="#0f172a"/>
            <rect x="137" y="0" width="5" height="35" fill="#0f172a"/>
            <rect x="145" y="0" width="2" height="35" fill="#0f172a"/>
            <rect x="150" y="0" width="4" height="35" fill="#0f172a"/>
            <rect x="157" y="0" width="3" height="35" fill="#0f172a"/>
          </g>
          <text x="332" y="121" font-family="monospace" font-size="8" font-weight="bold" fill="#334155" text-anchor="middle">8 904321 005433</text>
          <text x="250" y="137" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">STYLE: <tspan font-weight="bold" fill="#0f172a">TS-REG-01</tspan> &bull; SZ: <tspan font-weight="bold" fill="#0f172a">XL</tspan></text>
          <text x="250" y="152" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">MRP: <tspan font-weight="bold" fill="#047857">₹ 799.00</tspan> (INCL. TAX)</text>
          <rect x="250" y="162" width="65" height="15" rx="3" fill="#eff6ff" stroke="#bfdbfe" stroke-width="0.5"/>
          <text x="282" y="173" font-family="system-ui, sans-serif" font-size="7" font-weight="bold" fill="#1d4ed8" text-anchor="middle">UPS 2 (RIGHT)</text>
          <text x="380" y="173" font-family="monospace" font-size="7" fill="#94a3b8">GAP: 3mm</text>
        </g>

        <!-- Unwind & Technical Footer Callout -->
        <g transform="translate(35, 210)">
          <rect x="0" y="0" width="390" height="20" rx="5" fill="#0f172a" fill-opacity="0.9"/>
          <text x="15" y="13" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold" fill="#38bdf8">2 UPS (2 ACROSS)</text>
          <text x="120" y="13" font-family="monospace" font-size="8" fill="#e2e8f0">&bull; CORE: ${coreText}</text>
          <text x="240" y="13" font-family="monospace" font-size="8" fill="#a7f3d0">&bull; ${rollCapacity}</text>
          <text x="345" y="13" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#fde047">➔ UNWIND</text>
        </g>
      </svg>
    `;
  }

  // 2. Yellow Gate Entry Label 100x150 mm
  if (model.includes('Yellow Label') || model.includes('Gate Entry')) {
    return `
      <svg viewBox="0 0 320 380" class="w-full max-w-xs mx-auto drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="yellowLabelShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.15"/>
          </filter>
        </defs>
        <g filter="url(#yellowLabelShadow)">
          <rect x="15" y="15" width="290" height="350" rx="8" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <rect x="25" y="25" width="270" height="42" rx="5" fill="#ca8a04"/>
          <text x="160" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">WAREHOUSE GATE INWARD PASS</text>
          <text x="160" y="58" font-family="monospace" font-size="8" font-weight="bold" fill="#fef9c3" text-anchor="middle">PRIMARY SECURITY INWARD GATE &bull; 100x150mm</text>

          <g transform="translate(25, 78)">
            <rect x="0" y="0" width="270" height="60" rx="5" fill="#ffffff" stroke="#eab308" stroke-width="1"/>
            <text x="10" y="16" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#713f12">TRUCK / LR NUMBER:</text>
            <text x="10" y="32" font-family="monospace" font-size="12" font-weight="900" fill="#0f172a">TS-09-UB-4421</text>
            <text x="150" y="16" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#713f12">BOX COUNT:</text>
            <text x="150" y="32" font-family="monospace" font-size="12" font-weight="900" fill="#0f172a">25 CARTONS</text>
            <text x="10" y="50" font-family="system-ui, sans-serif" font-size="7.5" fill="#854d0e">VENDOR: <tspan font-weight="bold" fill="#0f172a">APEX PRINT LTD (VEN-01)</tspan></text>
            <text x="150" y="50" font-family="system-ui, sans-serif" font-size="7.5" fill="#854d0e">DATE: <tspan font-weight="bold" fill="#0f172a">2026-10-23</tspan></text>
          </g>

          <g transform="translate(30, 150)">
            <rect x="0" y="0" width="260" height="85" rx="5" fill="#ffffff" stroke="#eab308" stroke-width="1"/>
            <g transform="translate(15, 12)">
              <rect x="0" y="0" width="4" height="45" fill="#0f172a"/>
              <rect x="6" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="11" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="20" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="26" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="35" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="40" y="0" width="7" height="45" fill="#0f172a"/>
              <rect x="51" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="58" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="67" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="72" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="82" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="88" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="98" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="103" y="0" width="4" height="45" fill="#0f172a"/>
              <rect x="111" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="121" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="127" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="136" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="142" y="0" width="7" height="45" fill="#0f172a"/>
              <rect x="153" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="160" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="169" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="175" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="185" y="0" width="4" height="45" fill="#0f172a"/>
              <rect x="193" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="202" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="209" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="219" y="0" width="4" height="45" fill="#0f172a"/>
            </g>
            <text x="130" y="72" font-family="monospace" font-size="10" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="1">GATE-IN-2026-904321</text>
          </g>

          <g transform="translate(25, 245)">
            <rect x="0" y="0" width="270" height="58" rx="5" fill="#ffffff" stroke="#eab308" stroke-width="1"/>
            <text x="10" y="17" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#713f12">SECURITY OFFICER SIGNATURE:</text>
            <line x1="10" y1="42" x2="160" y2="42" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="10" y="52" font-family="system-ui, sans-serif" font-size="7" fill="#94a3b8">Authorized Gate Officer</text>
            <g transform="translate(180, 8)">
              <circle cx="20" cy="20" r="18" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
              <text x="20" y="18" font-family="system-ui, sans-serif" font-size="6.5" font-weight="900" fill="#15803d" text-anchor="middle">VERIFIED</text>
              <text x="20" y="27" font-family="system-ui, sans-serif" font-size="6.5" font-weight="bold" fill="#15803d" text-anchor="middle">GATE PASS</text>
            </g>
          </g>

          <rect x="25" y="315" width="270" height="22" rx="4" fill="#0f172a"/>
          <text x="160" y="330" font-family="monospace" font-size="8" font-weight="bold" fill="#fde047" text-anchor="middle">1 UPS &bull; 3" CORE (76.2mm) &bull; 500 LABELS/ROLL</text>
        </g>
      </svg>
    `;
  }

  // 3. Orange DC Label 100x150 mm
  if (model.includes('Orange Label') || model.includes('DC Label')) {
    return `
      <svg viewBox="0 0 320 380" class="w-full max-w-xs mx-auto drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="orangeLabelShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.15"/>
          </filter>
        </defs>
        <g filter="url(#orangeLabelShadow)">
          <rect x="15" y="15" width="290" height="350" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
          <rect x="25" y="25" width="270" height="42" rx="5" fill="#ea580c"/>
          <text x="160" y="44" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">DISTRIBUTION CENTER TRANSFER</text>
          <text x="160" y="58" font-family="monospace" font-size="8" font-weight="bold" fill="#fed7aa" text-anchor="middle">CENTRAL DC ROUTING &bull; 100x150mm</text>

          <g transform="translate(25, 78)">
            <rect x="0" y="0" width="270" height="60" rx="5" fill="#ffffff" stroke="#fdba74" stroke-width="1"/>
            <text x="10" y="16" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#9a3412">DESTINATION HUB:</text>
            <text x="10" y="34" font-family="monospace" font-size="13" font-weight="900" fill="#ea580c">HYD-CENTRAL-DC-01</text>
            <text x="165" y="16" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#9a3412">ZONE / AISLE:</text>
            <text x="165" y="34" font-family="monospace" font-size="13" font-weight="900" fill="#0f172a">ZN-B3</text>
            <text x="10" y="51" font-family="system-ui, sans-serif" font-size="7.5" fill="#7c2d12">PACKAGE WEIGHT: <tspan font-weight="bold" fill="#0f172a">18.5 KG</tspan></text>
            <text x="165" y="51" font-family="system-ui, sans-serif" font-size="7.5" fill="#7c2d12">PRIORITY: <tspan font-weight="bold" fill="#b91c1c">EXPRESS</tspan></text>
          </g>

          <g transform="translate(30, 150)">
            <rect x="0" y="0" width="260" height="85" rx="5" fill="#ffffff" stroke="#fdba74" stroke-width="1"/>
            <g transform="translate(15, 12)">
              <rect x="0" y="0" width="4" height="45" fill="#0f172a"/>
              <rect x="6" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="11" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="20" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="26" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="35" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="40" y="0" width="7" height="45" fill="#0f172a"/>
              <rect x="51" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="58" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="67" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="72" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="82" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="88" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="98" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="103" y="0" width="4" height="45" fill="#0f172a"/>
              <rect x="111" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="121" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="127" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="136" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="142" y="0" width="7" height="45" fill="#0f172a"/>
              <rect x="153" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="160" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="169" y="0" width="2" height="45" fill="#0f172a"/>
              <rect x="175" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="185" y="0" width="4" height="45" fill="#0f172a"/>
              <rect x="193" y="0" width="5" height="45" fill="#0f172a"/>
              <rect x="202" y="0" width="3" height="45" fill="#0f172a"/>
              <rect x="209" y="0" width="6" height="45" fill="#0f172a"/>
              <rect x="219" y="0" width="4" height="45" fill="#0f172a"/>
            </g>
            <text x="130" y="72" font-family="monospace" font-size="10" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="1">DC-TRK-2026-789012</text>
          </g>

          <rect x="25" y="248" width="270" height="55" rx="5" fill="#ffffff" stroke="#fdba74" stroke-width="1"/>
          <text x="35" y="268" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#9a3412">HANDLING INSTRUCTIONS:</text>
          <text x="35" y="282" font-family="system-ui, sans-serif" font-size="7.5" fill="#475569">&bull; Keep Dry &bull; Do Not Drop &bull; Scan on Forklift Inward</text>
          <text x="35" y="294" font-family="system-ui, sans-serif" font-size="7" fill="#94a3b8">Chromo with Hi-Tack Adhesive &bull; Suitable for corrugated boxes</text>

          <rect x="25" y="315" width="270" height="22" rx="4" fill="#0f172a"/>
          <text x="160" y="330" font-family="monospace" font-size="8" font-weight="bold" fill="#fdba74" text-anchor="middle">1 UPS &bull; 1" CORE (25.4mm) &bull; 250 LABELS/ROLL</text>
        </g>
      </svg>
    `;
  }

  // 4. Tags (Regular Tag / Value Zone Tag 50x101 mm)
  if (model.includes('Tag') || model.includes('50x101')) {
    const isVz = model.includes('Value Zone');
    return `
      <svg viewBox="0 0 240 380" class="w-full max-w-xs mx-auto drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="tagShadow" x="-10%" y="-5%" width="120%" height="110%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.15"/>
          </filter>
        </defs>
        <g filter="url(#tagShadow)">
          <path d="M 40 45 L 80 15 L 160 15 L 200 45 L 200 350 L 40 350 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
          <circle cx="120" cy="38" r="9" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
          <circle cx="120" cy="38" r="5" fill="#e2e8f0"/>

          <rect x="50" y="65" width="140" height="28" rx="4" fill="${isVz ? '#b91c1c' : '#0f172a'}"/>
          <text x="120" y="83" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
            ${isVz ? 'VALUE ZONE' : 'LABELTRACK TAG'}
          </text>

          <text x="60" y="112" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold" fill="#0f172a">PREMIUM APPAREL</text>
          <text x="60" y="125" font-family="system-ui, sans-serif" font-size="7.5" fill="#64748b">STYLE: <tspan font-weight="bold" fill="#0f172a">DENIM-SLIM-FIT</tspan></text>
          <text x="60" y="137" font-family="system-ui, sans-serif" font-size="7.5" fill="#64748b">SIZE: <tspan font-weight="bold" fill="#0f172a">32 / 81 cm</tspan></text>
          <text x="60" y="149" font-family="system-ui, sans-serif" font-size="7.5" fill="#64748b">COLOR: <tspan font-weight="bold" fill="#0f172a">DARK INDIGO</tspan></text>

          <line x1="55" y1="160" x2="185" y2="160" stroke="#e2e8f0" stroke-width="1"/>

          <g transform="translate(55, 172)">
            <g transform="translate(10, 0)">
              <rect x="0" y="0" width="3" height="42" fill="#0f172a"/>
              <rect x="5" y="0" width="2" height="42" fill="#0f172a"/>
              <rect x="9" y="0" width="4" height="42" fill="#0f172a"/>
              <rect x="16" y="0" width="2" height="42" fill="#0f172a"/>
              <rect x="21" y="0" width="5" height="42" fill="#0f172a"/>
              <rect x="29" y="0" width="2" height="42" fill="#0f172a"/>
              <rect x="34" y="0" width="5" height="42" fill="#0f172a"/>
              <rect x="42" y="0" width="3" height="42" fill="#0f172a"/>
              <rect x="48" y="0" width="4" height="42" fill="#0f172a"/>
              <rect x="55" y="0" width="2" height="42" fill="#0f172a"/>
              <rect x="60" y="0" width="6" height="42" fill="#0f172a"/>
              <rect x="69" y="0" width="3" height="42" fill="#0f172a"/>
              <rect x="75" y="0" width="4" height="42" fill="#0f172a"/>
              <rect x="82" y="0" width="2" height="42" fill="#0f172a"/>
              <rect x="87" y="0" width="5" height="42" fill="#0f172a"/>
              <rect x="95" y="0" width="3" height="42" fill="#0f172a"/>
              <rect x="101" y="0" width="4" height="42" fill="#0f172a"/>
            </g>
            <text x="65" y="55" font-family="monospace" font-size="8" font-weight="bold" fill="#334155" text-anchor="middle">8 901234 567890</text>
          </g>

          <rect x="55" y="240" width="130" height="42" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
          <text x="65" y="255" font-family="system-ui, sans-serif" font-size="7.5" fill="#64748b">MAX. RETAIL PRICE</text>
          <text x="65" y="272" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#0f172a">₹ 1,499.00</text>
          <text x="140" y="271" font-family="system-ui, sans-serif" font-size="7" fill="#64748b">INCL. TAX</text>

          <rect x="35" y="295" width="10" height="12" rx="2" fill="#475569"/>
          <text x="50" y="304" font-family="monospace" font-size="6.5" fill="#64748b">SENSOR NOTCH</text>

          <rect x="50" y="318" width="140" height="22" rx="4" fill="#0f172a"/>
          <text x="120" y="332" font-family="monospace" font-size="7" font-weight="bold" fill="#38bdf8" text-anchor="middle">SYNTHETIC NON-TEARABLE</text>
        </g>
      </svg>
    `;
  }

  // 5. Ribbons (Wax / Wax-Resin / Full Resin)
  if (model.includes('Ribbon') || model.includes('Wax') || model.includes('Resin')) {
    const isWax = model.includes('Wax') && !model.includes('Resin');
    const isResin = model.includes('Full Resin');
    const ribbonGrade = isWax ? 'WAX RIBBON' : (isResin ? 'FULL RESIN RIBBON' : 'WAX-RESIN RIBBON');
    const ribbonColor = isWax ? '#3b82f6' : (isResin ? '#9333ea' : '#059669');
    
    return `
      <svg viewBox="0 0 380 240" class="w-full max-w-md mx-auto drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ribbonRollGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="40%" stop-color="#0f172a"/>
            <stop offset="70%" stop-color="#020617"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#78716c"/>
            <stop offset="50%" stop-color="#d6d3d1"/>
            <stop offset="100%" stop-color="#78716c"/>
          </linearGradient>
          <linearGradient id="silverLeader" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#94a3b8"/>
            <stop offset="50%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>
        </defs>
        
        <rect x="15" y="15" width="350" height="210" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <rect x="25" y="25" width="330" height="30" rx="6" fill="${ribbonColor}"/>
        <text x="190" y="45" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">${ribbonGrade}</text>

        <g transform="translate(40, 75)">
          <rect x="0" y="30" width="200" height="40" rx="4" fill="url(#coreGrad)" stroke="#57534e" stroke-width="1"/>
          <rect x="10" y="44" width="8" height="12" rx="1" fill="#292524"/>
          <rect x="182" y="44" width="8" height="12" rx="1" fill="#292524"/>

          <rect x="25" y="15" width="150" height="70" rx="6" fill="url(#ribbonRollGrad)" stroke="#334155" stroke-width="1.5"/>
          <line x1="30" y1="25" x2="170" y2="25" stroke="#334155" stroke-width="0.75"/>
          <line x1="30" y1="35" x2="170" y2="35" stroke="#334155" stroke-width="0.75"/>
          <line x1="30" y1="65" x2="170" y2="65" stroke="#334155" stroke-width="0.75"/>
          <line x1="30" y1="75" x2="170" y2="75" stroke="#334155" stroke-width="0.75"/>

          <path d="M 175 35 Q 220 30 250 65 L 250 95 Q 220 60 175 65 Z" fill="url(#silverLeader)" stroke="#94a3b8" stroke-width="1"/>
          <text x="215" y="80" font-family="monospace" font-size="7" font-weight="bold" fill="#334155">LEADER TAPE</text>
        </g>

        <g transform="translate(25, 178)">
          <rect x="0" y="0" width="330" height="34" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="15" y="14" font-family="monospace" font-size="8" font-weight="bold" fill="#0f172a">110mm WIDTH &bull; 300m LENGTH</text>
          <text x="15" y="26" font-family="system-ui, sans-serif" font-size="7.5" fill="#64748b">1" Cardboard Core (25.4mm) with dual notches &bull; Coated Side Out (CSO)</text>
          <rect x="245" y="7" width="75" height="20" rx="4" fill="#0f172a"/>
          <text x="282" y="20" font-family="system-ui, sans-serif" font-size="7" font-weight="bold" fill="#a7f3d0" text-anchor="middle">✓ MASTER FIT</text>
        </g>
      </svg>
    `;
  }

  // 6. Generic Catalog item / Custom fallback
  return `
    <svg viewBox="0 0 360 220" class="w-full max-w-sm mx-auto drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="genLabelShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.12"/>
        </filter>
      </defs>
      <g filter="url(#genLabelShadow)">
        <rect x="15" y="15" width="330" height="190" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="25" y="25" width="310" height="32" rx="6" fill="#0f172a"/>
        <text x="40" y="45" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#ffffff">LABELTRACK TECHNICAL MASTER SPECIMEN</text>
        <text x="320" y="45" font-family="monospace" font-size="8" font-weight="bold" fill="#38bdf8" text-anchor="end">APPROVED</text>

        <text x="35" y="80" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">${escapeHtml(model.substring(0, 36))}</text>
        <text x="35" y="96" font-family="monospace" font-size="8.5" fill="#2563eb">${escapeHtml(specs || 'Standard Factory Spec')}</text>

        <g transform="translate(35, 110)">
          <rect x="0" y="0" width="3" height="30" fill="#0f172a"/>
          <rect x="5" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="9" y="0" width="5" height="30" fill="#0f172a"/>
          <rect x="17" y="0" width="1" height="30" fill="#0f172a"/>
          <rect x="21" y="0" width="4" height="30" fill="#0f172a"/>
          <rect x="28" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="32" y="0" width="6" height="30" fill="#0f172a"/>
          <rect x="42" y="0" width="3" height="30" fill="#0f172a"/>
          <rect x="47" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="52" y="0" width="5" height="30" fill="#0f172a"/>
          <rect x="60" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="65" y="0" width="4" height="30" fill="#0f172a"/>
          <rect x="72" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="76" y="0" width="6" height="30" fill="#0f172a"/>
          <rect x="85" y="0" width="3" height="30" fill="#0f172a"/>
          <rect x="91" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="96" y="0" width="4" height="30" fill="#0f172a"/>
          <rect x="103" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="107" y="0" width="5" height="30" fill="#0f172a"/>
          <rect x="115" y="0" width="3" height="30" fill="#0f172a"/>
          <rect x="120" y="0" width="1" height="30" fill="#0f172a"/>
          <rect x="124" y="0" width="4" height="30" fill="#0f172a"/>
          <rect x="131" y="0" width="3" height="30" fill="#0f172a"/>
          <rect x="137" y="0" width="5" height="30" fill="#0f172a"/>
          <rect x="145" y="0" width="2" height="30" fill="#0f172a"/>
          <rect x="150" y="0" width="4" height="30" fill="#0f172a"/>
          <rect x="157" y="0" width="3" height="30" fill="#0f172a"/>
          <text x="80" y="42" font-family="monospace" font-size="7.5" fill="#475569" text-anchor="middle">8 901234 567890</text>
        </g>

        <g transform="translate(230, 105)">
          <rect x="0" y="0" width="95" height="45" rx="4" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,2"/>
          <text x="47" y="18" font-family="system-ui, sans-serif" font-size="7" font-weight="900" fill="#047857" text-anchor="middle">✓ APPROVED</text>
          <text x="47" y="29" font-family="system-ui, sans-serif" font-size="6.5" font-weight="bold" fill="#047857" text-anchor="middle">OFFICIAL PROOF</text>
          <text x="47" y="38" font-family="monospace" font-size="5.5" fill="#059669" text-anchor="middle">REF: SPEC-2026</text>
        </g>

        <rect x="25" y="165" width="310" height="25" rx="5" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="35" y="181" font-family="system-ui, sans-serif" font-size="7.5" fill="#64748b">Direct compatibility verified for production printing & warehouse scanners.</text>
      </g>
    </svg>
  `;
}

// State variables for Sample Proof Modal
let currentSampleModalModel = '';
let currentSampleModalCustomUrl = '';
let currentSampleModalSpecs = '';
let currentSampleModalYear = 2026;

// Open Technical Sample Artwork Modal with Annual Master Color Code & Physical Proof Photos
function openSampleArtworkModal(itemOrDescription, customUrl, selectedYear) {
  const catInfo = getItemCategoryInfo(itemOrDescription);
  let titleStr = '';
  let modelStr = '';
  let customSpecsStr = '';

  if (typeof itemOrDescription === 'object' && itemOrDescription !== null) {
    modelStr = itemOrDescription.model || itemOrDescription.description || catInfo.models[0];
    customSpecsStr = itemOrDescription.spec || '';
  } else {
    modelStr = String(itemOrDescription || catInfo.models[0]).trim();
  }

  const parsed = formatProductDisplay(modelStr);
  titleStr = parsed.title;
  const activeSpecs = customSpecsStr || parsed.specs || MODEL_SPECS_MAP[modelStr] || 'Standard Factory Spec';

  // Cache current modal target
  currentSampleModalModel = modelStr;
  currentSampleModalCustomUrl = customUrl || '';
  currentSampleModalSpecs = activeSpecs;
  currentSampleModalYear = Number(selectedYear) || getActiveYear();

  renderSampleModalContent();
  openModal('sampleArtworkModal');
}

// Switch Year in Sample Proof Modal
function switchSampleModalYear(targetYear) {
  currentSampleModalYear = Number(targetYear);
  renderSampleModalContent();
}

// Render dynamic contents of Sample Modal for currentSampleModalModel & currentSampleModalYear
function renderSampleModalContent() {
  const modelStr = currentSampleModalModel;
  const catInfo = getItemCategoryInfo(modelStr);
  const parsed = formatProductDisplay(modelStr);
  const titleStr = parsed.title;
  const activeSpecs = currentSampleModalSpecs;
  const year = currentSampleModalYear;
  const yearObj = getYearColorConfig(year);
  const activeFiscalYear = getActiveYear();
  const isAdmin = state.currentUser && (state.currentUser.role === 'admin' || state.currentUser.role === 'store_manager');

  // 1. Header Titles
  const titleEl = document.getElementById('sampleArtworkTitle');
  if (titleEl) titleEl.textContent = `${catInfo.icon} ${titleStr}`;

  const yearHeaderBadge = document.getElementById('sampleYearHeaderBadge');
  if (yearHeaderBadge) {
    yearHeaderBadge.textContent = `FY ${year}`;
    if (year === activeFiscalYear) {
      yearHeaderBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono";
    } else {
      yearHeaderBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-mono";
    }
  }

  const codeEl = document.getElementById('sampleSpecimenCode');
  if (codeEl) codeEl.textContent = `SPEC-REF: LT-${catInfo.prefix}-${year}`;

  // 2. Year Selector Tabs
  const yearTabsContainer = document.getElementById('sampleModalYearTabs');
  if (yearTabsContainer && state.annualColorConfig && Array.isArray(state.annualColorConfig.years)) {
    const sortedYears = [...state.annualColorConfig.years].sort((a, b) => a.year - b.year);
    yearTabsContainer.innerHTML = sortedYears.map(y => {
      const isSelected = y.year === year;
      const isActiveMandate = y.year === activeFiscalYear;
      return `
        <button type="button" onclick="switchSampleModalYear(${y.year})" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
          isSelected 
            ? 'bg-slate-900 text-white shadow-xs' 
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
        }">
          <span class="w-2.5 h-2.5 rounded-full border border-white/40 shadow-2xs" style="background-color: ${y.hexColor};"></span>
          <span>${y.year}</span>
          ${isActiveMandate ? `<span class="text-[9px] px-1 py-0.2 rounded font-extrabold ${isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'}">ACTIVE</span>` : ''}
        </button>
      `;
    }).join('');
  }

  // Admin Manage Standards Link
  const manageBtnContainer = document.getElementById('sampleModalYearManageBtnContainer');
  if (manageBtnContainer) {
    if (isAdmin) {
      manageBtnContainer.innerHTML = `
        <button type="button" onclick="openAnnualColorManagerModal('mandates')" class="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition flex items-center gap-1 cursor-pointer">
          <span>🎨 Manage Standards</span>
        </button>
      `;
    } else {
      manageBtnContainer.innerHTML = '';
    }
  }

  // 3. Annual Master Color Code Banner
  const colorBanner = document.getElementById('sampleModalColorBanner');
  if (colorBanner) {
    const isCurrentActive = year === activeFiscalYear;
    colorBanner.style.background = `linear-gradient(135deg, ${yearObj.hexColor}12, #ffffff)`;
    colorBanner.style.borderColor = `${yearObj.hexColor}40`;
    colorBanner.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div class="flex items-start sm:items-center gap-3">
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-sm shrink-0" style="background: linear-gradient(135deg, ${yearObj.hexColor}, ${yearObj.secondaryHex || yearObj.hexColor});">
            🎨
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-extrabold uppercase tracking-wider text-[11px]" style="color: ${yearObj.hexColor};">
                FY ${year} Annual Color Mandate
              </span>
              ${isCurrentActive 
                ? '<span class="px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider">Active Standard</span>' 
                : `<span class="px-2 py-0.2 rounded-full text-[9px] font-bold bg-slate-200 text-slate-700 uppercase tracking-wider font-mono">${yearObj.status}</span>`
              }
            </div>
            <div class="font-bold text-slate-900 mt-0.5 text-xs flex items-center gap-1.5 flex-wrap">
              <span>${escapeHtml(yearObj.colorName)}</span>
              <span class="font-mono text-[10px] text-slate-500 font-semibold">(${yearObj.hexColor}${yearObj.secondaryHex ? ' / ' + yearObj.secondaryHex : ''})</span>
            </div>
            <p class="text-[11px] text-slate-600 font-medium mt-0.5 leading-snug">
              ${escapeHtml(yearObj.guidelines || `All FY ${year} product shipments must follow this approved annual color scheme on roll core markings and outer cartons.`)}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
          <div class="flex flex-col items-center">
            <span class="w-6 h-6 rounded-lg border border-slate-300 shadow-2xs block" style="background-color: ${yearObj.hexColor};" title="Primary Color: ${yearObj.hexColor}"></span>
            <span class="text-[9px] font-mono text-slate-500 mt-0.5">Primary</span>
          </div>
          ${yearObj.secondaryHex ? `
            <div class="flex flex-col items-center">
              <span class="w-6 h-6 rounded-lg border border-slate-300 shadow-2xs block" style="background-color: ${yearObj.secondaryHex};" title="Secondary / Accent: ${yearObj.secondaryHex}"></span>
              <span class="text-[9px] font-mono text-slate-500 mt-0.5">Accent</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // 4. Visual Specimen Frame (Uploaded Photo Proof or Dynamic SVG)
  const container = document.getElementById('sampleArtworkVisualContainer');
  const proofKey = getProofKey(modelStr, year);
  const proof = state.sampleProofs ? state.sampleProofs[proofKey] : null;

  if (container) {
    if (proof && proof.imageUrl) {
      // Physical approved sample photo uploaded
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center p-2 relative w-full">
          <div class="relative max-h-80 w-full flex items-center justify-center rounded-2xl overflow-hidden bg-slate-950/5 border border-slate-200">
            <img src="${proof.imageUrl}" alt="${escapeHtml(titleStr)}" class="max-h-76 w-auto object-contain rounded-xl shadow cursor-pointer transition hover:scale-102" onclick="window.open('${proof.imageUrl}', '_blank')">
            <div class="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
              <span class="w-2 h-2 rounded-full" style="background-color: ${yearObj.hexColor};"></span>
              <span>Official ${year} Approved Physical Sample Proof</span>
            </div>
            <div class="absolute bottom-2.5 right-2.5 bg-slate-950/75 backdrop-blur-md text-slate-200 text-[10px] px-2 py-0.5 rounded-lg font-mono">
              🔍 Click to open full resolution
            </div>
          </div>
          <div class="w-full mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs">
            <div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-emerald-900">✓ Factory Approved Sample Proof (${year})</span>
                <span class="text-[10px] text-slate-500 font-mono">Uploaded by ${escapeHtml(proof.uploadedBy || 'Operations Admin')} on ${proof.uploadedAt ? new Date(proof.uploadedAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              ${proof.notes ? `<p class="text-[11px] text-emerald-800 font-medium mt-0.5 leading-snug">Batch Note: "${escapeHtml(proof.notes)}"</p>` : ''}
            </div>
            ${isAdmin ? `
              <div class="flex items-center gap-1.5 shrink-0">
                <button type="button" onclick="document.getElementById('sampleProofGalleryInput').click()" class="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-bold rounded-lg shadow-2xs transition cursor-pointer">
                  🔄 Replace Photo
                </button>
                <button type="button" onclick="deleteSampleProof('${proofKey}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-[11px] font-bold rounded-lg shadow-2xs transition cursor-pointer">
                  🗑️ Remove
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else if (currentSampleModalCustomUrl) {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center p-4">
          <img src="${currentSampleModalCustomUrl}" alt="${escapeHtml(titleStr)}" class="max-h-72 rounded-xl object-contain shadow border border-slate-200">
          <span class="text-xs text-slate-500 font-mono mt-2">Custom Approved Artwork Proof</span>
        </div>
      `;
    } else {
      // Dynamic SVG Blueprint tinted with annual color
      const svgContent = generateSampleArtworkSvg(modelStr, activeSpecs, yearObj);
      container.innerHTML = `
        <div class="w-full flex flex-col items-center">
          ${svgContent}
          <div class="w-full mt-3 p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-amber-900">
            <div class="flex items-center gap-2">
              <span class="text-base shrink-0">⚠️</span>
              <div>
                <span class="font-bold block">No Physical Sample Photo Uploaded for FY ${year} Yet</span>
                <span class="text-[11px] text-amber-800 leading-snug block">Displaying vector technical layout with ${year} master color standard (${escapeHtml(yearObj.colorName)}).</span>
              </div>
            </div>
            ${isAdmin ? `
              <button type="button" onclick="document.getElementById('sampleProofGalleryInput').click()" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs shadow-2xs transition shrink-0 cursor-pointer self-start sm:self-auto">
                📸 Upload ${year} Photo Proof
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  // 5. Admin Upload Box
  const uploadBox = document.getElementById('sampleProofAdminUploadBox');
  if (uploadBox) {
    if (isAdmin) {
      uploadBox.classList.remove('hidden');
      const boxTitle = document.getElementById('sampleUploadBoxTitle');
      if (boxTitle) boxTitle.textContent = `Upload / Replace Approved Physical Proof Photo for FY ${year}`;
      const notesInput = document.getElementById('sampleProofNotesInput');
      if (notesInput) notesInput.placeholder = `e.g. FY ${year} ${yearObj.colorName} flexo sample batch approved by Quality`;
    } else {
      uploadBox.classList.add('hidden');
    }
  }

  // 6. Technical Specifications Grid
  let substrate = 'Chromo Semi-Gloss Paper';
  let coreSize = '3" Core (76.2 mm)';
  let ups = '1 UPS (Single Across)';
  let rollCapacity = '1,000 / roll';
  let ribbonRec = 'Wax Ribbon (Chromo)';
  let unwind = 'Face Out (Top First)';

  const strLower = modelStr.toLowerCase();
  if (strLower.includes('synthetic')) substrate = 'Synthetic Tear-Proof Poly';
  else if (strLower.includes('board')) substrate = 'Heavy White Art Board';
  else if (strLower.includes('dt direct') || strLower.includes('direct thermal')) {
    substrate = 'Direct Thermal (DT) Top-Coated';
    ribbonRec = 'No Ribbon Required (Direct Thermal)';
  } else if (strLower.includes('ribbon')) {
    substrate = 'Thermal Transfer Ink Ribbon Film';
    if (strLower.includes('wax-resin')) ribbonRec = 'Wax-Resin Smudge-Proof';
    else if (strLower.includes('resin')) ribbonRec = 'Full Resin Scratch-Proof';
    else ribbonRec = 'Wax Standard';
  }

  if (strLower.includes('1" core')) coreSize = '1" Core (25.4 mm) Desktop';
  else if (strLower.includes('3" core')) coreSize = '3" Core (76.2 mm) Industrial';

  if (strLower.includes('2 ups')) ups = '2 UPS (Twin Labels Across)';
  else if (strLower.includes('1 ups')) ups = '1 UPS (Single Across)';

  if (strLower.includes('5,000')) rollCapacity = '5,000 units/roll';
  else if (strLower.includes('2,500')) rollCapacity = '2,500 units/roll';
  else if (strLower.includes('1,000')) rollCapacity = '1,000 units/roll';
  else if (strLower.includes('500')) rollCapacity = '500 units/roll';
  else if (strLower.includes('250')) rollCapacity = '250 units/roll';
  else if (strLower.includes('300m')) rollCapacity = '110mm x 300m roll';

  const specsGrid = document.getElementById('sampleSpecsGrid');
  if (specsGrid) {
    specsGrid.innerHTML = `
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category & SKU</span>
        <span class="font-bold text-slate-800 block mt-0.5">${catInfo.icon} ${catInfo.name}</span>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Substrate / Material</span>
        <span class="font-bold text-slate-800 block mt-0.5">${substrate}</span>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Roll Core Inner Diameter</span>
        <span class="font-bold text-blue-600 font-mono block mt-0.5">${coreSize}</span>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Web Layout (UPS)</span>
        <span class="font-bold text-indigo-600 block mt-0.5">${ups}</span>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Standard Roll Packaging</span>
        <span class="font-bold text-slate-800 font-mono block mt-0.5">${rollCapacity}</span>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Ribbon</span>
        <span class="font-bold text-emerald-700 block mt-0.5">${ribbonRec}</span>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unwind Direction</span>
        <span class="font-bold text-slate-800 block mt-0.5">${unwind}</span>
      </div>
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">FY ${year} Color Mandate</span>
        <span class="font-bold font-mono block mt-0.5 flex items-center gap-1.5" style="color: ${yearObj.hexColor};">
          <span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${yearObj.hexColor};"></span>
          <span>${yearObj.hexColor}</span>
        </span>
      </div>
    `;
  }
}

// Handle Photo Proof File Change (Mobile Camera or File Picker)
async function handleSampleProofFileChange(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const year = currentSampleModalYear || getActiveYear();
  const model = currentSampleModalModel;
  const proofKey = getProofKey(model, year);
  const yearObj = getYearColorConfig(year);
  const notes = document.getElementById('sampleProofNotesInput')?.value.trim() || '';

  showToast(`Compressing & verifying FY ${year} sample photo proof...`);

  try {
    const optimized = await compressDocumentImage(file);
    if (!optimized || !optimized.dataUrl) {
      showToast('Could not process the selected image.', true);
      event.target.value = '';
      return;
    }

    if (!state.sampleProofs) state.sampleProofs = {};
    state.sampleProofs[proofKey] = {
      modelKey: normalizeModelKey(model),
      modelName: model,
      year: Number(year),
      imageUrl: optimized.dataUrl,
      uploadedAt: new Date().toISOString(),
      uploadedBy: (state.currentUser && state.currentUser.name) || 'Operations Admin',
      colorName: yearObj.colorName,
      hexColor: yearObj.hexColor,
      notes: notes || `Approved FY ${year} physical sample (${yearObj.colorName})`
    };

    saveState();
    showToast(`✅ Official FY ${year} physical sample photo proof saved successfully!`);

    // Reset input
    event.target.value = '';
    const notesInput = document.getElementById('sampleProofNotesInput');
    if (notesInput) notesInput.value = '';

    // Re-render sample modal
    renderSampleModalContent();
  } catch (err) {
    console.error('Error uploading sample proof:', err);
    showToast('Failed to save sample proof image. Please try again.', true);
  }
}

// Delete an uploaded sample proof
function deleteSampleProof(proofKey) {
  if (!confirm('Are you sure you want to remove this approved sample photo proof?')) return;
  if (state.sampleProofs && state.sampleProofs[proofKey]) {
    delete state.sampleProofs[proofKey];
    saveState();
    showToast('Approved sample photo proof removed.');
    renderSampleModalContent();
    if (!document.getElementById('annualColorCodeModal')?.classList.contains('hidden')) {
      renderAnnualProofsMatrix();
    }
  }
}

// Gate Receiving Modal Sample Helper
function openReceiveModalSample() {
  if (typeof currentReceiveShipmentId === 'undefined' || !currentReceiveShipmentId) return;
  const s = state.shipments.find(item => item.id === currentReceiveShipmentId);
  if (!s) return;
  openSampleArtworkModal(s.model || s.description || s.sku);
}

// ============================================================
// MODAL 10: ANNUAL MASTER COLOR CODES & PROOFS GALLERY MANAGER
// ============================================================
let currentAnnualManagerTab = 'mandates';
let currentMatrixSelectedYear = 2026;
let currentMatrixCategoryFilter = 'all';

function openAnnualColorManagerModal(subTab) {
  currentAnnualManagerTab = subTab || 'mandates';
  currentMatrixSelectedYear = getActiveYear();
  switchAnnualManagerTab(currentAnnualManagerTab);
  openModal('annualColorCodeModal');
}

function switchAnnualManagerTab(tab) {
  currentAnnualManagerTab = tab || 'mandates';
  const btnMandates = document.getElementById('annualTabBtnMandates');
  const btnMatrix = document.getElementById('annualTabBtnMatrix');
  const paneMandates = document.getElementById('annualPaneMandates');
  const paneMatrix = document.getElementById('annualPaneMatrix');

  const isMandates = currentAnnualManagerTab === 'mandates';
  if (btnMandates) {
    btnMandates.className = isMandates
      ? 'nav-tab-btn nav-tab-btn-active px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer'
      : 'nav-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer';
  }
  if (btnMatrix) {
    btnMatrix.className = !isMandates
      ? 'nav-tab-btn nav-tab-btn-active px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer'
      : 'nav-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer';
  }
  if (paneMandates) {
    if (isMandates) paneMandates.classList.remove('hidden');
    else paneMandates.classList.add('hidden');
  }
  if (paneMatrix) {
    if (!isMandates) paneMatrix.classList.remove('hidden');
    else paneMatrix.classList.add('hidden');
  }

  if (isMandates) {
    renderAnnualColorRegistry();
  } else {
    renderAnnualProofsMatrix();
  }
}

// Render Annual Color Registry
function renderAnnualColorRegistry() {
  const grid = document.getElementById('annualYearsGrid');
  if (!grid) return;

  const activeYear = getActiveYear();
  const years = (state.annualColorConfig && Array.isArray(state.annualColorConfig.years))
    ? [...state.annualColorConfig.years].sort((a, b) => b.year - a.year)
    : [];

  grid.innerHTML = years.map(y => {
    const isActive = Number(y.year) === activeYear;
    
    // Count uploaded proofs for this year
    let proofsCount = 0;
    if (state.sampleProofs) {
      Object.keys(state.sampleProofs).forEach(k => {
        if (state.sampleProofs[k] && Number(state.sampleProofs[k].year) === Number(y.year)) {
          proofsCount++;
        }
      });
    }

    return `
      <div class="rounded-2xl border ${isActive ? 'border-indigo-400 ring-2 ring-indigo-500/20 bg-indigo-50/20' : 'border-slate-200 bg-white'} shadow-xs overflow-hidden flex flex-col justify-between transition hover:shadow-md">
        <div>
          <!-- Top Color Bar -->
          <div class="h-3 w-full" style="background: linear-gradient(90deg, ${y.hexColor}, ${y.secondaryHex || y.hexColor});"></div>
          
          <div class="p-5 space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="text-xs font-mono font-bold text-slate-400">Financial Year</span>
                <h3 class="text-xl font-black text-slate-900 leading-none mt-0.5">FY ${y.year}</h3>
              </div>
              ${isActive ? `
                <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow-2xs uppercase tracking-wider flex items-center gap-1">
                  <span>✓</span>
                  <span>Active Mandate</span>
                </span>
              ` : `
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider font-mono">
                  ${y.status || 'archived'}
                </span>
              `}
            </div>

            <!-- Color Swatch Presentation -->
            <div class="p-3 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center gap-3">
              <div class="flex items-center gap-1 shrink-0">
                <span class="w-7 h-7 rounded-lg border border-slate-300 shadow-2xs block" style="background-color: ${y.hexColor};" title="Primary: ${y.hexColor}"></span>
                ${y.secondaryHex ? `
                  <span class="w-7 h-7 rounded-lg border border-slate-300 shadow-2xs block" style="background-color: ${y.secondaryHex};" title="Accent: ${y.secondaryHex}"></span>
                ` : ''}
              </div>
              <div class="min-w-0">
                <span class="font-bold text-slate-900 text-xs block truncate">${escapeHtml(y.colorName)}</span>
                <span class="font-mono text-[10px] text-slate-500 font-semibold block">${y.hexColor}${y.secondaryHex ? ' • ' + y.secondaryHex : ''}</span>
              </div>
            </div>

            <p class="text-xs text-slate-600 font-medium leading-relaxed">
              ${escapeHtml(y.guidelines || 'Standard core marking and verification guideline for this financial year.')}
            </p>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span class="font-medium">Uploaded Proofs:</span>
              <span class="font-mono font-bold ${proofsCount > 0 ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-slate-400 bg-slate-100'} px-2 py-0.5 rounded-md text-[11px]">
                ${proofsCount} item(s)
              </span>
            </div>
          </div>
        </div>

        <div class="p-3.5 bg-slate-50/90 border-t border-slate-200 flex items-center justify-between gap-2">
          ${!isActive ? `
            <button type="button" onclick="setActiveOperationalYear(${y.year})" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer">
              <span>⭐ Set as Active Mandate</span>
            </button>
          ` : `
            <span class="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <span>● Current Active Standard</span>
            </span>
          `}
          <div class="flex items-center gap-1">
            <button type="button" onclick="toggleNewYearForm(true, ${y.year})" class="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition cursor-pointer" title="Edit Color Standard">
              ✏️
            </button>
            ${!isActive ? `
              <button type="button" onclick="deleteAnnualColorYear(${y.year})" class="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition cursor-pointer" title="Delete Year">
                🗑️
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Toggle Add/Edit Year Form
function toggleNewYearForm(show, yearToEdit) {
  const formCard = document.getElementById('newYearColorFormCard');
  if (!formCard) return;

  if (show === false) {
    formCard.classList.add('hidden');
    return;
  }

  formCard.classList.remove('hidden');
  const heading = document.getElementById('yearFormHeading');
  const origYearInput = document.getElementById('editYearOriginalYear');
  const yearInput = document.getElementById('inputYearNumber');
  const colorNameInput = document.getElementById('inputYearColorName');
  const primaryPicker = document.getElementById('inputYearPrimaryPicker');
  const primaryHex = document.getElementById('inputYearPrimaryHex');
  const secondaryPicker = document.getElementById('inputYearSecondaryPicker');
  const secondaryHex = document.getElementById('inputYearSecondaryHex');
  const statusSelect = document.getElementById('inputYearStatus');
  const guidelinesInput = document.getElementById('inputYearGuidelines');

  if (yearToEdit) {
    const yObj = getYearColorConfig(yearToEdit);
    if (heading) heading.textContent = `Edit FY ${yearToEdit} Annual Color Standard`;
    if (origYearInput) origYearInput.value = yearToEdit;
    if (yearInput) {
      yearInput.value = yObj.year;
      yearInput.disabled = true;
    }
    if (colorNameInput) colorNameInput.value = yObj.colorName;
    if (primaryPicker) primaryPicker.value = yObj.hexColor;
    if (primaryHex) primaryHex.value = yObj.hexColor;
    if (secondaryPicker) secondaryPicker.value = yObj.secondaryHex || '#facc15';
    if (secondaryHex) secondaryHex.value = yObj.secondaryHex || '#facc15';
    if (statusSelect) statusSelect.value = yObj.status || 'upcoming';
    if (guidelinesInput) guidelinesInput.value = yObj.guidelines || '';
  } else {
    if (heading) heading.textContent = 'Register New Financial Year Color Standard';
    if (origYearInput) origYearInput.value = '';
    if (yearInput) {
      const active = getActiveYear();
      yearInput.value = active + 1;
      yearInput.disabled = false;
    }
    if (colorNameInput) colorNameInput.value = '';
    if (primaryPicker) primaryPicker.value = '#7c3aed';
    if (primaryHex) primaryHex.value = '#7c3aed';
    if (secondaryPicker) secondaryPicker.value = '#fb923c';
    if (secondaryHex) secondaryHex.value = '#fb923c';
    if (statusSelect) statusSelect.value = 'upcoming';
    if (guidelinesInput) guidelinesInput.value = '';
  }
}

// Save Year Color Standard
function handleSaveYearColor(event) {
  event.preventDefault();
  const origYear = document.getElementById('editYearOriginalYear')?.value;
  const yearNum = Number(document.getElementById('inputYearNumber')?.value);
  const colorName = document.getElementById('inputYearColorName')?.value.trim();
  const primary = document.getElementById('inputYearPrimaryHex')?.value.trim();
  const secondary = document.getElementById('inputYearSecondaryHex')?.value.trim();
  const status = document.getElementById('inputYearStatus')?.value;
  const guidelines = document.getElementById('inputYearGuidelines')?.value.trim();

  if (!yearNum || !colorName || !primary) {
    showToast('Please fill in Year, Color Title, and Primary Color Hex.', true);
    return;
  }

  if (!state.annualColorConfig) {
    state.annualColorConfig = { ...DEFAULT_ANNUAL_COLOR_CONFIG };
  }
  if (!Array.isArray(state.annualColorConfig.years)) {
    state.annualColorConfig.years = [...DEFAULT_ANNUAL_COLOR_CONFIG.years];
  }

  if (origYear) {
    // Update existing
    const idx = state.annualColorConfig.years.findIndex(y => Number(y.year) === Number(origYear));
    if (idx !== -1) {
      state.annualColorConfig.years[idx] = {
        ...state.annualColorConfig.years[idx],
        colorName,
        hexColor: primary,
        secondaryHex: secondary,
        status,
        guidelines
      };
    }
  } else {
    // Check duplicate
    const exists = state.annualColorConfig.years.some(y => Number(y.year) === yearNum);
    if (exists) {
      showToast(`Financial Year ${yearNum} is already registered!`, true);
      return;
    }
    state.annualColorConfig.years.push({
      year: yearNum,
      colorName,
      hexColor: primary,
      secondaryHex: secondary,
      status,
      guidelines
    });
  }

  if (status === 'active') {
    state.annualColorConfig.activeYear = yearNum;
    state.annualColorConfig.years.forEach(y => {
      if (Number(y.year) !== yearNum && y.status === 'active') {
        y.status = (Number(y.year) > yearNum) ? 'upcoming' : 'archived';
      }
    });
  }

  saveState();
  showToast(`✅ Financial Year ${yearNum} color standard saved successfully!`);
  toggleNewYearForm(false);
  renderAnnualColorRegistry();
}

// Set Active Operational Year
function setActiveOperationalYear(year) {
  const targetYear = Number(year);
  if (!state.annualColorConfig) state.annualColorConfig = { ...DEFAULT_ANNUAL_COLOR_CONFIG };
  state.annualColorConfig.activeYear = targetYear;

  if (Array.isArray(state.annualColorConfig.years)) {
    state.annualColorConfig.years.forEach(y => {
      if (Number(y.year) === targetYear) {
        y.status = 'active';
      } else if (Number(y.year) > targetYear) {
        y.status = 'upcoming';
      } else {
        y.status = 'archived';
      }
    });
  }

  saveState();
  showToast(`⭐ FY ${targetYear} is now the universal active operational standard!`);
  renderAnnualColorRegistry();
}

// Delete an annual color year
function deleteAnnualColorYear(year) {
  const targetYear = Number(year);
  if (targetYear === getActiveYear()) {
    showToast('Cannot delete the currently active operational mandate.', true);
    return;
  }
  if (!confirm(`Are you sure you want to delete the color standard for FY ${targetYear}?`)) return;

  if (state.annualColorConfig && Array.isArray(state.annualColorConfig.years)) {
    state.annualColorConfig.years = state.annualColorConfig.years.filter(y => Number(y.year) !== targetYear);
    saveState();
    showToast(`FY ${targetYear} color standard deleted.`);
    renderAnnualColorRegistry();
  }
}

// Render Master Proofs Matrix
function renderAnnualProofsMatrix(selectedYear, catFilter) {
  if (selectedYear) currentMatrixSelectedYear = Number(selectedYear);
  if (catFilter) currentMatrixCategoryFilter = catFilter;

  const yearSelect = document.getElementById('matrixYearSelect');
  if (yearSelect && state.annualColorConfig && Array.isArray(state.annualColorConfig.years)) {
    yearSelect.innerHTML = state.annualColorConfig.years.map(y => `
      <option value="${y.year}" ${Number(y.year) === currentMatrixSelectedYear ? 'selected' : ''}>
        FY ${y.year} — ${escapeHtml(y.colorName)} ${Number(y.year) === getActiveYear() ? '(Active)' : ''}
      </option>
    `).join('');
  }

  const grid = document.getElementById('annualProofsMatrixGrid');
  if (!grid) return;

  // Collect all models from PRODUCT_CATEGORIES based on current filter
  let allModels = [];
  Object.keys(PRODUCT_CATEGORIES).forEach(catKey => {
    if (currentMatrixCategoryFilter !== 'all' && catKey !== currentMatrixCategoryFilter) return;
    const cat = PRODUCT_CATEGORIES[catKey];
    cat.models.forEach(modelName => {
      if (modelName.toLowerCase().includes('custom')) return; // standard catalog items
      allModels.push({
        category: catKey,
        catInfo: cat,
        modelName: modelName,
        specs: MODEL_SPECS_MAP[modelName] || ''
      });
    });
  });

  grid.innerHTML = allModels.map(item => {
    const proofKey = getProofKey(item.modelName, currentMatrixSelectedYear);
    const proof = state.sampleProofs ? state.sampleProofs[proofKey] : null;
    const parsed = formatProductDisplay(item.modelName);

    return `
      <div class="bg-white rounded-2xl border ${proof ? 'border-emerald-200 shadow-xs' : 'border-slate-200'} p-4 flex flex-col justify-between space-y-3 transition hover:shadow-md">
        <div>
          <div class="flex items-start justify-between gap-2">
            <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-md border ${item.catInfo.badgeClass}">
              <span>${item.catInfo.icon}</span>
              <span>${item.catInfo.name}</span>
            </span>
            ${proof ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span>✓ Approved Proof</span>
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                ⚠️ Awaiting Photo
              </span>
            `}
          </div>

          <h5 class="text-xs font-bold text-slate-900 mt-2">${escapeHtml(parsed.title)}</h5>
          ${parsed.specs ? `<p class="text-[10px] font-mono text-slate-500 mt-0.5 leading-snug">${escapeHtml(parsed.specs)}</p>` : ''}

          <!-- Preview Frame -->
          <div class="mt-3 h-32 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden relative">
            ${proof && proof.imageUrl ? `
              <img src="${proof.imageUrl}" alt="${escapeHtml(parsed.title)}" class="w-full h-full object-cover">
              <div class="absolute bottom-1 right-1 bg-slate-900/80 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                ${new Date(proof.uploadedAt).toLocaleDateString()}
              </div>
            ` : `
              <div class="text-center p-3 text-slate-400">
                <span class="text-2xl block mb-1">🖼️</span>
                <span class="text-[11px] font-semibold block text-slate-500">No Photo Uploaded</span>
                <span class="text-[9px] text-slate-400 font-mono">FY ${currentMatrixSelectedYear} Mandate</span>
              </div>
            `}
          </div>
        </div>

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <button type="button" onclick="openSampleArtworkModal('${escapeHtml(item.modelName)}', null, ${currentMatrixSelectedYear})" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer">
            <span>🔍 View Proof</span>
          </button>
          
          <div>
            <input type="file" id="matrixInput_${proofKey}" accept="image/*" class="hidden" onchange="handleMatrixQuickUpload('${escapeHtml(item.modelName)}', ${currentMatrixSelectedYear}, this)">
            <button type="button" onclick="document.getElementById('matrixInput_${proofKey}').click()" class="px-3 py-1.5 ${proof ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200' : 'btn-gradient-primary text-white'} rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer">
              <span>${proof ? '🔄 Replace' : '📸 Upload Photo'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleMatrixYearChange(year) {
  currentMatrixSelectedYear = Number(year);
  renderAnnualProofsMatrix();
}

function handleMatrixCatChange(cat) {
  currentMatrixCategoryFilter = cat;
  renderAnnualProofsMatrix();
}

// Quick Upload from Master Proofs Gallery Matrix
async function handleMatrixQuickUpload(modelName, year, fileInput) {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;

  const proofKey = getProofKey(modelName, year);
  const yearObj = getYearColorConfig(year);

  showToast(`Compressing & uploading FY ${year} physical proof...`);

  try {
    const optimized = await compressDocumentImage(file);
    if (!optimized || !optimized.dataUrl) {
      showToast('Could not process the selected image.', true);
      fileInput.value = '';
      return;
    }

    if (!state.sampleProofs) state.sampleProofs = {};
    state.sampleProofs[proofKey] = {
      modelKey: normalizeModelKey(modelName),
      modelName: modelName,
      year: Number(year),
      imageUrl: optimized.dataUrl,
      uploadedAt: new Date().toISOString(),
      uploadedBy: (state.currentUser && state.currentUser.name) || 'Operations Admin',
      colorName: yearObj.colorName,
      hexColor: yearObj.hexColor,
      notes: `Batch upload for FY ${year} (${yearObj.colorName})`
    };

    saveState();
    showToast(`✅ Approved proof uploaded for ${modelName.split('—')[0].trim()}!`);
    fileInput.value = '';
    renderAnnualProofsMatrix();
  } catch (err) {
    console.error('Matrix quick upload error:', err);
    showToast('Failed to upload proof. Please try again.', true);
  }
}

// ==========================================
// PROFESSIONAL TAB MANAGEMENT & EXECUTIVE THEME
// ==========================================
function switchAdminTab(tabName) {
  state.adminActiveTab = tabName || 'orders';
  const tabs = ['orders', 'dispatches', 'scorecards', 'vendors'];
  tabs.forEach(t => {
    const btn = document.getElementById(`adminTabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const pane = document.getElementById(`adminPane${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const badge = document.getElementById(`adminTabBadge${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const isActive = (t === state.adminActiveTab);
    if (btn) {
      if (isActive) {
        btn.className = "nav-tab-btn nav-tab-btn-active px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer";
      } else {
        btn.className = "nav-tab-btn px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-2 cursor-pointer";
      }
    }
    if (badge) {
      if (isActive) {
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-white shadow-2xs transition-colors";
      } else {
        badge.className = "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-200/90 text-slate-600 transition-colors";
      }
    }
    if (pane) {
      if (isActive) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    }
  });
}

function setAdminPoFilter(filter) {
  state.adminPoFilter = filter || 'all';
  const btns = {
    all: document.getElementById('adminPoFilterAll'),
    pending: document.getElementById('adminPoFilterPending'),
    in_production: document.getElementById('adminPoFilterProd'),
    in_stock: document.getElementById('adminPoFilterStock'),
    completed: document.getElementById('adminPoFilterComp')
  };
  Object.entries(btns).forEach(([key, btn]) => {
    if (!btn) return;
    if (key === state.adminPoFilter) {
      btn.className = "nav-tab-btn nav-tab-btn-active-primary px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer";
    } else {
      btn.className = "nav-tab-btn px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer";
    }
  });
  render();
}

// ==========================================
// MANUFACTURING & PRODUCTION READINESS TRACKING
// ==========================================
function formatProductionStatusText(status) {
  switch (status) {
    case 'in_stock': return 'In Stock (Ready to Dispatch)';
    case 'in_production': return 'In Production / Printing';
    case 'packing': return 'Finishing & Packing';
    case 'ready_to_ship': return 'Ready for Dispatch';
    case 'pending': return 'Pending Supplier Confirmation';
    default: return 'In Production';
  }
}

function getProductionBadgeHtml(status, estDate) {
  const dateStr = estDate ? `<span class="opacity-80 font-mono text-[9px] block">Est: ${estDate}</span>` : '';
  switch (status) {
    case 'in_stock':
      return `<div class="inline-flex flex-col items-center"><span class="prod-badge prod-in-stock">📦 Ready in Stock</span>${dateStr}</div>`;
    case 'in_production':
      return `<div class="inline-flex flex-col items-center"><span class="prod-badge prod-in-production"><span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>🏭 In Production</span>${dateStr}</div>`;
    case 'packing':
      return `<div class="inline-flex flex-col items-center"><span class="prod-badge prod-packing">🔍 Packing / QA</span>${dateStr}</div>`;
    case 'ready_to_ship':
      return `<div class="inline-flex flex-col items-center"><span class="prod-badge prod-ready-dispatch">🚚 Ready to Dispatch</span>${dateStr}</div>`;
    case 'pending':
    default:
      return `<div class="inline-flex flex-col items-center"><span class="prod-badge prod-pending">⏳ Pending Confirmation</span>${dateStr}</div>`;
  }
}

function openUpdateProductionStatusModal(poNumber) {
  const po = state.pos.find(p => p.poNumber === poNumber);
  if (!po) return;

  document.getElementById('updateProdPoNumber').value = po.poNumber;
  document.getElementById('updateProdPoDisplay').textContent = po.poNumber;
  document.getElementById('updateProdVendorDisplay').textContent = `Assigned Supplier: ${po.vendor}`;
  
  // Show Buyer Deadline & Instructions if specified
  const buyerBox = document.getElementById('updateProdBuyerInstructionBox');
  const buyerText = document.getElementById('updateProdBuyerInstructionText');
  if (buyerBox && buyerText) {
    let instructionParts = [];
    if (po.requiredByDate) instructionParts.push(`Required Delivery Deadline: ${po.requiredByDate}`);
    if (po.buyerNotes) instructionParts.push(`Instructions: "${po.buyerNotes}"`);
    else if (po.productionNotes && po.productionNotes.startsWith('Buyer Instruction:')) instructionParts.push(po.productionNotes);

    if (instructionParts.length > 0) {
      buyerText.textContent = instructionParts.join(' • ');
      buyerBox.classList.remove('hidden');
    } else {
      buyerBox.classList.add('hidden');
    }
  }

  const currentStatus = po.productionStatus || (po.fulfillmentType === 'in_stock' ? 'in_stock' : 'pending');
  const radios = document.getElementsByName('prodStatusRadio');
  radios.forEach(r => {
    r.checked = (r.value === currentStatus);
  });
  // If still pending, check in_stock as suggested default
  if (currentStatus === 'pending' && radios.length > 0) {
    radios[0].checked = true;
  }

  const estInput = document.getElementById('updateProdEstimatedDate');
  if (estInput) estInput.value = po.productionEstimatedDate || po.requiredByDate || '';

  const notesInput = document.getElementById('updateProdNotes');
  if (notesInput) {
    // If notes only contain initial buyer instruction, keep field clean for supplier notes
    if (po.productionNotes && po.productionNotes.startsWith('Buyer Instruction:')) {
      notesInput.value = '';
    } else {
      notesInput.value = po.productionNotes || '';
    }
  }

  const badgeEl = document.getElementById('updateProdCurrentBadge');
  if (badgeEl) {
    badgeEl.innerHTML = getProductionBadgeHtml(currentStatus, po.productionEstimatedDate);
  }

  openModal('updateProductionStatusModal');
}

function handleProductionStatusSubmit(e) {
  e.preventDefault();
  const poNumber = document.getElementById('updateProdPoNumber').value;
  const po = state.pos.find(p => p.poNumber === poNumber);
  if (!po) return;

  const selectedStatus = document.querySelector('input[name="prodStatusRadio"]:checked')?.value || 'in_production';
  const estDate = document.getElementById('updateProdEstimatedDate')?.value || '';
  const notes = document.getElementById('updateProdNotes')?.value.trim() || '';

  po.productionStatus = selectedStatus;
  po.fulfillmentType = (selectedStatus === 'in_stock') ? 'in_stock' : 'made_to_order';
  po.productionEstimatedDate = estDate;
  if (notes) po.productionNotes = notes;
  if (!Array.isArray(po.productionHistory)) po.productionHistory = [];
  po.productionHistory.push({
    timestamp: new Date().toISOString(),
    status: selectedStatus,
    notes: notes || `Readiness confirmed: ${formatProductionStatusText(selectedStatus)}`,
    updatedBy: state.currentUser?.name || (state.currentUser?.vendorName ? state.currentUser.vendorName : 'Supplier')
  });

  saveState();
  closeModal('updateProductionStatusModal');
  showToast(`Updated production stage for Order ${poNumber} to "${formatProductionStatusText(selectedStatus)}"!`);

  if (supabaseClient) {
    supabaseClient.from('purchase_orders').upsert([{
      po_number: po.poNumber,
      vendor_name: po.vendor,
      items: po.items,
      production_status: selectedStatus,
      production_estimated_date: estDate,
      production_notes: notes
    }], { onConflict: 'po_number' }).then(({ error }) => {
      if (error) {
        supabaseClient.from('purchase_orders').upsert([{
          po_number: po.poNumber,
          vendor_name: po.vendor,
          items: po.items
        }], { onConflict: 'po_number' });
      }
    });
  }
}


const DEFAULT_POS = [];

const DEFAULT_SHIPMENTS = [];

const initialVault = (typeof window.__AUTH_VAULT__ !== 'undefined') ? window.__AUTH_VAULT__ : {
  vault_version: "1.0-encrypted",
  encryption_standard: "SHA-256-SALTED-VAULT",
  updated_at: new Date().toISOString(),
  users: [
    {
      email: "admin@labeltrack.com",
      role: "admin",
      name: "Internal Operations Admin",
      salt: "s4lt_adm_89f2a10",
      password_hash: "49b8fe6a957eaac901b2d3a3e62485a1fd836f38aaffc1506b577527ad9dbda9"
    },
    {
      email: "gate@labeltrack.com",
      role: "gatekeeper",
      name: "Gate Security Controller",
      salt: "s4lt_gat_92d1b88",
      password_hash: "e33d3cf043df11f2517443afc8b2a9cf5b48a2773d0bc4191c19e563acd0f37d"
    },
    {
      email: "dispatch@apexprint.com",
      role: "vendor",
      vendorName: "Apex Print Ltd",
      vendorCode: "VEN-01",
      salt: "s4lt_apx_37c9b04",
      password_hash: "36e92909ff2dd0f77b38ec438d2a0e6b089e98468e93ba8403d06d0161c8bcc2"
    },
    {
      email: "dispatch@royalprinters.com",
      role: "vendor",
      vendorName: "Royal Roll Printers",
      vendorCode: "VEN-02",
      salt: "s4lt_ryl_61e5d92",
      password_hash: "005420d010f6de4bccdc7bb67a52f1b6c8981fe317a896369b21a205fbd79287"
    },
    {
      email: "ch.saipavan@rsbrothers.net",
      role: "vendor",
      vendorName: "pavan",
      vendorCode: "VEN-03",
      salt: "s4lt_v_tzgrwzoxdq",
      password_hash: "31f71739667380e7215792dd5c9b5c99ef94d2bf2ec1ff9306208ac52ce36969"
    },
    {
      email: "svl@gmail.com",
      role: "vendor",
      vendorName: "Sri Vigeneswara Labels",
      vendorCode: "SVL",
      salt: "s4lt_v_j65lk9rfta",
      password_hash: "c5f950b9edeb66f9c935e78a258c39b917e63d8328afaf12228bba3f14195fd0"
    }
  ]
};

const CURRENT_CATALOG_VERSION = '2026.10.19-live-v1';
if (typeof localStorage !== 'undefined') {
  if (localStorage.getItem('labeltrack_catalog_version') !== CURRENT_CATALOG_VERSION) {
    localStorage.removeItem('labeltrack_pos');
    localStorage.removeItem('labeltrack_shipments');
    localStorage.setItem('labeltrack_catalog_version', CURRENT_CATALOG_VERSION);
  }
}

const rawStoredPos = JSON.parse(localStorage.getItem('labeltrack_pos'));
const storedPos = (Array.isArray(rawStoredPos) && rawStoredPos.length > 0) ? rawStoredPos : DEFAULT_POS;
const rawStoredShipments = JSON.parse(localStorage.getItem('labeltrack_shipments'));
const storedShipments = (Array.isArray(rawStoredShipments) && rawStoredShipments.length > 0) ? rawStoredShipments : DEFAULT_SHIPMENTS;

// Seamlessly normalize any existing legacy 'PO-' prefixes to 'ORD-' and enrich categories/models
if (Array.isArray(storedPos)) {
  storedPos.forEach(p => {
    if (p.poNumber && p.poNumber.startsWith('PO-')) {
      const oldNum = p.poNumber;
      const newNum = oldNum.replace(/^PO-/, 'ORD-');
      p.poNumber = newNum;
      if (Array.isArray(storedShipments)) {
        storedShipments.forEach(s => {
          if (s.poNumber === oldNum) s.poNumber = newNum;
        });
      }
    }
    if (Array.isArray(p.items)) {
      p.items.forEach(item => {
        const catInfo = getItemCategoryInfo(item);
        if (!item.category) item.category = catInfo.id;
        const parsed = formatProductDisplay(item.description || item.model);
        if (parsed.specs) {
          item.description = `${parsed.title} (${parsed.specs})`;
          item.spec = parsed.specs;
        } else {
          item.description = parsed.title;
        }
        item.model = parsed.title;
      });
    }
    if (!p.productionStatus) {
      p.productionStatus = (p.fulfillmentType === 'in_stock') ? 'in_stock' : 'in_production';
    }
    if (!p.fulfillmentType) {
      p.fulfillmentType = (p.productionStatus === 'in_stock') ? 'in_stock' : 'made_to_order';
    }
    if (typeof p.productionEstimatedDate === 'undefined') p.productionEstimatedDate = '';
    if (typeof p.productionNotes === 'undefined') p.productionNotes = '';
  });
}
if (Array.isArray(storedShipments)) {
  storedShipments.forEach(s => {
    const catInfo = getItemCategoryInfo(s);
    if (!s.category) s.category = catInfo.id;
    const parsed = formatProductDisplay(s.description || s.model);
    if (parsed.specs) {
      s.description = `${parsed.title} (${parsed.specs})`;
    } else {
      s.description = parsed.title;
    }
    s.model = parsed.title;
  });
}

function loadAuthVault() {
  const baseUsers = (typeof window !== 'undefined' && window.__AUTH_VAULT__ && Array.isArray(window.__AUTH_VAULT__.users))
    ? window.__AUTH_VAULT__.users
    : (initialVault && initialVault.users ? initialVault.users : []);

  let localUsers = [];
  try {
    const stored = JSON.parse(localStorage.getItem('labeltrack_auth_vault') || '{}');
    if (stored && Array.isArray(stored.users)) localUsers = stored.users;
  } catch (e) {}

  const mergedMap = new Map();
  localUsers.forEach(u => mergedMap.set(u.email.toLowerCase(), { ...u }));
  baseUsers.forEach(u => mergedMap.set(u.email.toLowerCase(), { ...u }));

  return {
    vault_version: "1.0-encrypted",
    encryption_standard: "SHA-256-SALTED-VAULT",
    updated_at: new Date().toISOString(),
    users: Array.from(mergedMap.values())
  };
}

// Global State
window.state = {
  isLoggedIn: false,
  currentUser: null,
  currentFilter: 'all', // 'all', 'in_production', 'in_stock', 'completed'
  adminPoFilter: 'all', // 'all', 'in_production', 'in_stock', 'completed'
  adminActiveTab: 'orders', // 'orders', 'dispatches', 'scorecards', 'vendors'
  categoryFilter: 'all', // 'all', 'labels', 'tags', 'ribbons', 'cards'
  shipmentFilter: 'all', // 'all', 'shortages', 'damaged', 'today', 'transit'
  gateFilter: 'all', // 'all', 'transit', 'today', 'damaged'
  authVault: loadAuthVault(),
  vendors: JSON.parse(localStorage.getItem('labeltrack_vendors')) || DEFAULT_VENDORS,
  annualColorConfig: JSON.parse(localStorage.getItem('labeltrack_annual_color_codes')) || DEFAULT_ANNUAL_COLOR_CONFIG,
  sampleProofs: JSON.parse(localStorage.getItem('labeltrack_sample_proofs')) || {},
  pos: storedPos,
  shipments: storedShipments
};
var state = window.state;

function saveState() {
  localStorage.setItem('labeltrack_vendors', JSON.stringify(state.vendors));
  localStorage.setItem('labeltrack_annual_color_codes', JSON.stringify(state.annualColorConfig));
  localStorage.setItem('labeltrack_sample_proofs', JSON.stringify(state.sampleProofs));
  localStorage.setItem('labeltrack_pos', JSON.stringify(state.pos));
  localStorage.setItem('labeltrack_shipments', JSON.stringify(state.shipments));
  localStorage.setItem('labeltrack_auth_vault', JSON.stringify(state.authVault));
  updateAnnualColorUI();
  render();
}

// ==========================================
// Supabase Cloud Configuration & Sync
// ==========================================
// Determine best connection endpoint: Use local/Vercel proxy to bypass ISP DNS sinkhole
const isLocalOrProxied = (typeof window !== 'undefined' && window.location) && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  (window.location.pathname && window.location.pathname.startsWith('/'))
);

const SUPABASE_CONFIG = {
  url: (typeof window !== 'undefined' && window.location.origin) 
    ? (window.location.origin + '/supabase-proxy') 
    : 'https://svrjdipjfplwquljhmrx.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2cmpkaXBqZnBsd3F1bGpobXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NDQ1MzUsImV4cCI6MjEwNzEyMDUzNX0.j_o5mv2ZeRh3zDgKsmbefPlQLtA-57-0z1s-4ZQCLRs'
};

let supabaseClient = null;

function initSupabase() {
  if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
        auth: { persistSession: false },
        realtime: { enabled: false }
      });
      fetchCloudState();
    } catch (err) {
      console.warn('Supabase initialization fallback:', err);
      updateCloudSyncIndicator(false);
    }
  } else {
    updateCloudSyncIndicator(false);
  }
}

function dataUrlToBlob(dataUrl) {
  try {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    return null;
  }
}

async function uploadInvoiceToSupabase(invoiceObj, prefix = 'inv') {
  if (!supabaseClient || !invoiceObj || !invoiceObj.dataUrl) return null;
  try {
    const blob = dataUrlToBlob(invoiceObj.dataUrl);
    if (!blob) return null;
    const isPdf = invoiceObj.type && invoiceObj.type.toLowerCase().includes('pdf');
    const ext = isPdf ? 'pdf' : 'jpg';
    const cleanFileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

    const { data, error } = await supabaseClient.storage
      .from('invoices')
      .upload(cleanFileName, blob, {
        contentType: invoiceObj.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
        upsert: false
      });

    if (error) {
      console.warn('Supabase bucket notice:', error.message);
      return null;
    }

    const { data: publicData } = supabaseClient.storage.from('invoices').getPublicUrl(cleanFileName);
    return publicData ? publicData.publicUrl : null;
  } catch (err) {
    console.warn('Invoice upload notice:', err);
    return null;
  }
}

async function fetchCloudState() {
  if (!supabaseClient) return;
  try {
    // 1. Fetch Orders
    const { data: poData, error: poErr } = await supabaseClient
      .from('purchase_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!poErr) {
      if (poData && poData.length > 0) {
        state.pos = poData.map(p => {
          const poNum = (p.po_number || '').replace(/^PO-/, 'ORD-');
          const localExisting = (state.pos || []).find(lp => lp.poNumber === poNum);
          return {
            id: p.id,
            poNumber: poNum,
            vendor: p.vendor_name,
            items: (p.items || []).map(item => {
              const parsed = formatProductDisplay(item.description || item.model);
              return {
                ...item,
                description: parsed.specs ? `${parsed.title} (${parsed.specs})` : parsed.title,
                spec: parsed.specs || item.spec,
                model: parsed.title
              };
            }),
            fulfillmentType: p.fulfillment_type || localExisting?.fulfillmentType || 'made_to_order',
            productionStatus: p.production_status || localExisting?.productionStatus || 'in_production',
            productionEstimatedDate: p.production_estimated_date || localExisting?.productionEstimatedDate || '',
            productionNotes: p.production_notes || localExisting?.productionNotes || '',
            productionHistory: p.production_history || localExisting?.productionHistory || []
          };
        });
      } else {
        state.pos = [];
      }
    }

    // 2. Fetch Shipments
    const { data: shpData, error: shpErr } = await supabaseClient
      .from('shipments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!shpErr) {
      if (shpData && shpData.length > 0) {
        state.shipments = shpData.map(s => {
          const localExisting = (state.shipments || []).find(ls => ls.id === s.id);
          const parsed = formatProductDisplay(s.description || s.model);
          return {
            id: s.id,
            poNumber: (s.po_number || '').replace(/^PO-/, 'ORD-'),
            sku: s.sku,
            model: parsed.title,
            description: parsed.specs ? `${parsed.title} (${parsed.specs})` : parsed.title,
            qtySent: s.qty_sent,
            receivedQty: s.received_qty,
            damagedQty: s.damaged_qty !== undefined ? s.damaged_qty : (localExisting?.damagedQty || 0),
            defectReason: s.defect_reason || localExisting?.defectReason || null,
            boxCount: s.box_count || s.boxes || localExisting?.boxCount || 1,
            receivedBoxes: s.received_boxes !== undefined ? s.received_boxes : (localExisting?.receivedBoxes || null),
            truckLR: s.truck_lr,
            date: s.date,
            damagePhoto: s.damage_photo_url ? {
              name: 'damage_' + s.id,
              type: 'image/jpeg',
              dataUrl: s.damage_photo_url,
              size: 'Cloud Stored'
            } : (localExisting?.damagePhoto || null),
            invoice: s.invoice_url ? {
              name: 'invoice_' + s.id,
              type: s.invoice_url.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
              dataUrl: s.invoice_url,
              size: 'Cloud Stored',
              isCompressed: false
            } : (localExisting?.invoice || null)
          };
        });
      } else {
        state.shipments = [];
      }
    }

    // Filter out any local orphan shipments whose PO was deleted
    const validPoNumbers = new Set(state.pos.map(p => p.poNumber));
    state.shipments = state.shipments.filter(s => validPoNumbers.has(s.poNumber));

    // 3. Fetch Vendors
    const { data: vData, error: vErr } = await supabaseClient
      .from('vendors')
      .select('*');

    if (!vErr && vData && vData.length > 0) {
      state.vendors = vData.map(v => ({
        id: v.id,
        name: v.name,
        code: v.code,
        email: v.email
      }));

      // Merge remote vendor credentials into authVault
      let vaultUpdated = false;
      vData.forEach(v => {
        if (v.password_hash && v.salt) {
          const existing = state.authVault.users.find(u => u.email.toLowerCase() === v.email.toLowerCase());
          if (existing) {
            existing.password_hash = v.password_hash;
            existing.salt = v.salt;
          } else {
            state.authVault.users.push({
              email: v.email,
              role: 'vendor',
              vendorName: v.name,
              vendorCode: v.code,
              salt: v.salt,
              password_hash: v.password_hash
            });
          }
          vaultUpdated = true;
        }
      });
      if (vaultUpdated) {
        localStorage.setItem('labeltrack_auth_vault', JSON.stringify(state.authVault));
      }
    } else if (!vErr && vData && vData.length === 0 && state.vendors.length > 0) {
      supabaseClient.from('vendors').upsert(
        state.vendors.map(v => ({ name: v.name, code: v.code, email: v.email })),
        { onConflict: 'code' }
      ).then(() => {});
    }

    localStorage.setItem('labeltrack_vendors', JSON.stringify(state.vendors));
    localStorage.setItem('labeltrack_pos', JSON.stringify(state.pos));
    localStorage.setItem('labeltrack_shipments', JSON.stringify(state.shipments));
    render();
    updateCloudSyncIndicator(true);
  } catch (e) {
    console.warn('Cloud sync fallback:', e);
    updateCloudSyncIndicator(false);
  }
}

function updateCloudSyncIndicator(synced) {
  const badge = document.getElementById('cloudSyncBadge');
  if (!badge) return;
  if (synced) {
    badge.className = "hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200";
    badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Cloud Synced';
  } else {
    badge.className = "hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200";
    badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Offline Cache';
  }
}


function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('en-IN');
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  const content = document.getElementById('toastContent');
  if (!toast || !content) return;
  content.innerHTML = isError 
    ? `<svg class="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg> <span>${msg}</span>`
    : `<svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> <span>${msg}</span>`;
  
  content.className = isError 
    ? "px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 bg-rose-50 text-rose-900 border-rose-200"
    : "px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 bg-emerald-50 text-emerald-900 border-emerald-200";

  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.style.transform = 'translateY(-120px)';
    toast.style.opacity = '0';
  }, 3500);
}

function openModal(id) { 
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden'); 
    el.scrollTop = 0;
    const scrollables = el.querySelectorAll('.overflow-y-auto, .overflow-auto');
    scrollables.forEach(s => { s.scrollTop = 0; });
  }
  if (id === 'vendorScorecardModal') {
    renderVendorScorecards();
  }
}
function closeModal(id) { 
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden'); 
}

// ==========================================
// Order & SKU Balance Calculations
// ==========================================
function getPoMetrics(poNumber) {
  const po = state.pos.find(p => p.poNumber === poNumber);
  if (!po) return { totalOrdered: 0, totalShipped: 0, totalReceived: 0, totalRemaining: 0, itemsMetrics: [], shipments: [] };

  const poShipments = state.shipments.filter(s => s.poNumber === poNumber);

  let totalOrdered = 0;
  let totalShipped = 0;
  let totalReceived = 0;

  const itemsMetrics = po.items.map(item => {
    totalOrdered += item.orderedQty;

    const itemShipments = poShipments.filter(s => (s.sku && s.sku === item.sku) || (!s.sku && s.description === item.description));
    const shipped = itemShipments.reduce((sum, s) => sum + Number(s.qtySent), 0);
    const received = itemShipments.reduce((sum, s) => sum + (s.receivedQty !== null ? Number(s.receivedQty) : 0), 0);
    
    // Effective accepted towards order fulfillment:
    // When verified at gate, use accepted receivedQty. When in transit, use claimed qtySent.
    const effectiveFulfilled = itemShipments.reduce((sum, s) => {
      return sum + (s.receivedQty !== null ? Number(s.receivedQty) : Number(s.qtySent));
    }, 0);

    const remaining = Math.max(0, item.orderedQty - effectiveFulfilled);

    totalShipped += shipped;
    totalReceived += received;

    return {
      sku: item.sku,
      category: item.category,
      model: item.model,
      spec: item.spec,
      description: item.description,
      orderedQty: item.orderedQty,
      shipped,
      received,
      remaining,
      effectiveFulfilled
    };
  });

  const totalEffectiveFulfilled = itemsMetrics.reduce((sum, i) => sum + i.effectiveFulfilled, 0);
  const totalRemaining = Math.max(0, totalOrdered - totalEffectiveFulfilled);
  return { totalOrdered, totalShipped, totalReceived, totalRemaining, itemsMetrics, shipments: poShipments };
}

// ==========================================
// Dynamic Multi-Item Rows in Order Modal
// Categories & Subdivided Models
// ==========================================
let itemRowCount = 0;

function populateModelDropdown(rowEl, category, selectedModel = '') {
  const modelSelect = rowEl.querySelector('.po-item-model');
  if (!modelSelect) return;
  const catData = PRODUCT_CATEGORIES[category] || PRODUCT_CATEGORIES.labels;
  modelSelect.innerHTML = catData.models.map(m => `
    <option value="${escapeHtml(m)}" ${m === selectedModel ? 'selected' : ''}>${escapeHtml(m)}</option>
  `).join('');
}

function handleModelChange(rowId) {
  const rowEl = document.getElementById(rowId);
  if (!rowEl) return;
  const modelSelect = rowEl.querySelector('.po-item-model');
  const specWrapper = rowEl.querySelector('.po-custom-spec-wrapper');
  const specInput = rowEl.querySelector('.po-item-spec');
  
  if (modelSelect) {
    const selectedModel = modelSelect.value || '';
    const isCustom = selectedModel.toLowerCase().includes('custom');

    if (specWrapper) {
      if (isCustom) {
        specWrapper.classList.remove('hidden');
        if (specInput) {
          specInput.required = true;
          specInput.focus();
        }
      } else {
        specWrapper.classList.add('hidden');
        if (specInput) {
          specInput.required = false;
          specInput.value = '';
        }
      }
    }
  }
}

function handleCategoryChange(rowId) {
  const rowEl = document.getElementById(rowId);
  if (!rowEl) return;
  const catSelect = rowEl.querySelector('.po-item-cat');
  const cat = catSelect ? catSelect.value : 'labels';
  populateModelDropdown(rowEl, cat);
  handleModelChange(rowId);
}

function addNewItemRow(cat = 'labels', model = '', spec = '', qty = '') {
  itemRowCount++;
  const container = document.getElementById('poItemsContainer');
  if (!container) return;
  const rowId = `item-row-${itemRowCount}`;
  const div = document.createElement('div');
  div.id = rowId;
  div.className = "p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 transition hover:border-slate-300";

  const currentCount = container.children.length + 1;
  const selectedCat = PRODUCT_CATEGORIES[cat] ? cat : 'labels';

  div.innerHTML = `
    <div class="flex items-center justify-between text-xs pb-1.5 border-b border-slate-200/70">
      <div class="flex items-center gap-2">
        <span class="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 po-row-badge">#${currentCount}</span>
        <span class="font-bold text-slate-700 po-row-title">Item #${currentCount} Configuration</span>
      </div>
      <button type="button" onclick="removeItemRow('${rowId}')" class="text-rose-500 hover:text-rose-700 text-xs font-semibold px-2 py-0.5 rounded hover:bg-rose-50 transition flex items-center gap-1 cursor-pointer">
        <span>✕ Remove Item</span>
      </button>
    <div class="grid grid-cols-2 sm:grid-cols-12 gap-2 sm:gap-2.5 items-end">
      <div class="col-span-1 sm:col-span-3">
        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">1. Category *</label>
        <select onchange="handleCategoryChange('${rowId}')" class="po-item-cat w-full text-xs px-2.5 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold text-slate-800">
          <option value="labels" ${selectedCat === 'labels' ? 'selected' : ''}>🏷️ Labels</option>
          <option value="tags" ${selectedCat === 'tags' ? 'selected' : ''}>🔖 Tags</option>
          <option value="ribbons" ${selectedCat === 'ribbons' ? 'selected' : ''}>🎗️ Ribbons</option>
          <option value="cards" ${selectedCat === 'cards' ? 'selected' : ''}>💳 Cards</option>
        </select>
      </div>
      <div class="col-span-1 sm:col-span-3 sm:order-last">
        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">3. Qty (Units) *</label>
        <input type="number" placeholder="e.g. 50000" min="1" value="${qty}" oninput="calcNewPoTotal()" required class="po-item-qty w-full text-xs px-2.5 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-right font-mono font-bold text-slate-900">
      </div>
      <div class="col-span-2 sm:col-span-6 po-model-col">
        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">2. Product Model *</label>
        <select onchange="handleModelChange('${rowId}')" class="po-item-model w-full text-xs px-2.5 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-800">
          <!-- Dynamically populated via populateModelDropdown -->
        </select>
      </div>
    </div>
    <!-- Custom Specifications (Only revealed when a Custom Model is selected) -->
    <div class="po-custom-spec-wrapper hidden pt-1">
      <div class="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
        <div class="flex items-center justify-between">
          <label class="block text-[10px] font-bold uppercase tracking-wider text-amber-800">✏️ Custom Model Specifications & Notes *</label>
          <span class="text-[10px] text-amber-600 font-semibold bg-amber-100 px-2 py-0.5 rounded">Custom Specification</span>
        </div>
        <input type="text" placeholder="Enter custom dimensions, material type, core diameter, UPS & roll count (e.g. 60x40mm | Removable Gum | 1' Core | 1,000/roll)" value="${escapeHtml(spec)}" class="po-item-spec w-full text-xs px-3 py-2 border border-amber-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-800 font-medium">
      </div>
    </div>
  `;
  container.appendChild(div);
  populateModelDropdown(div, selectedCat, model);
  handleModelChange(rowId);
  calcNewPoTotal();
}

function reindexItemRows() {
  const container = document.getElementById('poItemsContainer');
  if (!container) return;
  const rows = container.querySelectorAll('[id^="item-row-"]');
  rows.forEach((row, idx) => {
    const badge = row.querySelector('.po-row-badge');
    const title = row.querySelector('.po-row-title');
    if (badge) badge.textContent = `#${idx + 1}`;
    if (title) title.textContent = `Item #${idx + 1} Configuration`;
  });
}

function removeItemRow(id) {
  const container = document.getElementById('poItemsContainer');
  if (container.children.length <= 1) {
    showToast('An order must have at least 1 item!', true);
    return;
  }
  const el = document.getElementById(id);
  if (el) el.remove();
  reindexItemRows();
  calcNewPoTotal();
}

function calcNewPoTotal() {
  const qtyInputs = document.querySelectorAll('.po-item-qty');
  let sum = 0;
  qtyInputs.forEach(input => {
    const val = Number(input.value) || 0;
    sum += val;
  });
  const el = document.getElementById('newPoTotalSum');
  if (el) el.textContent = formatNumber(sum) + ' units';
}

function openNewPoModal() {
  document.getElementById('newPoNumber').value = 'ORD-2026-' + Math.floor(1000 + Math.random() * 900);
  const container = document.getElementById('poItemsContainer');
  container.innerHTML = '';
  itemRowCount = 0;
  
  addNewItemRow('labels', '', '', '');
  calcNewPoTotal();

  openModal('newPoModal');
}

function handleNewPoSubmit(e) {
  e.preventDefault();
  const num = document.getElementById('newPoNumber').value.trim();
  const vendor = document.getElementById('newPoVendor').value;

  if (!num) {
    showToast('Please enter a valid order number!', true);
    return;
  }

  // Prevent duplicate order numbers
  if (state.pos.some(p => p.poNumber.toLowerCase() === num.toLowerCase())) {
    showToast(`Order Number "${num}" already exists! Please use a unique order number.`, true);
    return;
  }

  const container = document.getElementById('poItemsContainer');
  const rows = container ? container.querySelectorAll('[id^="item-row-"]') : [];

  const items = [];
  rows.forEach((row, idx) => {
    const cat = row.querySelector('.po-item-cat')?.value || 'labels';
    const model = row.querySelector('.po-item-model')?.value || '';
    const spec = (row.querySelector('.po-item-spec')?.value || '').trim();
    const qty = Number(row.querySelector('.po-item-qty')?.value);

    if (model && qty > 0) {
      const catInfo = PRODUCT_CATEGORIES[cat] || PRODUCT_CATEGORIES.labels;
      const isCustom = model.toLowerCase().includes('custom');
      const itemSpec = isCustom ? spec : (MODEL_SPECS_MAP[model] || '');
      const fullDesc = isCustom && spec ? `${model} (${spec})` : model;
      items.push({
        sku: `${catInfo.prefix}-${idx + 1}`,
        category: cat,
        model: model,
        spec: itemSpec,
        description: fullDesc,
        orderedQty: qty
      });
    }
  });

  if (items.length === 0) {
    showToast('Please add at least 1 item with quantity!', true);
    return;
  }

  const reqDate = document.getElementById('newPoRequiredDate')?.value || '';
  const buyerNotes = document.getElementById('newPoBuyerNotes')?.value.trim() || '';

  state.pos.push({
    id: 'ord-' + (state.pos.length + 1),
    poNumber: num,
    vendor: vendor,
    items: items,
    fulfillmentType: 'pending_supplier',
    productionStatus: 'pending',
    productionEstimatedDate: reqDate,
    requiredByDate: reqDate,
    buyerNotes: buyerNotes,
    productionNotes: buyerNotes ? `Buyer Instruction: ${buyerNotes}` : '',
    productionHistory: [
      {
        timestamp: new Date().toISOString(),
        status: 'pending',
        notes: buyerNotes ? `Order issued with buyer instruction: "${buyerNotes}"` : 'Order issued to supplier. Awaiting supplier stock & production readiness assessment.',
        updatedBy: state.currentUser?.name || 'Admin'
      }
    ],
    status: 'Pending Dispatch'
  });

  saveState();
  closeModal('newPoModal');
  showToast(`Created Order ${num} with ${items.length} items across categories for ${vendor}!`);

  // Cloud sync to Supabase
  if (supabaseClient) {
    supabaseClient.from('purchase_orders').insert([{
      po_number: num,
      vendor_name: vendor,
      items: items,
      production_status: prodStatus,
      production_estimated_date: estDate,
      production_notes: prodNotes
    }]).then(({ error }) => {
      if (error) {
        // Fallback if production status columns don't exist yet on remote table
        supabaseClient.from('purchase_orders').insert([{
          po_number: num,
          vendor_name: vendor,
          items: items
        }]).then(() => fetchCloudState());
      } else {
        console.log('✓ Order synced to Supabase purchase_orders table');
        fetchCloudState();
      }
    });
  } else {
    console.warn('Supabase client is not connected');
    showToast('Notice: Saved locally (Cloud database not connected)', true);
  }
}

function deletePo(poNumber) {
  if (state.currentUser?.role === 'gatekeeper') {
    showToast('Permission Denied: Gatekeepers cannot delete Orders.', true);
    return;
  }
  if (!confirm('Are you sure you want to delete Order ' + poNumber + '? All related dispatches, receiving logs, and invoice entries will also be permanently deleted.')) return;
  
  // 1. Remove Order and all its associated shipments from state
  state.pos = state.pos.filter(p => p.poNumber !== poNumber);
  state.shipments = state.shipments.filter(s => s.poNumber !== poNumber);
  
  saveState();
  showToast(`Order ${poNumber} and all its dispatches removed.`);

  // 2. Cascade delete from Supabase Cloud
  if (supabaseClient) {
    // Delete shipments for this PO first
    supabaseClient.from('shipments').delete().eq('po_number', poNumber)
      .then(({ error: sErr }) => {
        if (sErr) console.warn('Supabase shipment cascade delete notice:', sErr.message);
        // Then delete the parent PO
        supabaseClient.from('purchase_orders').delete().eq('po_number', poNumber)
          .then(({ error: pErr }) => {
            if (pErr) console.warn('Supabase PO delete notice:', pErr.message);
            fetchCloudState();
          });
      });
  }
}

function deleteShipment(shipmentId) {
  if (state.currentUser?.role === 'gatekeeper') {
    showToast('Permission Denied: Gatekeepers cannot delete dispatch logs.', true);
    return;
  }
  const s = state.shipments.find(item => item.id === shipmentId);
  if (!s) return;
  if (!confirm(`Are you sure you want to delete dispatch record ${s.id} (Truck ${s.truckLR})?`)) return;

  state.shipments = state.shipments.filter(item => item.id !== shipmentId);
  saveState();
  showToast(`Dispatch record ${s.id} removed.`);

  // Cloud delete from Supabase
  if (supabaseClient) {
    supabaseClient.from('shipments').delete().eq('id', shipmentId)
      .then(({ error }) => {
        if (error) console.warn('Supabase shipment delete notice:', error.message);
        fetchCloudState();
      });
  }
}

function clearAllShipments() {
  if (state.currentUser?.role === 'gatekeeper') {
    showToast('Permission Denied: Gatekeepers cannot clear dispatch logs.', true);
    return;
  }
  if (state.shipments.length === 0) {
    showToast('There are no dispatch records to clear.', true);
    return;
  }
  if (!confirm(`Are you sure you want to clear ALL ${state.shipments.length} warehouse dispatch and receiving logs? This action cannot be undone.`)) {
    return;
  }

  const idsToDelete = state.shipments.map(s => s.id);
  state.shipments = [];
  saveState();
  showToast('All warehouse dispatch and receiving logs cleared.');

  // Cloud delete from Supabase
  if (supabaseClient) {
    supabaseClient.from('shipments').delete().neq('id', 'placeholder-none')
      .then(({ error }) => {
        if (error) console.warn('Supabase clear shipments notice:', error.message);
      });
  }
}

// ==========================================
// Vendor Dispatch & Smart High-Fidelity Invoice Upload
// ==========================================
let currentDispatchInvoice = null;

// Smart Document Image Compressor:
// 1. Keeps digital vector PDFs 100% untouched and authentic.
// 2. High Document Resolution (1920px max dimension) ensures 300 DPI text clarity.
// 3. Bilinear/Bicubic high smoothing prevents pixelation on barcodes, small font numbers, and signatures.
// 4. Quality factor 0.88 prevents JPEG block artifacts while cutting file size by 75% - 92%.
function compressDocumentImage(file) {
  return new Promise((resolve) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          name: file.name,
          originalSize: file.size,
          compressedSize: file.size,
          size: formatFileSize(file.size),
          type: 'application/pdf',
          dataUrl: e.target.result,
          savedPercent: 0,
          isCompressed: false
        });
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
      return;
    }

    // Process image file
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1920;
        let width = img.width;
        let height = img.height;

        // Proportional scale down only if oversized camera photo
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Premium smoothing: preserves sharp text and thin barcode lines
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Clean white background backing
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        // High-efficiency document compression (0.78 quality preserves sharp barcodes & small text while cutting file size to ~120KB)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78);
        const base64Len = compressedDataUrl.split(',')[1].length;
        const compressedBytes = Math.round((base64Len * 3) / 4);

        const savedPercent = file.size > compressedBytes 
          ? Math.round(((file.size - compressedBytes) / file.size) * 100) 
          : 0;

        resolve({
          name: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
          originalSize: file.size,
          compressedSize: compressedBytes,
          size: formatFileSize(compressedBytes),
          type: 'image/jpeg',
          dataUrl: compressedDataUrl,
          savedPercent: savedPercent,
          isCompressed: savedPercent > 10
        });
      };
      img.onerror = () => resolve(null);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

async function handleInvoiceFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (isPdf && file.size > 3.5 * 1024 * 1024) {
    showToast('PDF exceeds 3.5MB limit. Please upload a standard invoice document.', true);
    e.target.value = '';
    return;
  }
  if (!isPdf && file.size > 12 * 1024 * 1024) {
    showToast('Image exceeds 12MB limit. Please select a document photo.', true);
    e.target.value = '';
    return;
  }

  showToast('Optimizing document for sharp readability...', false);

  const optimized = await compressDocumentImage(file);
  if (!optimized) {
    showToast('Unable to process document. Please try a different file.', true);
    e.target.value = '';
    return;
  }
  currentDispatchInvoice = optimized;

  document.getElementById('fileUploadPlaceholder').classList.add('hidden');
  document.getElementById('fileUploadSelected').classList.remove('hidden');
  document.getElementById('fileDisplayName').textContent = optimized.name;
  
  const sizeLabel = document.getElementById('fileDisplaySize');
  const badge = document.getElementById('fileCompressBadge');

  if (optimized.isCompressed) {
    sizeLabel.textContent = `${formatFileSize(optimized.originalSize)} → ${optimized.size}`;
    badge.textContent = `✓ Saved ${optimized.savedPercent}% (Sharp Text)`;
    badge.classList.remove('hidden');
  } else {
    sizeLabel.textContent = optimized.size;
    badge.textContent = `✓ Original Document Quality`;
    badge.classList.remove('hidden');
  }

  document.getElementById('fileTypeIcon').textContent = optimized.type.includes('pdf') ? '📄' : '🖼️';
  
  // Clear any mandatory error styling
  const invoiceError = document.getElementById('modalInvoiceError');
  if (invoiceError) invoiceError.classList.add('hidden');
  const dropzone = document.getElementById('invoiceUploadDropzone');
  if (dropzone) {
    dropzone.classList.remove('border-rose-500', 'bg-rose-50/50');
    dropzone.classList.add('border-slate-300');
  }

  showToast('Invoice attached with high document clarity!');
}

function previewSelectedInvoice(e) {
  if (e) e.stopPropagation();
  if (!currentDispatchInvoice) return;

  document.getElementById('invoicePreviewTitle').textContent = 'Attached Document Preview';
  document.getElementById('invoicePreviewName').textContent = currentDispatchInvoice.name;
  document.getElementById('invoicePreviewSize').textContent = currentDispatchInvoice.size;

  const contentDiv = document.getElementById('invoicePreviewContent');
  if (currentDispatchInvoice.type.startsWith('image/')) {
    contentDiv.innerHTML = `
      <div class="text-center w-full space-y-3">
        <p class="text-xs text-slate-500">Zoom in to verify text, numbers, and barcodes are 100% sharp.</p>
        <div class="max-h-[60vh] overflow-auto border border-slate-200 rounded-xl bg-slate-50 p-2">
          <img src="${currentDispatchInvoice.dataUrl}" alt="Invoice preview" class="max-w-full mx-auto rounded-lg shadow-sm">
        </div>
      </div>
    `;
  } else {
    contentDiv.innerHTML = `
      <div class="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 max-w-md w-full space-y-4">
        <div class="w-16 h-16 bg-red-100 text-red-600 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold shadow-xs">📄</div>
        <div>
          <h4 class="font-bold text-slate-900 text-sm">${currentDispatchInvoice.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">Vector PDF Document • ${currentDispatchInvoice.size}</p>
        </div>
      </div>
    `;
  }
  openModal('invoicePreviewModal');
}

function removeSelectedFile(e) {
  if (e) e.stopPropagation();
  currentDispatchInvoice = null;
  document.getElementById('inputInvoiceFile').value = '';
  document.getElementById('fileUploadPlaceholder').classList.remove('hidden');
  document.getElementById('fileUploadSelected').classList.add('hidden');
  const badge = document.getElementById('fileCompressBadge');
  if (badge) badge.classList.add('hidden');
  const invoiceError = document.getElementById('modalInvoiceError');
  if (invoiceError) invoiceError.classList.add('hidden');
  const dropzone = document.getElementById('invoiceUploadDropzone');
  if (dropzone) {
    dropzone.classList.remove('border-rose-500', 'bg-rose-50/50');
    dropzone.classList.add('border-slate-300');
  }
}

function updateModalItemBalance() {
  const poNumber = document.getElementById('modalPoId').value;
  const select = document.getElementById('modalItemSelect');
  const selectedSku = select.value;
  const { itemsMetrics } = getPoMetrics(poNumber);
  const currentItem = itemsMetrics.find(i => i.sku === selectedSku);

  if (currentItem) {
    document.getElementById('modalOrderedQty').textContent = formatNumber(currentItem.orderedQty) + ' units';
    document.getElementById('modalRemainingQty').textContent = formatNumber(currentItem.remaining) + ' units';
  }
}

function openDispatchModal(poNumber) {
  const po = state.pos.find(p => p.poNumber === poNumber);
  if (!po) return;
  const { itemsMetrics, totalRemaining } = getPoMetrics(poNumber);

  if (totalRemaining === 0) {
    showToast('This order is already 100% fulfilled and locked.', true);
    return;
  }

  document.getElementById('modalPoId').value = poNumber;
  document.getElementById('modalPoTitle').textContent = `${po.poNumber} — Dispatch Entry`;

  const select = document.getElementById('modalItemSelect');
  select.innerHTML = itemsMetrics.map(item => {
    const catInfo = getItemCategoryInfo(item);
    const parsed = formatProductDisplay(item.description);
    return `
      <option value="${item.sku}" ${item.remaining === 0 ? 'disabled' : ''}>
        ${catInfo.icon} ${item.sku}: ${parsed.title} (Rem: ${formatNumber(item.remaining)} units)${item.remaining === 0 ? ' [FULFILLED]' : ''}
      </option>
    `;
  }).join('');

  // Auto-select first non-fulfilled item
  const firstAvailable = itemsMetrics.findIndex(i => i.remaining > 0);
  if (firstAvailable !== -1) {
    select.selectedIndex = firstAvailable;
  }

  // Toggle single item view vs multi-item selector dropdown
  const selectContainer = document.getElementById('modalItemSelectContainer');
  const singleItemDisplay = document.getElementById('modalSingleItemDisplay');

  if (itemsMetrics.length === 1) {
    if (selectContainer) selectContainer.classList.add('hidden');
    if (singleItemDisplay) {
      singleItemDisplay.classList.remove('hidden');
      const item = itemsMetrics[0];
      const catInfo = getItemCategoryInfo(item);
      const parsed = formatProductDisplay(item.description);
      const bBadge = document.getElementById('modalSingleItemBadge');
      const bSku = document.getElementById('modalSingleItemSku');
      const bTitle = document.getElementById('modalSingleItemTitle');
      if (bBadge) {
        bBadge.className = `inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-md border ${catInfo.badgeClass}`;
        bBadge.innerHTML = `<span>${catInfo.icon}</span><span>${catInfo.name}</span>`;
      }
      if (bSku) bSku.textContent = item.sku;
      if (bTitle) {
        bTitle.textContent = parsed.title;
        if (parsed.specs) {
          bTitle.innerHTML = `${escapeHtml(parsed.title)} <span class="text-[10px] text-slate-500 font-mono font-normal">(${escapeHtml(parsed.specs)})</span>`;
        }
      }
    }
  } else {
    if (selectContainer) selectContainer.classList.remove('hidden');
    if (singleItemDisplay) singleItemDisplay.classList.add('hidden');
  }

  document.getElementById('inputQtySent').value = '';
  document.getElementById('inputBoxCount').value = '';
  document.getElementById('inputTruckLR').value = '';
  document.getElementById('inputDispatchDate').value = new Date().toISOString().slice(0, 10);
  document.getElementById('modalQtyError').classList.add('hidden');

  // Reset file upload
  removeSelectedFile();

  updateModalItemBalance();
  openModal('dispatchModal');
}

async function handleDispatchSubmit(e) {
  e.preventDefault();
  const poNumber = document.getElementById('modalPoId').value;
  const selectedSku = document.getElementById('modalItemSelect').value;
  const qty = Number(document.getElementById('inputQtySent').value);
  const boxCount = Number(document.getElementById('inputBoxCount').value);
  const truck = document.getElementById('inputTruckLR').value.trim();
  const date = document.getElementById('inputDispatchDate').value;
  const { itemsMetrics } = getPoMetrics(poNumber);
  const currentItem = itemsMetrics.find(i => i.sku === selectedSku);
  const errorMsg = document.getElementById('modalQtyError');

  if (!currentItem) {
    showToast('Please select a valid item to dispatch.', true);
    return;
  }

  if (isNaN(qty) || qty <= 0) {
    errorMsg.textContent = 'Please enter a valid quantity greater than 0.';
    errorMsg.classList.remove('hidden');
    return;
  }

  if (isNaN(boxCount) || boxCount <= 0) {
    showToast('Please specify the number of boxes / cartons dispatched!', true);
    return;
  }

  if (currentItem.remaining <= 0) {
    errorMsg.textContent = `🛑 Disallowed: This item (${currentItem.sku}) is already 100% fulfilled!`;
    errorMsg.classList.remove('hidden');
    return;
  }

  if (qty > currentItem.remaining) {
    errorMsg.textContent = `🛑 Disallowed: Entered quantity (${formatNumber(qty)}) exceeds remaining quota (${formatNumber(currentItem.remaining)})!`;
    errorMsg.classList.remove('hidden');
    return;
  }

  // MANDATORY INVOICE / CHALLAN PHOTO VALIDATION
  const invoiceError = document.getElementById('modalInvoiceError');
  const dropzone = document.getElementById('invoiceUploadDropzone');
  if (!currentDispatchInvoice || !currentDispatchInvoice.dataUrl) {
    if (invoiceError) invoiceError.classList.remove('hidden');
    if (dropzone) {
      dropzone.classList.remove('border-slate-300');
      dropzone.classList.add('border-rose-500', 'bg-rose-50/50');
    }
    showToast('⚠️ Mandatory: Please attach the delivery challan or invoice photo before dispatching!', true);
    return;
  } else {
    if (invoiceError) invoiceError.classList.add('hidden');
    if (dropzone) {
      dropzone.classList.remove('border-rose-500', 'bg-rose-50/50');
      dropzone.classList.add('border-slate-300');
    }
  }

  const shipmentId = `SHP-${100 + state.shipments.length + 1}`;

  // Upload invoice to Supabase Cloud Storage if available
  let invoiceCloudUrl = null;
  if (supabaseClient && currentDispatchInvoice && currentDispatchInvoice.dataUrl) {
    try {
      invoiceCloudUrl = await uploadInvoiceToSupabase(currentDispatchInvoice);
    } catch (err) {
      console.warn('Supabase invoice storage notice:', err);
    }
  }

  const catInfo = getItemCategoryInfo(currentItem);
  const newShipment = {
    id: shipmentId,
    poNumber: poNumber,
    sku: currentItem.sku,
    category: currentItem.category || catInfo.id,
    model: currentItem.model || currentItem.description || catInfo.models[0],
    description: currentItem.description,
    qtySent: qty,
    boxCount: boxCount || 1,
    truckLR: truck,
    date: date,
    receivedQty: null,
    receivedBoxes: null,
    invoice: currentDispatchInvoice ? {
      ...currentDispatchInvoice,
      dataUrl: invoiceCloudUrl || currentDispatchInvoice.dataUrl
    } : null
  };

  state.shipments.push(newShipment);
  saveState();
  closeModal('dispatchModal');
  showToast(`Dispatched ${formatNumber(qty)} units across ${boxCount} box(es) under Invoice #${truck}!`);

  // Cloud sync to Supabase
  if (supabaseClient) {
    const targetPo = state.pos.find(p => p.poNumber === poNumber);
    if (targetPo) {
      supabaseClient.from('purchase_orders').upsert([{
        po_number: targetPo.poNumber,
        vendor_name: targetPo.vendor,
        items: targetPo.items
      }], { onConflict: 'po_number' }).then(() => {
        const shipmentPayload = {
          id: shipmentId,
          po_number: poNumber,
          sku: currentItem.sku,
          description: currentItem.description,
          qty_sent: qty,
          box_count: boxCount || 1,
          truck_lr: truck,
          date: date,
          received_qty: null,
          received_boxes: null,
          invoice_url: invoiceCloudUrl
        };

        supabaseClient.from('shipments').insert([shipmentPayload]).then(({ error }) => {
          if (error) {
            console.warn('Supabase shipment insert notice:', error.message);
            // Fallback if box_count / received_boxes columns are not yet in Supabase
            const legacyPayload = { ...shipmentPayload };
            delete legacyPayload.box_count;
            delete legacyPayload.received_boxes;
            supabaseClient.from('shipments').insert([legacyPayload]).then(({ error: legErr }) => {
              if (legErr) {
                console.error('Supabase shipment insert failed:', legErr.message);
                showToast('Cloud database notice: ' + legErr.message, true);
              } else {
                console.log('✓ Dispatch synced to Supabase shipments table (legacy fallback)');
                fetchCloudState();
              }
            });
          } else {
            console.log('✓ Dispatch with box_count synced to Supabase shipments table');
            fetchCloudState();
          }
        });
      });
    }
  }
}

// ==========================================
// Warehouse Gatekeeper Receiving & Gate Verification
// ==========================================
let currentReceiveShipmentId = null;
let currentDamagePhoto = null;

async function handleDamagePhotoSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 12 * 1024 * 1024) {
    showToast('Image exceeds 12MB limit. Please select a standard document/carton photo.', true);
    e.target.value = '';
    return;
  }

  showToast('Optimizing damage proof photo...', false);
  const optimized = await compressDocumentImage(file);
  if (!optimized) {
    showToast('Unable to process photo. Please try a different image.', true);
    e.target.value = '';
    return;
  }

  currentDamagePhoto = optimized;
  const thumb = document.getElementById('damagePhotoThumb');
  const container = document.getElementById('damagePhotoThumbContainer');
  if (thumb && container) {
    thumb.src = optimized.dataUrl;
    container.classList.remove('hidden');
  }
  const dropzone = document.getElementById('damagePhotoDropzone');
  const errorMsg = document.getElementById('damagePhotoErrorMsg');
  if (dropzone) {
    dropzone.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500', 'bg-rose-50/70');
    dropzone.classList.add('border-emerald-400', 'bg-emerald-50/30');
  }
  if (errorMsg) errorMsg.classList.add('hidden');
  showToast('Damage proof photo attached!');
}

function removeDamagePhoto(e) {
  if (e) e.stopPropagation();
  currentDamagePhoto = null;
  const fileInp = document.getElementById('inputDamagePhotoFile');
  if (fileInp) fileInp.value = '';
  const container = document.getElementById('damagePhotoThumbContainer');
  if (container) container.classList.add('hidden');
  const dropzone = document.getElementById('damagePhotoDropzone');
  if (dropzone) {
    dropzone.classList.remove('border-emerald-400', 'bg-emerald-50/30');
    dropzone.classList.add('border-rose-200', 'bg-white');
  }
}

function previewSelectedDamagePhoto() {
  if (!currentDamagePhoto) return;
  document.getElementById('invoicePreviewTitle').textContent = 'Damaged Carton & Goods Proof';
  document.getElementById('invoicePreviewName').textContent = currentDamagePhoto.name;
  document.getElementById('invoicePreviewSize').textContent = currentDamagePhoto.size;

  const contentDiv = document.getElementById('invoicePreviewContent');
  contentDiv.innerHTML = `
    <div class="text-center w-full space-y-3">
      <p class="text-xs text-rose-600 font-bold">Physical Damage Evidence Recorded at Warehouse Gate</p>
      <div class="border border-rose-200 rounded-2xl bg-slate-50 p-2.5">
        <img src="${currentDamagePhoto.dataUrl}" alt="Damage proof preview" class="max-h-[52vh] max-w-full mx-auto rounded-lg shadow-sm object-contain">
      </div>
    </div>
  `;
  openModal('invoicePreviewModal');
  const scrollContainer = document.getElementById('invoicePreviewContent');
  if (scrollContainer) scrollContainer.scrollTop = 0;
}

function viewDamagePhoto(shipmentId) {
  const s = state.shipments.find(item => item.id === shipmentId);
  if (!s || !s.damagePhoto) {
    showToast('No damage photo proof recorded for this shipment.', true);
    return;
  }

  const photo = s.damagePhoto;
  document.getElementById('invoicePreviewTitle').textContent = `Damage Evidence: ${s.id} (Invoice #${s.truckLR})`;
  document.getElementById('invoicePreviewName').textContent = photo.name || 'damage_proof.jpg';
  document.getElementById('invoicePreviewSize').textContent = photo.size || '';

  const contentDiv = document.getElementById('invoicePreviewContent');
  contentDiv.innerHTML = `
    <div class="w-full space-y-3.5">
      <div class="p-4 bg-rose-50/80 border border-rose-200/90 rounded-2xl text-xs text-rose-900 text-left space-y-2 shadow-2xs">
        <div class="flex items-center justify-between">
          <span class="font-extrabold text-rose-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span>⚠️</span>
            <span>Warehouse Gate Inspection Report</span>
          </span>
          <span class="font-mono text-[10px] text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-rose-200/60">${escapeHtml(s.date)}</span>
        </div>
        <div><strong>Reported Defect Reason:</strong> <span class="text-rose-700 font-bold">${escapeHtml(s.defectReason || 'Transit carton damage')}</span></div>
        <div class="grid grid-cols-2 gap-2 pt-1.5 border-t border-rose-200/80 text-[11px]">
          <div>Rejected Defective: <strong class="font-mono text-rose-700 font-bold">${formatNumber(s.damagedQty || 0)} units</strong></div>
          <div>Accepted Good Stock: <strong class="font-mono text-emerald-700 font-bold">${formatNumber(s.receivedQty || 0)} units</strong></div>
        </div>
      </div>
      <div class="border border-rose-200/80 rounded-2xl bg-slate-900/5 p-2.5 text-center">
        <img src="${photo.dataUrl}" alt="Damage evidence" class="max-h-[50vh] max-w-full mx-auto rounded-xl shadow-md border border-slate-200 object-contain">
      </div>
      <div class="pt-1 flex items-center justify-center gap-2 pb-2">
        <a href="${photo.dataUrl}" download="${photo.name || 'damage_evidence.jpg'}" class="btn-gradient-primary px-4 py-2.5 text-white font-bold text-xs rounded-xl shadow-xs transition inline-flex items-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          <span>Download Evidence Photo</span>
        </a>
      </div>
    </div>
  `;
  openModal('invoicePreviewModal');
  const scrollContainer = document.getElementById('invoicePreviewContent');
  if (scrollContainer) scrollContainer.scrollTop = 0;
}

function quickMatchReceive() {
  if (!currentReceiveShipmentId) return;
  const s = state.shipments.find(item => item.id === currentReceiveShipmentId);
  if (!s) return;

  const boxInput = document.getElementById('inputReceivedBoxes');
  const qtyInput = document.getElementById('inputReceivedQty');
  const damagedInput = document.getElementById('inputDamagedQty');
  if (boxInput) boxInput.value = s.boxCount || 1;
  if (qtyInput) qtyInput.value = s.qtySent;
  if (damagedInput) damagedInput.value = 0;

  removeDamagePhoto();
  updateReceiveComparison();
  showToast(`Matched vendor claim: ${formatNumber(s.qtySent)} units in ${s.boxCount || 1} boxes.`);
}

function updateReceiveComparison() {
  if (!currentReceiveShipmentId) return;
  const s = state.shipments.find(item => item.id === currentReceiveShipmentId);
  if (!s) return;

  const boxVal = document.getElementById('inputReceivedBoxes')?.value;
  const goodVal = document.getElementById('inputReceivedQty')?.value;
  const damagedVal = document.getElementById('inputDamagedQty')?.value;
  const badge = document.getElementById('receiveComparisonBadge');
  const damageSection = document.getElementById('damageProofSection');
  if (!badge) return;

  const countedBoxes = Number(boxVal) || 0;
  const goodQty = Number(goodVal) || 0;
  const damagedQty = Number(damagedVal) || 0;
  const totalPhysical = goodQty + damagedQty;
  const claimedBoxes = s.boxCount || 1;
  const claimedQty = s.qtySent;

  // Toggle damage proof section
  if (damagedQty > 0) {
    damageSection?.classList.remove('hidden');
    const dropzone = document.getElementById('damagePhotoDropzone');
    if (!currentDamagePhoto && dropzone) {
      dropzone.classList.remove('border-emerald-400', 'bg-emerald-50/30');
      dropzone.classList.add('border-rose-300', 'bg-white');
    }
  } else {
    damageSection?.classList.add('hidden');
    const dropzone = document.getElementById('damagePhotoDropzone');
    const errorMsg = document.getElementById('damagePhotoErrorMsg');
    if (dropzone) {
      dropzone.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500', 'bg-rose-50/70', 'border-emerald-400', 'bg-emerald-50/30');
      dropzone.classList.add('border-rose-200', 'bg-white');
    }
    if (errorMsg) errorMsg.classList.add('hidden');
  }

  const boxDiff = countedBoxes - claimedBoxes;
  const qtyDiff = totalPhysical - claimedQty;

  if (damagedQty > 0) {
    if (totalPhysical === claimedQty) {
      badge.className = 'p-2.5 rounded-xl text-xs flex items-center justify-between font-medium bg-amber-50 border border-amber-200 text-amber-900';
      badge.innerHTML = `
        <span>⚠️ <strong>Total Count Matched (${formatNumber(totalPhysical)}):</strong> ${formatNumber(damagedQty)} damaged/rejected. Only ${formatNumber(goodQty)} units accepted.</span>
        <span class="font-bold text-[11px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">Partial Rejection</span>
      `;
    } else if (totalPhysical < claimedQty) {
      badge.className = 'p-2.5 rounded-xl text-xs flex items-center justify-between font-medium bg-rose-50 border border-rose-200 text-rose-900';
      badge.innerHTML = `
        <span>⚠️ <strong>Shortage & Damage:</strong> ${formatNumber(Math.abs(qtyDiff))} missing &bull; ${formatNumber(damagedQty)} damaged/rejected.</span>
        <span class="font-bold text-[11px] bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded-full">Discrepancy</span>
      `;
    } else {
      badge.className = 'p-2.5 rounded-xl text-xs flex items-center justify-between font-medium bg-purple-50 border border-purple-200 text-purple-900';
      badge.innerHTML = `
        <span>📦 <strong>Excess with Damage:</strong> +${qtyDiff} extra, with ${formatNumber(damagedQty)} damaged.</span>
        <span class="font-bold text-[11px] bg-purple-200/80 text-purple-900 px-2 py-0.5 rounded-full">Excess</span>
      `;
    }
  } else {
    if (boxDiff === 0 && qtyDiff === 0) {
      badge.className = 'p-2.5 rounded-xl text-xs flex items-center justify-between font-medium bg-emerald-50 border border-emerald-200 text-emerald-800';
      badge.innerHTML = `
        <span>✓ <strong>Full Match:</strong> All ${formatNumber(goodQty)} units across ${countedBoxes} boxes in good condition.</span>
        <span class="font-bold text-[11px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">No Shortage</span>
      `;
    } else if (qtyDiff < 0 || boxDiff < 0) {
      const parts = [];
      if (boxDiff < 0) parts.push(`${Math.abs(boxDiff)} box(es) short`);
      if (qtyDiff < 0) parts.push(`${formatNumber(Math.abs(qtyDiff))} unit(s) short`);
      if (boxDiff > 0) parts.push(`+${boxDiff} extra box(es)`);
      if (qtyDiff > 0) parts.push(`+${formatNumber(qtyDiff)} extra unit(s)`);

      badge.className = 'p-2.5 rounded-xl text-xs flex items-center justify-between font-medium bg-amber-50 border border-amber-200 text-amber-900';
      badge.innerHTML = `
        <span>⚠️ <strong>Shortage:</strong> ${parts.join(', ')}</span>
        <span class="font-bold text-[11px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">Discrepancy</span>
      `;
    } else {
      const parts = [];
      if (boxDiff > 0) parts.push(`+${boxDiff} extra box(es)`);
      if (qtyDiff > 0) parts.push(`+${formatNumber(qtyDiff)} extra unit(s)`);

      badge.className = 'p-2.5 rounded-xl text-xs flex items-center justify-between font-medium bg-blue-50 border border-blue-200 text-blue-900';
      badge.innerHTML = `
        <span>📦 <strong>Excess Received:</strong> ${parts.join(', ')}</span>
        <span class="font-bold text-[11px] bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-full">Excess</span>
      `;
    }
  }
}

function openReceiveModal(shipmentId) {
  currentReceiveShipmentId = shipmentId;
  const s = state.shipments.find(item => item.id === shipmentId);
  if (!s) return;
  const po = state.pos.find(p => p.poNumber === s.poNumber);

  document.getElementById('receiveShipmentId').value = shipmentId;
  document.getElementById('receiveModalTitle').textContent = `Verify Shipment #${s.id}`;
  document.getElementById('receiveModalPo').textContent = s.poNumber;
  document.getElementById('receiveModalVendor').textContent = po ? po.vendor : '-';
  const parsedItem = formatProductDisplay(s.description);
  document.getElementById('receiveModalItem').innerHTML = `<span class="font-bold text-blue-700 block">${escapeHtml(parsedItem.title)}</span>${parsedItem.specs ? `<span class="text-[10px] text-slate-500 font-mono block mt-0.5">${escapeHtml(parsedItem.specs)}</span>` : ''}`;
  document.getElementById('receiveModalClaimed').textContent = `${formatNumber(s.qtySent)} units in ${s.boxCount || 1} box(es) (Invoice #${s.truckLR})`;

  // Gatekeeper verification fields: prefill with claimed or previously verified
  const boxInput = document.getElementById('inputReceivedBoxes');
  const qtyInput = document.getElementById('inputReceivedQty');
  const damagedInput = document.getElementById('inputDamagedQty');
  const defectSelect = document.getElementById('selectDefectReason');

  if (boxInput) {
    boxInput.value = s.receivedBoxes !== null && s.receivedBoxes !== undefined ? s.receivedBoxes : (s.boxCount || 1);
  }
  if (qtyInput) {
    qtyInput.value = s.receivedQty !== null && s.receivedQty !== undefined ? s.receivedQty : s.qtySent;
  }
  if (damagedInput) {
    damagedInput.value = s.damagedQty !== null && s.damagedQty !== undefined ? s.damagedQty : 0;
  }
  if (defectSelect && s.defectReason) {
    defectSelect.value = s.defectReason;
  }

  // Restore damage photo thumbnail if exists
  currentDamagePhoto = s.damagePhoto || null;
  const thumb = document.getElementById('damagePhotoThumb');
  const container = document.getElementById('damagePhotoThumbContainer');
  const fileInp = document.getElementById('inputDamagePhotoFile');
  if (fileInp) fileInp.value = '';
  if (currentDamagePhoto && thumb && container) {
    thumb.src = currentDamagePhoto.dataUrl;
    container.classList.remove('hidden');
  } else if (container) {
    container.classList.add('hidden');
  }

  // Reset damage photo UI validation states
  const dropzone = document.getElementById('damagePhotoDropzone');
  const errorMsg = document.getElementById('damagePhotoErrorMsg');
  if (dropzone) {
    dropzone.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500', 'bg-rose-50/70');
    if (currentDamagePhoto) {
      dropzone.classList.add('border-emerald-400', 'bg-emerald-50/30');
      dropzone.classList.remove('border-rose-200', 'bg-white');
    } else {
      dropzone.classList.remove('border-emerald-400', 'bg-emerald-50/30');
      dropzone.classList.add('border-rose-200', 'bg-white');
    }
  }
  if (errorMsg) errorMsg.classList.add('hidden');

  // Update comparison status badge
  updateReceiveComparison();

  // Invoice display in receiving modal
  const invoiceBox = document.getElementById('receiveModalInvoiceSection');
  if (s.invoice) {
    invoiceBox.classList.remove('hidden');
    document.getElementById('receiveModalInvoiceName').textContent = s.invoice.name;
    document.getElementById('receiveModalInvoiceSize').textContent = s.invoice.size;
  } else {
    invoiceBox.classList.add('hidden');
  }

  openModal('receiveModal');
}

async function handleReceiveSubmit(e) {
  e.preventDefault();
  const sId = document.getElementById('receiveShipmentId').value;
  const receivedGood = Number(document.getElementById('inputReceivedQty').value);
  const damaged = Number(document.getElementById('inputDamagedQty')?.value || 0);
  const receivedBoxes = Number(document.getElementById('inputReceivedBoxes')?.value || 1);
  const defectReason = damaged > 0 ? document.getElementById('selectDefectReason')?.value : null;

  const s = state.shipments.find(item => item.id === sId);
  if (!s) return;

  if (isNaN(receivedGood) || receivedGood < 0) {
    showToast('Good units accepted cannot be negative!', true);
    return;
  }
  if (isNaN(damaged) || damaged < 0) {
    showToast('Damaged units cannot be negative!', true);
    return;
  }
  if (isNaN(receivedBoxes) || receivedBoxes < 1) {
    showToast('Boxes received count must be at least 1 box!', true);
    return;
  }

  // Mandatory damage photo validation: If damaged units are entered, image proof is mandatory
  if (damaged > 0 && (!currentDamagePhoto || !currentDamagePhoto.dataUrl)) {
    const dropzone = document.getElementById('damagePhotoDropzone');
    const errorMsg = document.getElementById('damagePhotoErrorMsg');
    const fileInp = document.getElementById('inputDamagePhotoFile');

    if (dropzone) {
      dropzone.classList.add('ring-2', 'ring-rose-500', 'border-rose-500', 'bg-rose-50/70');
      dropzone.classList.remove('border-rose-200', 'bg-white', 'border-emerald-400', 'bg-emerald-50/30');
    }
    if (errorMsg) {
      errorMsg.classList.remove('hidden');
    }
    if (fileInp) {
      fileInp.focus();
    }
    showToast('⚠️ Mandatory: Photo proof of the damaged piece/carton is required!', true);
    return;
  }

  // Upload damage proof photo to Supabase storage if available
  let damageCloudUrl = null;
  if (supabaseClient && currentDamagePhoto && currentDamagePhoto.dataUrl && !currentDamagePhoto.dataUrl.startsWith('http')) {
    try {
      damageCloudUrl = await uploadInvoiceToSupabase(currentDamagePhoto);
    } catch (err) {
      console.warn('Supabase damage photo upload notice:', err);
    }
  }

  s.receivedQty = receivedGood;
  s.damagedQty = damaged;
  s.receivedBoxes = receivedBoxes;
  s.defectReason = defectReason;
  s.damagePhoto = currentDamagePhoto ? {
    ...currentDamagePhoto,
    dataUrl: damageCloudUrl || currentDamagePhoto.dataUrl
  } : null;

  saveState();
  closeModal('receiveModal');
  showToast(`Verified ${formatNumber(receivedGood)} good units & ${formatNumber(damaged)} damaged across ${receivedBoxes} boxes!`);

  // Cloud sync to Supabase
  if (supabaseClient) {
    const updatePayload = { 
      received_qty: receivedGood,
      received_boxes: receivedBoxes,
      damaged_qty: damaged,
      defect_reason: defectReason
    };
    if (damageCloudUrl) {
      updatePayload.damage_photo_url = damageCloudUrl;
    }

    supabaseClient.from('shipments').update(updatePayload).eq('id', sId)
      .then(({ error }) => {
        if (error) {
          console.warn('Initial receive update notice:', error.message);
          // Fallback if damaged_qty or defect_reason columns not in Supabase schema
          const fallbackPayload = { 
            received_qty: receivedGood,
            received_boxes: receivedBoxes
          };
          supabaseClient.from('shipments').update(fallbackPayload).eq('id', sId).then(({ error: err2 }) => {
            if (err2) {
              supabaseClient.from('shipments').update({ received_qty: receivedGood }).eq('id', sId).then(() => fetchCloudState());
            } else {
              fetchCloudState();
            }
          });
        } else {
          console.log('✓ Gate receiving with damage record and photo synced to Supabase');
          fetchCloudState();
        }
      });
  }
}

// ==========================================
// Invoice Preview & Download Viewer
// ==========================================
function viewInvoice(shipmentId) {
  const s = state.shipments.find(item => item.id === shipmentId);
  if (!s || !s.invoice) {
    showToast('No invoice file attached to this dispatch record.', true);
    return;
  }

  const invoice = s.invoice;
  window.currentActiveInvoiceUrl = invoice.dataUrl;
  document.getElementById('invoicePreviewTitle').textContent = `Attached Invoice for ${s.id} (Invoice #${s.truckLR})`;
  document.getElementById('invoicePreviewName').textContent = invoice.name;
  document.getElementById('invoicePreviewSize').textContent = invoice.size;

  const contentDiv = document.getElementById('invoicePreviewContent');
  if (invoice.type.startsWith('image/')) {
    contentDiv.innerHTML = `
      <div class="text-center w-full">
        <img src="${invoice.dataUrl}" alt="Invoice preview" class="max-h-[60vh] max-w-full mx-auto rounded-xl shadow-md border border-slate-200 object-contain">
        <div class="mt-4">
          <a href="${invoice.dataUrl}" download="${invoice.name}" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition inline-flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <span>Download Invoice Image</span>
          </a>
        </div>
      </div>
    `;
  } else if (invoice.type.includes('pdf')) {
    contentDiv.innerHTML = `
      <div class="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 max-w-md w-full space-y-4">
        <div class="w-16 h-16 bg-red-100 text-red-600 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold shadow-xs">
          📄
        </div>
        <div>
          <h4 class="font-bold text-slate-900 text-sm">${invoice.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">Adobe Acrobat PDF Document • ${invoice.size}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <a href="${invoice.dataUrl}" download="${invoice.name}" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <span>Download PDF</span>
          </a>
          <button type="button" onclick="openPdfInNewTab()" class="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center justify-center gap-1.5">
            <span>Open in Tab ↗</span>
          </button>
        </div>
      </div>
    `;
  } else {
    contentDiv.innerHTML = `
      <div class="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <span class="text-4xl">📎</span>
        <h4 class="font-bold text-slate-900 text-sm">${invoice.name}</h4>
        <a href="${invoice.dataUrl}" download="${invoice.name}" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition inline-block">
          Download Attached File
        </a>
      </div>
    `;
  }

  openModal('invoicePreviewModal');
}

function openPdfInNewTab(dataUrl) {
  const targetUrl = dataUrl || window.currentActiveInvoiceUrl;
  if (!targetUrl) return;

  if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  try {
    const win = window.open();
    if (win && !win.closed) {
      win.document.write('<iframe src="' + targetUrl + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    } else {
      const a = document.createElement('a');
      a.href = targetUrl;
      a.target = '_blank';
      a.click();
    }
  } catch (err) {
    const a = document.createElement('a');
    a.href = targetUrl;
    a.target = '_blank';
    a.click();
  }
}

// ==========================================
// Vendor Management Workflow
// ==========================================
async function handleNewVendorSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('newVendorName').value.trim();
  const email = document.getElementById('newVendorEmail').value.trim().toLowerCase();
  const code = document.getElementById('newVendorCode').value.trim().toUpperCase();
  const rawPass = document.getElementById('newVendorPassword').value;

  if (!name || !email || !code) {
    showToast('Please fill in all vendor fields!', true);
    return;
  }

  if (!rawPass || rawPass.length < 4) {
    showToast('Please provide a password of at least 4 characters!', true);
    return;
  }

  if (state.vendors.some(v => v.name.toLowerCase() === name.toLowerCase())) {
    showToast(`Vendor name "${name}" already exists!`, true);
    return;
  }
  if (state.vendors.some(v => v.code === code)) {
    showToast(`Vendor code "${code}" is already in use!`, true);
    return;
  }
  if (state.vendors.some(v => v.email.toLowerCase() === email)) {
    showToast('Vendor login email is already registered!', true);
    return;
  }

  const randomSalt = 's4lt_v_' + Math.random().toString(36).substring(2, 12);
  const passHash = await hashPassword(randomSalt, rawPass);

  if (!state.authVault.users) state.authVault.users = [];
  state.authVault.users.push({
    email: email,
    role: 'vendor',
    vendorName: name,
    vendorCode: code,
    salt: randomSalt,
    password_hash: passHash
  });
  state.authVault.updated_at = new Date().toISOString();

  state.vendors.push({
    id: 'v-' + (state.vendors.length + 1),
    name: name,
    email: email,
    code: code
  });

  document.getElementById('newVendorName').value = '';
  document.getElementById('newVendorEmail').value = '';
  document.getElementById('newVendorCode').value = '';
  document.getElementById('newVendorPassword').value = '';

  saveState();
  showToast(`Vendor ${name} created and authorized successfully!`);

  // Cloud sync to Supabase
  if (supabaseClient) {
    supabaseClient.from('vendors').insert([{
      name: name,
      code: code,
      email: email,
      salt: randomSalt,
      password_hash: passHash
    }]).then(({ error }) => {
      if (error) {
        console.warn('Initial vendor insert notice:', error.message);
        // Fallback without credentials columns
        supabaseClient.from('vendors').insert([{ name: name, code: code, email: email }])
          .then(({ error: err2 }) => {
            if (err2) {
              console.error('Supabase vendor insert failed:', err2.message);
              showToast('Cloud database notice: ' + err2.message, true);
            } else {
              console.log('✓ Vendor synced to Supabase successfully');
              fetchCloudState();
            }
          });
      } else {
        console.log('✓ Vendor synced to Supabase successfully');
        fetchCloudState();
      }
    });
  } else {
    console.warn('Supabase client is not connected');
    showToast('Notice: Saved locally (Cloud database not connected)', true);
  }
}

function deleteVendor(vendorId) {
  const v = state.vendors.find(item => item.id === vendorId);
  if (!v) return;

  const hasOrders = state.pos.some(p => p.vendor === v.name);
  if (hasOrders) {
    if (!confirm(`Warning: Vendor ${v.name} has active orders recorded in the system. Are you sure you want to remove this vendor?`)) {
      return;
    }
  } else {
    if (!confirm(`Are you sure you want to remove ${v.name}?`)) return;
  }

  state.vendors = state.vendors.filter(item => item.id !== vendorId);
  if (state.authVault && state.authVault.users) {
    state.authVault.users = state.authVault.users.filter(u => u.email.toLowerCase() !== v.email.toLowerCase());
  }
  saveState();
  showToast(`Vendor ${v.name} removed from registry.`);

  // Cloud sync to Supabase
  if (supabaseClient) {
    supabaseClient.from('vendors').delete().eq('email', v.email)
      .then(({ error }) => {
        if (error) console.warn('Supabase vendor delete notice:', error.message);
        fetchCloudState();
      });
  }
}

// ==========================================
// Change User & Vendor Password Controller
// ==========================================
function openChangePasswordModal(email, name, role) {
  if (!email) {
    if (state.currentUser) {
      email = state.currentUser.email;
      name = state.currentUser.name || state.currentUser.vendorName || email;
      role = state.currentUser.role;
    } else {
      showToast('No user specified.', true);
      return;
    }
  }
  const modal = document.getElementById('changePasswordModal');
  if (!modal) return;
  
  const emailInput = document.getElementById('changePassTargetEmail');
  const roleInput = document.getElementById('changePassTargetRole');
  const nameDisplay = document.getElementById('changePassTargetName');
  const emailDisplay = document.getElementById('changePassTargetEmailDisplay');
  const roleBadge = document.getElementById('changePassTargetRoleBadge');
  const titleEl = document.getElementById('changePasswordModalTitle');

  if (emailInput) emailInput.value = email;
  if (roleInput) roleInput.value = role || 'vendor';
  if (nameDisplay) nameDisplay.textContent = name || email;
  if (emailDisplay) emailDisplay.textContent = email;
  if (titleEl) {
    titleEl.textContent = (state.currentUser && state.currentUser.email.toLowerCase() === email.toLowerCase())
      ? 'Update Your Password'
      : `Update Password for ${name || email}`;
  }

  if (roleBadge) {
    roleBadge.textContent = (role || 'vendor').toUpperCase();
    if (role === 'admin') roleBadge.className = 'px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono uppercase bg-indigo-100 text-indigo-800';
    else if (role === 'gatekeeper') roleBadge.className = 'px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono uppercase bg-emerald-100 text-emerald-800';
    else roleBadge.className = 'px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono uppercase bg-blue-100 text-blue-800';
  }

  const pass1 = document.getElementById('changePassNewValue');
  const pass2 = document.getElementById('changePassConfirmValue');
  if (pass1) { pass1.value = ''; pass1.type = 'password'; }
  if (pass2) { pass2.value = ''; pass2.type = 'password'; }

  const fb = document.getElementById('changePassFeedback');
  if (fb) {
    fb.classList.add('hidden');
    fb.innerHTML = '';
  }

  modal.classList.remove('hidden');
}

function closeChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) modal.classList.add('hidden');
}

function generateRandomNewPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let pass = '';
  for (let i = 0; i < 12; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const input1 = document.getElementById('changePassNewValue');
  const input2 = document.getElementById('changePassConfirmValue');
  if (input1) {
    input1.value = pass;
    input1.type = 'text';
  }
  if (input2) {
    input2.value = pass;
    input2.type = 'text';
  }
  showToast('Generated strong password: ' + pass);
}

function toggleChangePassVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (btn) btn.textContent = 'Hide';
  } else {
    input.type = 'password';
    if (btn) btn.textContent = 'Show';
  }
}

async function handleChangePasswordSubmit(e) {
  if (e) e.preventDefault();
  const email = (document.getElementById('changePassTargetEmail')?.value || '').trim().toLowerCase();
  const role = document.getElementById('changePassTargetRole')?.value || 'vendor';
  const newPass = document.getElementById('changePassNewValue')?.value || '';
  const confirmPass = document.getElementById('changePassConfirmValue')?.value || '';
  const fb = document.getElementById('changePassFeedback');
  const submitBtn = document.getElementById('btnSubmitChangePass');

  const showFb = (msg, isError = true) => {
    if (!fb) return;
    fb.classList.remove('hidden');
    if (isError) {
      fb.className = "text-xs p-3 rounded-xl border font-semibold flex items-center gap-2 bg-rose-50 text-rose-800 border-rose-200";
      fb.innerHTML = `<svg class="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><span>${msg}</span>`;
    } else {
      fb.className = "text-xs p-3 rounded-xl border font-semibold flex items-center gap-2 bg-emerald-50 text-emerald-800 border-emerald-200";
      fb.innerHTML = `<svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>${msg}</span>`;
    }
  };

  if (!newPass || newPass.length < 4) {
    showFb('Password must be at least 4 characters long.');
    return;
  }
  if (newPass !== confirmPass) {
    showFb('Passwords do not match. Please re-enter.');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Updating...</span>';
  }

  try {
    const randomSalt = 's4lt_v_' + Math.random().toString(36).substring(2, 12);
    const passHash = await hashPassword(randomSalt, newPass);

    if (!state.authVault) state.authVault = { users: [] };
    if (!Array.isArray(state.authVault.users)) state.authVault.users = [];

    let vaultUser = state.authVault.users.find(u => u.email.toLowerCase() === email);
    if (vaultUser) {
      vaultUser.salt = randomSalt;
      vaultUser.password_hash = passHash;
    } else {
      vaultUser = {
        email: email,
        role: role,
        name: document.getElementById('changePassTargetName')?.textContent || email,
        salt: randomSalt,
        password_hash: passHash
      };
      state.authVault.users.push(vaultUser);
    }
    state.authVault.updated_at = new Date().toISOString();
    localStorage.setItem('labeltrack_auth_vault', JSON.stringify(state.authVault));

    // Cloud sync to Supabase for vendors
    if (supabaseClient) {
      const { error } = await supabaseClient
        .from('vendors')
        .update({ salt: randomSalt, password_hash: passHash })
        .eq('email', email);
      if (error) {
        console.warn('Supabase vendor password update notice:', error.message);
      } else {
        console.log('✓ Password synced to Supabase Cloud DB for', email);
      }
    }

    showToast(`Password for ${email} updated and encrypted successfully!`);
    closeChangePasswordModal();
  } catch (err) {
    console.error('Password update error:', err);
    showFb('Error updating password: ' + err.message);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Update Password</span>';
    }
  }
}

// ==========================================
// Filter & Main UI Rendering
// ==========================================
function setFilter(filter) {
  state.currentFilter = filter;
  const isAll = filter === 'all';
  const isPending = filter === 'pending';
  const isInProd = filter === 'in_production';
  const isInStock = filter === 'in_stock';
  const isComp = filter === 'completed';

  const btnAll = document.getElementById('filterBtnAll');
  const btnPending = document.getElementById('filterBtnPending');
  const btnInProd = document.getElementById('filterBtnInProd');
  const btnInStock = document.getElementById('filterBtnInStock');
  const btnCmp = document.getElementById('filterBtnCompleted');

  const activeCls = "nav-tab-btn nav-tab-btn-active-primary px-3.5 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer";
  const inactiveCls = "nav-tab-btn px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer";

  if (btnAll) btnAll.className = isAll ? activeCls : inactiveCls;
  if (btnPending) btnPending.className = isPending ? activeCls : inactiveCls;
  if (btnInProd) btnInProd.className = isInProd ? activeCls : inactiveCls;
  if (btnInStock) btnInStock.className = isInStock ? activeCls : inactiveCls;
  if (btnCmp) btnCmp.className = isComp ? activeCls : inactiveCls;

  render();
}


function setShipmentFilter(filter) {
  state.shipmentFilter = filter;
  render();
}

function setGateFilter(filter) {
  state.gateFilter = filter;
  render();
}

function setCategoryFilter(cat) {
  state.categoryFilter = cat;
  const cats = ['all', 'labels', 'tags', 'ribbons', 'cards'];
  cats.forEach(c => {
    const btns = document.querySelectorAll(`.cat-filter-btn-${c}`);
    btns.forEach(btn => {
      if (c === cat) {
        let activeClass = "cat-pill-all-active";
        if (c === 'labels') activeClass = "cat-pill-labels-active";
        else if (c === 'tags') activeClass = "cat-pill-tags-active";
        else if (c === 'ribbons') activeClass = "cat-pill-ribbons-active";
        else if (c === 'cards') activeClass = "cat-pill-cards-active";
        btn.className = `cat-filter-btn-${c} px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${activeClass}`;
      } else {
        let inactiveClass = "border border-slate-200/90 text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900";
        if (c === 'labels') inactiveClass = "border border-blue-200/80 text-blue-700 bg-white hover:bg-blue-50/70";
        else if (c === 'tags') inactiveClass = "border border-emerald-200/80 text-emerald-700 bg-white hover:bg-emerald-50/70";
        else if (c === 'ribbons') inactiveClass = "border border-purple-200/80 text-purple-700 bg-white hover:bg-purple-50/70";
        else if (c === 'cards') inactiveClass = "border border-amber-200/80 text-amber-700 bg-white hover:bg-amber-50/70";
        btn.className = `cat-filter-btn-${c} px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${inactiveClass}`;
      }
    });
  });
  render();
}

function renderVendorScorecards() {
  const container = document.getElementById('vendorScorecardsList');
  if (!container) return;

  const vendors = state.vendors || [];
  let fleetDispatched = 0;
  let fleetReceivedGood = 0;
  let fleetShortages = 0;
  let fleetDamaged = 0;

  const vendorStats = vendors.map(v => {
    const vendorPoNumbers = state.pos.filter(p => p.vendor === v.name).map(p => p.poNumber);
    const shipments = state.shipments.filter(s => vendorPoNumbers.includes(s.poNumber));
    
    let totalSent = 0;
    let verifiedSent = 0;
    let goodReceived = 0;
    let damagedUnits = 0;
    let shortageIncidents = 0;
    let damageIncidents = 0;
    let verifiedCount = 0;

    shipments.forEach(s => {
      totalSent += Number(s.qtySent || 0);
      const hasCount = s.receivedQty !== null && s.receivedQty !== undefined;
      if (hasCount) {
        verifiedCount++;
        verifiedSent += Number(s.qtySent || 0);
        goodReceived += Number(s.receivedQty || 0);
        const damaged = Number(s.damagedQty || 0);
        damagedUnits += damaged;
        if (damaged > 0) damageIncidents++;
        const variance = Number(s.receivedQty) - Number(s.qtySent);
        if (variance < 0) shortageIncidents++;
      }
    });

    fleetDispatched += verifiedSent;
    fleetReceivedGood += goodReceived;
    fleetShortages += shortageIncidents;
    fleetDamaged += damagedUnits;

    let accuracyPct = verifiedSent > 0 
      ? Math.round((goodReceived / verifiedSent) * 100) 
      : 100;
    if (accuracyPct > 100) accuracyPct = 100;

    let grade = 'Grade A';
    let gradeBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    let gradeLabel = 'Premier Quality';
    if (verifiedCount === 0) {
      grade = 'Unrated';
      gradeBadge = 'bg-slate-50 text-slate-600 border-slate-200';
      gradeLabel = 'No Audits Yet';
    } else if (accuracyPct < 90 || shortageIncidents >= 3) {
      grade = 'Grade C';
      gradeBadge = 'bg-rose-50 text-rose-700 border-rose-200';
      gradeLabel = 'High Shortage Risk';
    } else if (accuracyPct < 97 || shortageIncidents > 0 || damagedUnits > 0) {
      grade = 'Grade B';
      gradeBadge = 'bg-blue-50 text-blue-700 border-blue-200';
      gradeLabel = 'Standard Compliance';
    }

    return {
      vendor: v,
      shipmentsCount: shipments.length,
      verifiedCount,
      totalSent,
      goodReceived,
      damagedUnits,
      shortageIncidents,
      damageIncidents,
      accuracyPct,
      grade,
      gradeBadge,
      gradeLabel
    };
  });

  const activeSuppliersEl = document.getElementById('scorecardActiveSuppliers');
  const fleetAccuracyEl = document.getElementById('scorecardFleetAccuracy');
  const totalShortagesEl = document.getElementById('scorecardTotalShortages');
  const totalDamagedEl = document.getElementById('scorecardTotalDamaged');

  const activeSuppliersElTab = document.getElementById('scorecardActiveSuppliersTab');
  const fleetAccuracyElTab = document.getElementById('scorecardFleetAccuracyTab');
  const totalShortagesElTab = document.getElementById('scorecardTotalShortagesTab');
  const totalDamagedElTab = document.getElementById('scorecardTotalDamagedTab');

  const fleetAcc = fleetDispatched > 0 ? Math.round((fleetReceivedGood / fleetDispatched) * 100) : 100;
  const fleetAccStr = `${Math.min(100, fleetAcc)}%`;
  const fleetDamStr = `${formatNumber(fleetDamaged)} units`;

  if (activeSuppliersEl) activeSuppliersEl.textContent = vendors.length;
  if (fleetAccuracyEl) fleetAccuracyEl.textContent = fleetAccStr;
  if (totalShortagesEl) totalShortagesEl.textContent = fleetShortages;
  if (totalDamagedEl) totalDamagedEl.textContent = fleetDamStr;

  if (activeSuppliersElTab) activeSuppliersElTab.textContent = vendors.length;
  if (fleetAccuracyElTab) fleetAccuracyElTab.textContent = fleetAccStr;
  if (totalShortagesElTab) totalShortagesElTab.textContent = fleetShortages;
  if (totalDamagedElTab) totalDamagedElTab.textContent = fleetDamStr;

  const tabContainer = document.getElementById('vendorScorecardsListTab');

  if (vendorStats.length === 0) {
    const emptyHtml = `<div class="col-span-2 text-center py-8 text-slate-400 text-xs">No registered suppliers found.</div>`;
    if (container) container.innerHTML = emptyHtml;
    if (tabContainer) tabContainer.innerHTML = emptyHtml;
    return;
  }

  const scorecardsHtml = vendorStats.map(stat => {
    return `
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3.5 shadow-2xs hover:shadow-xs transition">
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">${escapeHtml(stat.vendor.code)}</span>
              <h4 class="font-bold text-slate-900 text-sm">${escapeHtml(stat.vendor.name)}</h4>
            </div>
            <p class="text-[11px] text-slate-400 font-mono mt-0.5">${escapeHtml(stat.vendor.email)}</p>
          </div>
          <span class="px-2.5 py-1 rounded-xl text-xs font-bold border ${stat.gradeBadge}">
            ${stat.grade} &bull; ${stat.gradeLabel}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Fulfillment</span>
            <span class="text-base font-black ${stat.accuracyPct >= 97 ? 'text-emerald-600' : (stat.accuracyPct >= 90 ? 'text-blue-600' : 'text-rose-600')} font-mono">
              ${stat.verifiedCount > 0 ? stat.accuracyPct + '%' : 'N/A'}
            </span>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Shortages</span>
            <span class="text-base font-black ${stat.shortageIncidents > 0 ? 'text-rose-600' : 'text-slate-800'} font-mono">
              ${stat.shortageIncidents}
            </span>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Damaged</span>
            <span class="text-base font-black ${stat.damagedUnits > 0 ? 'text-amber-600' : 'text-slate-800'} font-mono">
              ${formatNumber(stat.damagedUnits)}
            </span>
          </div>
        </div>

        <div class="space-y-1">
          <div class="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>Accuracy Match Rate</span>
            <span>${stat.verifiedCount > 0 ? `${formatNumber(stat.goodReceived)} / ${formatNumber(stat.totalSent)} units` : 'No shipments verified'}</span>
          </div>
          <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full ${stat.accuracyPct >= 97 ? 'bg-emerald-500' : (stat.accuracyPct >= 90 ? 'bg-blue-600' : 'bg-rose-500')} rounded-full transition-all" style="width: ${stat.verifiedCount > 0 ? stat.accuracyPct : 0}%"></div>
          </div>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
          <span>${stat.shipmentsCount} total dispatches (${stat.verifiedCount} audited)</span>
          <span class="font-semibold text-slate-600">${stat.damageIncidents} damage claim(s)</span>
        </div>
      </div>
    `;
  }).join('');

  if (container) container.innerHTML = scorecardsHtml;
  if (tabContainer) tabContainer.innerHTML = scorecardsHtml;
}

function render() {
  if (!state.isLoggedIn) return;

  updateAnnualColorUI();

  const user = state.currentUser;
  const isAdmin = user.role === 'admin';
  const isGatekeeper = user.role === 'gatekeeper';
  const isVendor = !isAdmin && !isGatekeeper;
  const activeVendorName = isVendor ? user.vendorName : (state.vendors[0]?.name || '');

  const vendorSection = document.getElementById('vendorSection');
  const adminSection = document.getElementById('adminSection');
  const gatekeeperSection = document.getElementById('gatekeeperSection');

  // Update Top Navigation
  if (isAdmin) {
    document.getElementById('navSubtitle').textContent = 'Operations Command';
    document.getElementById('navUserName').textContent = 'Internal Operations Team';
    document.getElementById('navUserRole').innerHTML = `<span class="badge-pill badge-indigo">👑 Ops Admin</span>`;
    document.getElementById('navUserAvatar').textContent = 'OP';
    vendorSection?.classList.add('hidden');
    adminSection?.classList.remove('hidden');
    gatekeeperSection?.classList.add('hidden');
  } else if (isGatekeeper) {
    document.getElementById('navSubtitle').textContent = 'Gate Inward Command';
    document.getElementById('navUserName').textContent = user.name || 'Gate Security Controller';
    document.getElementById('navUserRole').innerHTML = `<span class="badge-pill badge-emerald">🛂 Gate Security</span>`;
    document.getElementById('navUserAvatar').textContent = 'GK';
    vendorSection?.classList.add('hidden');
    adminSection?.classList.add('hidden');
    gatekeeperSection?.classList.remove('hidden');
  } else {
    document.getElementById('navSubtitle').textContent = 'Supplier Portal';
    document.getElementById('navUserName').textContent = user.vendorName;
    document.getElementById('navUserRole').innerHTML = `Vendor ID: <span class="font-mono text-slate-700 font-semibold">${user.vendorCode || 'VEN-01'}</span>`;
    document.getElementById('navUserAvatar').textContent = (user.vendorName || 'VP').substring(0, 2).toUpperCase();
    vendorSection?.classList.remove('hidden');
    adminSection?.classList.add('hidden');
    gatekeeperSection?.classList.add('hidden');
    const welcomeTitle = document.getElementById('vendorWelcomeTitle');
    if (welcomeTitle) welcomeTitle.textContent = `Welcome, ${activeVendorName}`;
  }

  // Dropdown Sync
  const newPoVendor = document.getElementById('newPoVendor');
  const vCountBadge = document.getElementById('vendorCountBadge');
  if (vCountBadge) vCountBadge.textContent = state.vendors.length;

  const vendorOptionsHtml = state.vendors.map(v => 
    `<option value="${escapeHtml(v.name)}">${escapeHtml(v.name)} (${escapeHtml(v.code)})</option>`
  ).join('');

  newPoVendor.innerHTML = vendorOptionsHtml;

  // Render Vendors in Supplier Directory Tab Table
  const vendorRowsHtml = state.vendors.map(v => {
    const orderCount = state.pos.filter(p => p.vendor === v.name).length;
    return `
      <tr class="hover:bg-slate-50/80 transition">
        <td class="p-3 font-mono font-bold text-blue-600 text-xs">${escapeHtml(v.code)}</td>
        <td class="p-3 font-semibold text-slate-900">${escapeHtml(v.name)}</td>
        <td class="p-3 font-mono text-slate-600 text-[11px]">${escapeHtml(v.email)}</td>
        <td class="p-3 text-center font-mono font-bold text-slate-800">${orderCount}</td>
        <td class="p-3 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button onclick="openChangePasswordModal('${escapeHtml(v.email)}', '${escapeHtml(v.name)}', 'vendor')" class="px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 border border-indigo-200/80 rounded-lg transition inline-flex items-center gap-1 shadow-2xs cursor-pointer">
              <span>🔑 Password</span>
            </button>
            <button onclick="deleteVendor('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200/70 rounded-lg transition inline-flex items-center gap-1 shadow-2xs cursor-pointer">
              <span>Remove</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  const tabVendorBody = document.getElementById('vendorListTableBodyTab');
  if (tabVendorBody) tabVendorBody.innerHTML = vendorRowsHtml;
  const modalVendorBody = document.getElementById('vendorListTableBody');
  if (modalVendorBody) modalVendorBody.innerHTML = vendorRowsHtml;

  // 1. Render Vendor Orders
  const vendorContainer = document.getElementById('vendorPoContainer');
  let vendorPOs = state.pos.filter(p => p.vendor === activeVendorName);

  let vInProdCount = 0;
  let vInStockCount = 0;
  let vPendingCount = 0;
  let vCompletedCount = 0;
  let vPendingUnits = 0;
  let vShippedUnits = 0;

  vendorPOs.forEach(po => {
    const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(po.poNumber);
    vPendingUnits += totalRemaining;
    vShippedUnits += totalShipped;
    const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;
    if (isCompleted) {
      vCompletedCount++;
    } else {
      const pStatus = po.productionStatus || 'pending';
      if (pStatus === 'pending') {
        vPendingCount++;
      } else if (pStatus === 'in_stock' || pStatus === 'ready_to_ship') {
        vInStockCount++;
      } else {
        vInProdCount++;
      }
    }
  });

  const activeCountTotal = vInProdCount + vInStockCount + vPendingCount;
  const vStatAct = document.getElementById('vendorStatActiveCount');
  const vStatCmp = document.getElementById('vendorStatCompletedCount');
  const vStatPend = document.getElementById('vendorStatPendingUnits');
  const vStatShip = document.getElementById('vendorStatShippedUnits');

  if (vStatAct) vStatAct.textContent = `${activeCountTotal} Orders`;
  if (vStatCmp) vStatCmp.textContent = `${vCompletedCount} Orders`;
  if (vStatPend) vStatPend.textContent = formatNumber(vPendingUnits);
  if (vStatShip) vStatShip.textContent = formatNumber(vShippedUnits);

  const cAll = document.getElementById('countAll');
  const cPending = document.getElementById('countPending');
  const cInProd = document.getElementById('countInProd');
  const cInStock = document.getElementById('countInStock');
  const cComp = document.getElementById('countCompleted');

  if (cAll) cAll.textContent = vendorPOs.length;
  if (cPending) cPending.textContent = vPendingCount;
  if (cInProd) cInProd.textContent = vInProdCount;
  if (cInStock) cInStock.textContent = vInStockCount;
  if (cComp) cComp.textContent = vCompletedCount;

  // Search Filter
  const searchVal = (document.getElementById('searchInput') ? document.getElementById('searchInput').value.trim().toLowerCase() : '');
  if (searchVal) {
    vendorPOs = vendorPOs.filter(p => 
      p.poNumber.toLowerCase().includes(searchVal) ||
      (p.vendor && p.vendor.toLowerCase().includes(searchVal)) ||
      p.items.some(i => 
        (i.description && i.description.toLowerCase().includes(searchVal)) ||
        (i.category && i.category.toLowerCase().includes(searchVal)) ||
        (i.model && i.model.toLowerCase().includes(searchVal)) ||
        (i.sku && i.sku.toLowerCase().includes(searchVal))
      )
    );
  }

  // Category Filter
  if (state.categoryFilter && state.categoryFilter !== 'all') {
    vendorPOs = vendorPOs.filter(p => 
      (p.items || []).some(i => {
        const catInfo = getItemCategoryInfo(i);
        return catInfo.id === state.categoryFilter;
      })
    );
  }

  // Tab Filter
  if (state.currentFilter === 'pending') {
    vendorPOs = vendorPOs.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;
      const pStatus = p.productionStatus || 'pending';
      return !isCompleted && pStatus === 'pending';
    });
  } else if (state.currentFilter === 'in_production') {
    vendorPOs = vendorPOs.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;
      const pStatus = p.productionStatus || '';
      return !isCompleted && (pStatus === 'in_production' || pStatus === 'packing');
    });
  } else if (state.currentFilter === 'in_stock') {
    vendorPOs = vendorPOs.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;
      const pStatus = p.productionStatus || '';
      return !isCompleted && (pStatus === 'in_stock' || pStatus === 'ready_to_ship');
    });
  } else if (state.currentFilter === 'completed') {
    vendorPOs = vendorPOs.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      return totalRemaining === 0 && totalShipped >= totalOrdered;
    });
  }

  if (vendorPOs.length === 0) {
    vendorContainer.innerHTML = `
      <div class="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-xs space-y-3">
        <div class="w-12 h-12 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center text-2xl">📋</div>
        <h3 class="text-sm font-bold text-slate-800">No Matching Orders Found</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">There are currently no orders allocated under this view matching your category and status filters.</p>
      </div>
    `;
  } else {
    vendorContainer.innerHTML = vendorPOs.map(po => {
      const { totalOrdered, totalShipped, totalRemaining, itemsMetrics, shipments } = getPoMetrics(po.poNumber);
      const pct = Math.min(100, Math.round((totalShipped / totalOrdered) * 100));
      const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;

      let badgeClass = "bg-amber-50 text-amber-700 border border-amber-200/80 font-bold";
      let badgeText = "Pending Dispatch";
      if (isCompleted) {
        badgeClass = "bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold";
        badgeText = "✓ 100% Fulfilled & Locked";
      } else if (totalShipped > 0) {
        badgeClass = "bg-blue-50 text-blue-700 border border-blue-200/80 font-bold";
        badgeText = "Partially Dispatched";
      }

      // SKU breakdown with Category and Model + Sample Proof Button
      const itemsHtml = itemsMetrics.map(item => {
        const itemPct = Math.min(100, Math.round((item.shipped / item.orderedQty) * 100));
        const isFulfilled = item.remaining === 0;
        const catInfo = getItemCategoryInfo(item);
        const parsed = formatProductDisplay(item.description);
        return `
          <div class="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1.5 transition-colors hover:bg-slate-50">
            <div class="flex items-start justify-between text-xs gap-2">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-md border ${catInfo.badgeClass}">
                  <span>${catInfo.icon}</span>
                  <span>${catInfo.name}</span>
                </span>
                <span class="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">${escapeHtml(item.sku)}</span>
                <span class="font-bold text-slate-900">${escapeHtml(parsed.title)}</span>
                ${parsed.specs ? `<span class="text-[10px] text-slate-500 font-mono hidden sm:inline">(${escapeHtml(parsed.specs)})</span>` : ''}
                <button type="button" onclick="openSampleArtworkModal('${escapeHtml(item.model || item.description)}')" title="View Approved Technical Specimen" class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition inline-flex items-center gap-1 shadow-2xs ml-1 cursor-pointer">
                  <span>🖼️ Sample Proof</span>
                </button>
              </div>
              <span class="font-mono text-slate-500 text-[11px] whitespace-nowrap shrink-0">Target: <strong class="text-slate-800">${formatNumber(item.orderedQty)}</strong></span>
            </div>
            ${parsed.specs ? `<p class="text-[10px] text-slate-500 font-mono sm:hidden pl-0.5 leading-snug">${escapeHtml(parsed.specs)}</p>` : ''}
            <div class="grid grid-cols-3 text-[11px] text-slate-500 pt-0.5">
              <span>Dispatched: <strong class="text-blue-600 font-mono">${formatNumber(item.shipped)}</strong></span>
              <span class="text-center">Remaining: <strong class="${isFulfilled ? 'text-emerald-600' : 'text-amber-600'} font-mono">${formatNumber(item.remaining)}</strong></span>
              <span class="text-right font-semibold ${isFulfilled ? 'text-emerald-700' : 'text-slate-600'}">${itemPct}% fulfilled</span>
            </div>
            <div class="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
              <div class="h-full ${isFulfilled ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} rounded-full progress-bar-fill" style="width: ${itemPct}%"></div>
            </div>
          </div>
        `;
      }).join('');

      // Shipments history with invoice button, damage photo proof, and category badge
      const historyHtml = shipments.length > 0 ? `
        <div class="mt-4 pt-4 border-t border-slate-100">
          <span class="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Truck Dispatches Under This Order:</span>
          <div class="space-y-1.5">
            ${shipments.map(s => {
              const sCat = getItemCategoryInfo(s);
              const damaged = Number(s.damagedQty || 0);
              const sParsed = formatProductDisplay(s.description);
              return `
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 text-xs bg-slate-50/80 px-3.5 py-2.5 rounded-xl border border-slate-200/70 hover:bg-slate-50 transition">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-mono font-bold text-slate-800 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">${escapeHtml(s.id)}</span>
                  <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded border ${sCat.badgeClass} shrink-0">
                    <span>${sCat.icon}</span>
                    <span>${sCat.name}</span>
                  </span>
                  <span class="text-slate-600 text-[11px] shrink-0">Invoice: <strong class="text-slate-900">${escapeHtml(s.truckLR)}</strong></span>
                  <span class="text-slate-400 text-[10px] shrink-0">(${escapeHtml(s.date)})</span>
                  ${s.invoice ? `
                    <button onclick="viewInvoice('${s.id}')" class="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition inline-flex items-center gap-1 shadow-2xs cursor-pointer shrink-0">
                      <span>📄 Challan</span>
                    </button>
                  ` : ''}
                </div>
                <div class="flex items-center gap-3 text-xs flex-wrap lg:flex-nowrap justify-between lg:justify-end">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="text-slate-800 font-bold" title="${escapeHtml(s.description)}">${escapeHtml(sParsed.title)}</span>
                    ${sParsed.specs ? `<span class="text-[10px] text-slate-500 font-mono hidden md:inline">(${escapeHtml(sParsed.specs)})</span>` : ''}
                  </div>
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shrink-0 shadow-2xs">
                    <span class="font-mono font-bold text-slate-900 text-xs">${formatNumber(s.qtySent)} units</span>
                    <span class="text-[10px] text-slate-500 font-semibold whitespace-nowrap">(${s.boxCount || 1} boxes)</span>
                  </div>
                  <div class="shrink-0">
                    ${(() => {
                      if (s.receivedQty === null || s.receivedQty === undefined) {
                        return '<span class="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 whitespace-nowrap inline-flex items-center gap-1">⏳ In Transit</span>';
                      }
                      const variance = s.receivedQty - s.qtySent;

                      if (damaged > 0) {
                        const damageBadge = s.damagePhoto
                          ? `<button type="button" onclick="viewDamagePhoto('${s.id}')" class="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200 inline-flex items-center gap-1 hover:bg-rose-100 transition cursor-pointer hover:border-rose-300 whitespace-nowrap">
                               <span>⚠️ Verified: ${formatNumber(s.receivedQty)} Good &bull; ${formatNumber(damaged)} Damaged</span>
                               <span class="text-xs">📸</span>
                             </button>`
                          : `<span class="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200 inline-flex items-center gap-1 whitespace-nowrap">
                               <span>⚠️ Verified: ${formatNumber(s.receivedQty)} Good &bull; ${formatNumber(damaged)} Damaged</span>
                             </span>`;
                        return `
                          <div class="text-right">
                            ${damageBadge}
                            <span class="text-[10px] text-rose-600 font-semibold block mt-0.5 whitespace-nowrap">
                              Defect: ${escapeHtml(s.defectReason || 'Damaged carton / piece')}
                            </span>
                          </div>
                        `;
                      } else if (variance === 0) {
                        return `<span class="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap inline-flex items-center gap-1">✓ Verified: ${formatNumber(s.receivedQty)} (Full Match)</span>`;
                      } else if (variance < 0) {
                        return `<span class="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200 whitespace-nowrap inline-flex items-center gap-1">⚠️ Verified: ${formatNumber(s.receivedQty)} (-${formatNumber(Math.abs(variance))} Shortage)</span>`;
                      } else {
                        return `<span class="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-purple-50 text-purple-700 border-purple-200 whitespace-nowrap inline-flex items-center gap-1">📦 Verified: ${formatNumber(s.receivedQty)} (+${formatNumber(variance)} Over)</span>`;
                      }
                    })()}
                  </div>
                  <button onclick="deleteShipment('${s.id}')" title="Delete dispatch log" class="p-1 text-slate-400 hover:text-rose-600 transition text-xs shrink-0 cursor-pointer">
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      ` : '';

      const isPendingReadiness = !po.productionStatus || po.productionStatus === 'pending';
      const prodBadge = getProductionBadgeHtml(po.productionStatus || 'pending', po.productionEstimatedDate);

      let fulfillmentBadgeHtml = '';
      if (po.productionStatus === 'in_stock') {
        fulfillmentBadgeHtml = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">📦 In Stock (Ready Goods)</span>`;
      } else if (po.productionStatus === 'in_production') {
        fulfillmentBadgeHtml = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200">🏭 Made to Order (In Production)</span>`;
      } else if (po.productionStatus === 'packing') {
        fulfillmentBadgeHtml = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200">🔍 Finishing & Packing</span>`;
      } else if (po.productionStatus === 'ready_to_ship') {
        fulfillmentBadgeHtml = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-purple-50 text-purple-700 border-purple-200">🚚 Ready to Dispatch</span>`;
      } else {
        fulfillmentBadgeHtml = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-amber-100 text-amber-800 border-amber-200 animate-pulse">⚡ Action Required: Confirm Readiness</span>`;
      }

      return `
        <div class="bg-white rounded-2xl border ${isPendingReadiness ? 'border-amber-300 ring-2 ring-amber-400/20' : 'border-slate-200'} shadow-xs p-5 card-hover transition">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-mono font-bold text-slate-900 text-base">${escapeHtml(po.poNumber)}</span>
                <span class="text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${badgeClass}">${badgeText}</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">${po.items.length} Distinct SKUs in this ticket</p>
            </div>
            <div class="flex items-center gap-3 text-xs">
              ${prodBadge}
              <button onclick="openUpdateProductionStatusModal('${escapeHtml(po.poNumber)}')" title="Update Manufacturing / Stock Status" class="px-2.5 py-1 text-xs font-bold ${isPendingReadiness ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'text-indigo-700 hover:bg-indigo-50 border border-indigo-200/90'} rounded-xl transition inline-flex items-center gap-1 shadow-2xs cursor-pointer">
                <span>⚡ ${isPendingReadiness ? 'Confirm Readiness' : 'Update Status'}</span>
              </button>
            </div>
          </div>

          ${isPendingReadiness ? `
            <div class="mb-3 p-3 bg-amber-50/90 border border-amber-200 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-amber-950 shadow-2xs">
              <div class="flex items-center gap-2.5">
                <span class="text-base shrink-0">⚡</span>
                <div>
                  <strong class="block font-bold">Action Required: Confirm Stock vs Manufacturing Readiness</strong>
                  <span class="text-[11px] text-amber-800 leading-snug">Check your factory inventory. Confirm if goods are already In Stock or if you need to run Production.</span>
                </div>
              </div>
              <button onclick="openUpdateProductionStatusModal('${escapeHtml(po.poNumber)}')" class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-2xs transition shrink-0 cursor-pointer self-start sm:self-auto">
                Set Readiness Now
              </button>
            </div>
          ` : ''}

          ${po.productionNotes ? `
            <div class="mb-3 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <span class="text-sm">📝</span>
              <div class="leading-relaxed">
                <strong class="font-bold">Manufacturing / Batch Note:</strong>
                <span class="text-amber-800 ml-1">${escapeHtml(po.productionNotes)}</span>
              </div>
            </div>
          ` : ''}

          <div class="space-y-2 mb-4">
            ${itemsHtml}
          </div>

          <div class="space-y-1.5 mb-4 pt-2">
            <div class="flex justify-between text-xs text-slate-500 font-medium">
              <span>Overall Order Fulfillment: ${pct}%</span>
              <span>${totalRemaining > 0 ? formatNumber(totalRemaining) + ' units pending' : 'Zero balance left'}</span>
            </div>
            <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full ${isCompleted ? 'bg-emerald-500' : 'bg-blue-600'} rounded-full transition-all duration-300" style="width: ${pct}%"></div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <span class="text-xs text-slate-400">${isCompleted ? 'All items in this order are 100% fulfilled.' : 'Select SKU & log dispatch before truck leaves factory.'}</span>
            
            ${isCompleted ? `
              <span class="text-xs font-semibold text-slate-400 italic bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                🔒 Order Fully Fulfilled & Locked
              </span>
            ` : `
              <button onclick="openDispatchModal('${escapeHtml(po.poNumber)}')" class="btn-gradient-primary px-4 py-2 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer">
                <span>+ Log Item Dispatch</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            `}
          </div>

          ${historyHtml}
        </div>
      `;
    }).join('');
  }

  // 2. Render Admin View
  let totalOrderedAll = 0;
  let totalShippedAll = 0;
  let totalReceivedAll = 0;

  let adminFilteredPos = state.pos;
  if (state.adminPoFilter === 'pending') {
    adminFilteredPos = state.pos.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;
      const pStatus = p.productionStatus || 'pending';
      return !isCompleted && pStatus === 'pending';
    });
  } else if (state.adminPoFilter === 'in_production') {
    adminFilteredPos = state.pos.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;
      const pStatus = p.productionStatus || '';
      return !isCompleted && (pStatus === 'in_production' || pStatus === 'packing');
    });
  } else if (state.adminPoFilter === 'in_stock') {
    adminFilteredPos = state.pos.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      const isCompleted = totalRemaining === 0 && totalShipped >= totalOrdered;
      const pStatus = p.productionStatus || '';
      return !isCompleted && (pStatus === 'in_stock' || pStatus === 'ready_to_ship');
    });
  } else if (state.adminPoFilter === 'completed') {
    adminFilteredPos = state.pos.filter(p => {
      const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(p.poNumber);
      return totalRemaining === 0 && totalShipped >= totalOrdered;
    });
  }

  state.pos.forEach(po => {
    const { totalOrdered, totalShipped } = getPoMetrics(po.poNumber);
    totalOrderedAll += totalOrdered;
    totalShippedAll += totalShipped;
  });

  const adminPoBody = document.getElementById('adminPoTableBody');
  if (adminPoBody) {
    if (adminFilteredPos.length === 0) {
      adminPoBody.innerHTML = `<tr><td colspan="9" class="p-8 text-center text-slate-400 text-xs">No orders match the selected stage filter. Click <button type="button" onclick="openNewPoModal()" class="text-blue-600 font-bold hover:underline cursor-pointer">+ Create New Order</button> above to deploy an order ticket.</td></tr>`;
    } else {
      adminPoBody.innerHTML = adminFilteredPos.map(po => {
        const { totalOrdered, totalShipped, totalRemaining } = getPoMetrics(po.poNumber);

        let statusTag = `<span class="badge-pill badge-amber">⏳ Pending</span>`;
        if (totalRemaining === 0 && totalShipped >= totalOrdered) {
          statusTag = `<span class="badge-pill badge-emerald">✓ Completed</span>`;
        } else if (totalShipped > 0) {
          statusTag = `<span class="badge-pill badge-blue">⚡ In Progress</span>`;
        }

        const hasMultipleItems = (po.items || []).length > 1;
        const itemsSummary = (po.items || []).map(i => {
          const parsed = formatProductDisplay(i.description);
          const catInfo = getItemCategoryInfo(i);
          return `
            <div class="py-1.5 border-b border-slate-100 last:border-b-0 space-y-1">
              <div class="flex items-center justify-between gap-1.5">
                <div class="flex items-center gap-1.5">
                  <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded border ${catInfo.badgeClass}">
                    <span>${catInfo.icon}</span><span>${catInfo.name}</span>
                  </span>
                  ${i.sku ? `<span class="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">${escapeHtml(i.sku)}</span>` : ''}
                </div>
                <button type="button" onclick="openSampleArtworkModal('${escapeHtml(i.model || i.description)}')" title="View Approved Technical Specimen" class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition inline-flex items-center gap-1 shadow-2xs shrink-0 cursor-pointer">
                  <span>🖼️ Sample</span>
                </button>
              </div>
              <div class="flex items-center justify-between gap-2">
                <span class="font-bold text-slate-900 text-xs block leading-snug">${escapeHtml(parsed.title)}</span>
                ${hasMultipleItems ? `<span class="font-mono text-slate-500 font-semibold text-[10px] shrink-0">(${formatNumber(i.orderedQty)} units)</span>` : ''}
              </div>
            </div>
          `;
        }).join('');

        const pStatus = po.productionStatus || 'pending';
        const prodBadge = getProductionBadgeHtml(pStatus, po.productionEstimatedDate);

        return `
          <tr class="hover:bg-slate-50/80 transition">
            <td class="p-3 font-mono font-bold text-blue-600 text-xs">
              <span class="block">${escapeHtml(po.poNumber)}</span>
              ${po.requiredByDate ? `<span class="text-[10px] text-slate-400 font-sans font-normal block mt-0.5">Due: ${po.requiredByDate}</span>` : ''}
            </td>
            <td class="p-3 font-semibold text-slate-800">${escapeHtml(po.vendor)}</td>
            <td class="p-3 text-slate-600 text-xs leading-relaxed min-w-[220px]">${itemsSummary}</td>
            <td class="p-3 text-center">
              ${prodBadge}
              ${po.productionNotes ? `<span class="text-[10px] text-slate-500 font-sans block mt-1 truncate max-w-[150px] mx-auto" title="${escapeHtml(po.productionNotes)}">📝 ${escapeHtml(po.productionNotes)}</span>` : ''}
            </td>
            <td class="p-3 text-right font-mono font-bold text-slate-900">${formatNumber(totalOrdered)}</td>
            <td class="p-3 text-right font-mono font-bold text-blue-600">${formatNumber(totalShipped)}</td>
            <td class="p-3 text-right font-mono font-bold ${totalRemaining === 0 ? 'text-slate-400' : 'text-amber-600'}">${formatNumber(totalRemaining)}</td>
            <td class="p-3 text-center">${statusTag}</td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button onclick="openUpdateProductionStatusModal('${escapeHtml(po.poNumber)}')" title="Update Production / Stock Status" class="px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 border border-indigo-200/90 rounded-lg transition inline-flex items-center gap-1 shadow-2xs cursor-pointer">
                  <span>⚡ Stage</span>
                </button>
                <button onclick="deletePo('${escapeHtml(po.poNumber)}')" class="px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200/70 rounded-lg transition inline-flex items-center gap-1 shadow-2xs cursor-pointer">
                  <span>🗑️</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 3. Admin Shipments & Quick Audit Filters
  const shipments = state.shipments || [];
  const todayStr = new Date().toISOString().slice(0, 10);

  let countAll = shipments.length;
  let countShortages = 0;
  let countDamaged = 0;
  let countToday = 0;
  let countTransit = 0;
  let totalVerifiedShipped = 0;
  let totalVerifiedVariance = 0;

  shipments.forEach(s => {
    const hasCount = s.receivedQty !== null && s.receivedQty !== undefined;
    if (!hasCount) {
      countTransit++;
    } else {
      totalReceivedAll += Number(s.receivedQty);
      totalVerifiedShipped += Number(s.qtySent);
      const variance = Number(s.receivedQty) - Number(s.qtySent);
      totalVerifiedVariance += variance;
      if (variance < 0) countShortages++;
    }
    if (Number(s.damagedQty || 0) > 0) countDamaged++;
    if (s.date === todayStr) countToday++;
  });

  const bAll = document.getElementById('badgeShipAll');
  const bShortages = document.getElementById('badgeShipShortages');
  const bDamaged = document.getElementById('badgeShipDamaged');
  const bToday = document.getElementById('badgeShipToday');
  const bTransit = document.getElementById('badgeShipTransit');

  if (bAll) bAll.textContent = countAll;
  if (bShortages) bShortages.textContent = countShortages;
  if (bDamaged) bDamaged.textContent = countDamaged;
  if (bToday) bToday.textContent = countToday;
  if (bTransit) bTransit.textContent = countTransit;

  const currentShipFilter = state.shipmentFilter || 'all';
  const filterBtns = {
    all: document.getElementById('filterShipAll'),
    shortages: document.getElementById('filterShipShortages'),
    damaged: document.getElementById('filterShipDamaged'),
    today: document.getElementById('filterShipToday'),
    transit: document.getElementById('filterShipTransit'),
  };

  Object.entries(filterBtns).forEach(([key, btn]) => {
    if (!btn) return;
    const isActive = key === currentShipFilter;
    if (isActive) {
      let activeCls = 'ship-filter-all-active';
      if (key === 'shortages') activeCls = 'ship-filter-shortages-active';
      else if (key === 'damaged') activeCls = 'ship-filter-damaged-active';
      else if (key === 'today') activeCls = 'ship-filter-today-active';
      else if (key === 'transit') activeCls = 'ship-filter-transit-active';
      btn.className = `px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${activeCls}`;
    } else {
      let inactiveCls = 'border border-slate-200/90 text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900';
      if (key === 'shortages') inactiveCls = 'border border-rose-200/80 text-rose-700 bg-rose-50/50 hover:bg-rose-100/70';
      else if (key === 'damaged') inactiveCls = 'border border-amber-200/80 text-amber-800 bg-amber-50/50 hover:bg-amber-100/70';
      else if (key === 'today') inactiveCls = 'border border-teal-200/80 text-teal-800 bg-teal-50/50 hover:bg-teal-100/70';
      else if (key === 'transit') inactiveCls = 'border border-indigo-200/80 text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100/70';
      btn.className = `px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${inactiveCls}`;
    }
  });

  const statusLabel = document.getElementById('shipmentsFilterStatusLabel');
  if (statusLabel) {
    const labels = {
      all: `Showing all ${countAll} records`,
      shortages: `Showing ${countShortages} shortage discrepancies`,
      damaged: `Showing ${countDamaged} dispatches with damage/rejection`,
      today: `Showing ${countToday} dispatches from today (${todayStr})`,
      transit: `Showing ${countTransit} dispatches awaiting gate inward count`
    };
    statusLabel.textContent = labels[currentShipFilter] || 'Filtered records';
  }

  let adminFilteredShipments = shipments;
  if (currentShipFilter === 'shortages') {
    adminFilteredShipments = shipments.filter(s => s.receivedQty !== null && s.receivedQty !== undefined && (Number(s.receivedQty) - Number(s.qtySent)) < 0);
  } else if (currentShipFilter === 'damaged') {
    adminFilteredShipments = shipments.filter(s => Number(s.damagedQty || 0) > 0);
  } else if (currentShipFilter === 'today') {
    adminFilteredShipments = shipments.filter(s => s.date === todayStr);
  } else if (currentShipFilter === 'transit') {
    adminFilteredShipments = shipments.filter(s => s.receivedQty === null || s.receivedQty === undefined);
  }

  // Category Filter for Dispatches
  if (state.categoryFilter && state.categoryFilter !== 'all') {
    adminFilteredShipments = adminFilteredShipments.filter(s => {
      const cInfo = getItemCategoryInfo(s);
      return cInfo.id === state.categoryFilter;
    });
  }

  const adminShipmentsBody = document.getElementById('adminShipmentsTableBody');
  if (adminShipmentsBody) {
    if (adminFilteredShipments.length === 0) {
      adminShipmentsBody.innerHTML = `<tr><td colspan="12" class="p-8 text-center text-slate-400 text-xs">No dispatches match the selected audit and category filters.</td></tr>`;
    } else {
      adminShipmentsBody.innerHTML = adminFilteredShipments.map(s => {
        const po = state.pos.find(p => p.poNumber === s.poNumber);
        const hasCount = s.receivedQty !== null && s.receivedQty !== undefined;
        const variance = hasCount ? (Number(s.receivedQty) - Number(s.qtySent)) : 0;
        const damaged = Number(s.damagedQty || 0);
        const catInfo = getItemCategoryInfo(s);
        const sParsed = formatProductDisplay(s.description);

        let auditBadge = `<span class="badge-pill badge-amber">⏳ In Transit</span>`;
        if (hasCount) {
          if (damaged > 0 && variance === 0) {
            auditBadge = `<span class="badge-pill badge-amber">⚠️ Damage Recorded</span>`;
          } else if (variance === 0) {
            auditBadge = `<span class="badge-pill badge-emerald">✓ Exact Match</span>`;
          } else if (variance < 0) {
            auditBadge = `<span class="badge-pill badge-rose">⚠️ Shortfall: -${formatNumber(Math.abs(variance))}</span>`;
          } else {
            auditBadge = `<span class="badge-pill badge-purple">⚠️ Over: +${formatNumber(variance)}</span>`;
          }
        }

        return `
          <tr class="hover:bg-slate-50/80 transition">
            <td class="p-3 font-mono font-bold text-slate-800 text-xs whitespace-nowrap">${escapeHtml(s.id)}</td>
            <td class="p-3 font-mono font-semibold text-blue-600 text-xs whitespace-nowrap">${escapeHtml(s.poNumber)}</td>
            <td class="p-3 text-slate-800 font-semibold whitespace-nowrap">${escapeHtml(po ? po.vendor : '-')}</td>
            <td class="p-3 text-slate-700 font-mono text-[11px] font-medium whitespace-nowrap">${escapeHtml(s.truckLR)}</td>
            <td class="p-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">${escapeHtml(s.date)}</td>
            <td class="p-3 min-w-[260px]">
              <div class="flex items-center justify-between gap-1.5 mb-1.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded border ${catInfo.badgeClass} whitespace-nowrap shrink-0">
                    <span>${catInfo.icon}</span>
                    <span>${catInfo.name}</span>
                  </span>
                  ${s.sku ? `<span class="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 whitespace-nowrap shrink-0">${escapeHtml(s.sku)}</span>` : ''}
                </div>
                <button type="button" onclick="openSampleArtworkModal('${escapeHtml(s.model || s.description)}')" title="View Approved Technical Specimen" class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition inline-flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0 cursor-pointer">
                  <span>🖼️ Sample</span>
                </button>
              </div>
              <span class="font-bold text-slate-900 block leading-snug">${escapeHtml(sParsed.title)}</span>
              ${sParsed.specs ? `<span class="text-[10px] text-slate-500 font-mono block mt-0.5 leading-tight">${escapeHtml(sParsed.specs)}</span>` : ''}
            </td>
            <td class="p-3 text-right whitespace-nowrap">
              <span class="font-mono font-bold text-blue-600 block text-xs">${formatNumber(s.qtySent)}</span>
              <span class="text-[10px] text-slate-500 font-semibold inline-block px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 mt-0.5 whitespace-nowrap">${s.boxCount || 1} box(es)</span>
            </td>
            <td class="p-3 text-right whitespace-nowrap">
              ${hasCount ? `
                <span class="font-mono font-bold text-slate-900 block text-xs">${formatNumber(s.receivedQty)} good</span>
                <span class="text-[10px] text-emerald-700 font-semibold inline-block px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-200 mt-0.5 whitespace-nowrap">${s.receivedBoxes || s.boxCount || 1} box(es)</span>
                ${damaged > 0 ? `<span class="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded font-semibold block mt-0.5 whitespace-nowrap">⚠️ ${formatNumber(damaged)} damaged</span>` : ''}
              ` : '<span class="text-slate-300 font-mono text-xs">-</span>'}
            </td>
            <td class="p-3 text-right font-mono font-bold whitespace-nowrap ${variance < 0 ? 'text-rose-600' : (variance > 0 ? 'text-purple-600' : 'text-emerald-600')}">
              ${hasCount ? (variance > 0 ? '+' : '') + formatNumber(variance) : '-'}
              ${hasCount && damaged > 0 ? `<span class="text-[10px] text-slate-400 font-normal block font-sans whitespace-nowrap">(${formatNumber(Number(s.receivedQty) + damaged)} total)</span>` : ''}
            </td>
            <td class="p-3 text-center">
              <div class="inline-flex flex-col gap-1 items-center">
                ${s.invoice ? `
                  <button onclick="viewInvoice('${s.id}')" class="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition inline-flex items-center gap-1 shadow-2xs">
                    <span>📄 Challan</span>
                  </button>
                ` : '<span class="text-slate-300 text-xs font-mono">-</span>'}
                ${s.damagePhoto ? `
                  <button onclick="viewDamagePhoto('${s.id}')" class="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition inline-flex items-center gap-1 shadow-2xs">
                    <span>📸 Photo</span>
                  </button>
                ` : ''}
              </div>
            </td>
            <td class="p-3 text-center">${auditBadge}</td>
            <td class="p-3 text-center">
              <div class="inline-flex items-center gap-1.5">
                <button onclick="openReceiveModal('${s.id}')" class="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition shadow-2xs inline-flex items-center gap-1">
                  <span>${hasCount ? '✏️ Edit Count' : '📥 Receive'}</span>
                </button>
                <button onclick="deleteShipment('${s.id}')" title="Delete dispatch entry" class="px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200/70 rounded-xl transition shadow-2xs inline-flex items-center">
                  <span>🗑️</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 4. Gatekeeper Inward Inspection Table
  const currentGateFilter = state.gateFilter || 'all';
  const gateBtns = {
    all: document.getElementById('gateFilterAll'),
    transit: document.getElementById('gateFilterTransit'),
    today: document.getElementById('gateFilterToday'),
    damaged: document.getElementById('gateFilterDamaged')
  };
  Object.entries(gateBtns).forEach(([key, btn]) => {
    if (!btn) return;
    const isActive = key === currentGateFilter;
    if (isActive) {
      let activeCls = 'ship-filter-all-active';
      if (key === 'transit') activeCls = 'ship-filter-transit-active';
      else if (key === 'today') activeCls = 'ship-filter-today-active';
      else if (key === 'damaged') activeCls = 'ship-filter-damaged-active';
      btn.className = `px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${activeCls}`;
    } else {
      let inactiveCls = 'border border-slate-200/90 text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900';
      if (key === 'transit') inactiveCls = 'border border-indigo-200/80 text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100/70';
      else if (key === 'today') inactiveCls = 'border border-teal-200/80 text-teal-800 bg-teal-50/50 hover:bg-teal-100/70';
      else if (key === 'damaged') inactiveCls = 'border border-amber-200/80 text-amber-800 bg-amber-50/50 hover:bg-amber-100/70';
      btn.className = `px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${inactiveCls}`;
    }
  });

  let gateShipments = shipments;
  if (currentGateFilter === 'transit') {
    gateShipments = shipments.filter(s => s.receivedQty === null || s.receivedQty === undefined);
  } else if (currentGateFilter === 'today') {
    gateShipments = shipments.filter(s => s.date === todayStr);
  } else if (currentGateFilter === 'damaged') {
    gateShipments = shipments.filter(s => Number(s.damagedQty || 0) > 0);
  }

  // Category Filter for Gatekeeper
  if (state.categoryFilter && state.categoryFilter !== 'all') {
    gateShipments = gateShipments.filter(s => {
      const cInfo = getItemCategoryInfo(s);
      return cInfo.id === state.categoryFilter;
    });
  }

  const gateSearch = (document.getElementById('gateSearchInput')?.value || '').trim().toLowerCase();
  if (gateSearch) {
    gateShipments = gateShipments.filter(s => {
      const po = state.pos.find(p => p.poNumber === s.poNumber);
      const vendorName = po ? po.vendor.toLowerCase() : '';
      return s.id.toLowerCase().includes(gateSearch) ||
        s.poNumber.toLowerCase().includes(gateSearch) ||
        (s.truckLR && s.truckLR.toLowerCase().includes(gateSearch)) ||
        (s.description && s.description.toLowerCase().includes(gateSearch)) ||
        vendorName.includes(gateSearch);
    });
  }

  const gateShipmentsBody = document.getElementById('gateShipmentsTableBody');
  if (gateShipmentsBody) {
    if (gateShipments.length === 0) {
      gateShipmentsBody.innerHTML = `<tr><td colspan="11" class="p-8 text-center text-slate-400 text-xs">No incoming dispatches match the selected inward gate and category filter.</td></tr>`;
    } else {
      gateShipmentsBody.innerHTML = gateShipments.map(s => {
        const po = state.pos.find(p => p.poNumber === s.poNumber);
        const hasCount = s.receivedQty !== null && s.receivedQty !== undefined;
        const variance = hasCount ? (Number(s.receivedQty) - Number(s.qtySent)) : 0;
        const damaged = Number(s.damagedQty || 0);
        const catInfo = getItemCategoryInfo(s);
        const sParsed = formatProductDisplay(s.description);

        let auditBadge = `<span class="badge-pill badge-amber">⏳ Awaiting Count</span>`;
        if (hasCount) {
          if (damaged > 0 && variance === 0) {
            auditBadge = `<span class="badge-pill badge-amber">⚠️ Damage Recorded</span>`;
          } else if (variance === 0) {
            auditBadge = `<span class="badge-pill badge-emerald">✓ Exact Match</span>`;
          } else if (variance < 0) {
            auditBadge = `<span class="badge-pill badge-rose">⚠️ Shortfall: -${formatNumber(Math.abs(variance))}</span>`;
          } else {
            auditBadge = `<span class="badge-pill badge-purple">⚠️ Over: +${formatNumber(variance)}</span>`;
          }
        }

        return `
          <tr class="hover:bg-slate-50/80 transition">
            <td class="p-3 font-mono font-bold text-slate-800 text-xs whitespace-nowrap">${escapeHtml(s.id)}</td>
            <td class="p-3 font-mono font-semibold text-blue-600 text-xs whitespace-nowrap">${escapeHtml(s.poNumber)}</td>
            <td class="p-3 text-slate-800 font-semibold whitespace-nowrap">${escapeHtml(po ? po.vendor : '-')}</td>
            <td class="p-3 text-slate-700 font-mono text-[11px] font-medium whitespace-nowrap">${escapeHtml(s.truckLR)}</td>
            <td class="p-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">${escapeHtml(s.date)}</td>
            <td class="p-3 min-w-[260px]">
              <div class="flex items-center justify-between gap-1.5 mb-1.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded border ${catInfo.badgeClass} whitespace-nowrap shrink-0">
                    <span>${catInfo.icon}</span>
                    <span>${catInfo.name}</span>
                  </span>
                  ${s.sku ? `<span class="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 whitespace-nowrap shrink-0">${escapeHtml(s.sku)}</span>` : ''}
                </div>
                <button type="button" onclick="openSampleArtworkModal('${escapeHtml(s.model || s.description)}')" title="View Approved Technical Specimen" class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition inline-flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0 cursor-pointer">
                  <span>🖼️ Sample</span>
                </button>
              </div>
              <span class="font-bold text-slate-900 block leading-snug">${escapeHtml(sParsed.title)}</span>
              ${sParsed.specs ? `<span class="text-[10px] text-slate-500 font-mono block mt-0.5 leading-tight">${escapeHtml(sParsed.specs)}</span>` : ''}
            </td>
            <td class="p-3 text-right whitespace-nowrap">
              <span class="font-mono font-bold text-blue-600 block text-xs">${formatNumber(s.qtySent)}</span>
              <span class="text-[10px] text-slate-500 font-semibold inline-block px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 mt-0.5 whitespace-nowrap">${s.boxCount || 1} box(es)</span>
            </td>
            <td class="p-3 text-right whitespace-nowrap">
              ${hasCount ? `
                <span class="font-mono font-bold text-emerald-700 block text-xs">${formatNumber(s.receivedQty)} good</span>
                <span class="text-[10px] text-slate-500 font-semibold inline-block px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 mt-0.5 whitespace-nowrap">${s.receivedBoxes || s.boxCount || 1} box(es)</span>
                ${damaged > 0 ? `<span class="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded font-semibold block mt-0.5 whitespace-nowrap">⚠️ ${formatNumber(damaged)} rejected</span>` : ''}
              ` : '<span class="text-amber-600 font-semibold text-xs whitespace-nowrap">⏳ Uninspected</span>'}
            </td>
            <td class="p-3 text-center">
              <div class="inline-flex flex-col gap-1 items-center">
                ${s.invoice ? `
                  <button onclick="viewInvoice('${s.id}')" class="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition inline-flex items-center gap-1 shadow-2xs">
                    <span>📄 Challan</span>
                  </button>
                ` : '<span class="text-slate-300 text-xs font-mono">-</span>'}
                ${s.damagePhoto ? `
                  <button onclick="viewDamagePhoto('${s.id}')" class="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition inline-flex items-center gap-1 shadow-2xs">
                    <span>📸 Photo</span>
                  </button>
                ` : ''}
              </div>
            </td>
            <td class="p-3 text-center">${auditBadge}</td>
            <td class="p-3 text-center">
              <button onclick="openReceiveModal('${s.id}')" class="px-3.5 py-1.5 ${hasCount ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/90' : 'btn-gradient-emerald text-white shadow-2xs'} font-bold rounded-xl text-xs transition inline-flex items-center gap-1.5 cursor-pointer">
                <span>${hasCount ? '✏️ Edit Count' : '📥 Verify Inward'}</span>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 5. Update Executive Metrics
  const adminStatOrd = document.getElementById('adminStatOrdered');
  const adminStatShp = document.getElementById('adminStatShipped');
  const adminStatRcv = document.getElementById('adminStatReceived');
  const adminStatVar = document.getElementById('adminStatVariance');

  if (adminStatOrd) adminStatOrd.textContent = formatNumber(totalOrderedAll);
  if (adminStatShp) adminStatShp.textContent = formatNumber(totalShippedAll);
  if (adminStatRcv) adminStatRcv.textContent = formatNumber(totalReceivedAll);

  if (adminStatVar) {
    adminStatVar.textContent = (totalVerifiedVariance > 0 ? '+' : '') + formatNumber(totalVerifiedVariance);
    adminStatVar.className = totalVerifiedVariance < 0 
      ? "text-2xl font-black text-rose-600 font-mono mt-1" 
      : (totalVerifiedVariance > 0 ? "text-2xl font-black text-purple-600 font-mono mt-1" : "text-2xl font-black text-emerald-600 font-mono mt-1");
  }

  // Update Admin Tab Badges & Content
  const bOrd = document.getElementById('adminTabBadgeOrders');
  const bDsp = document.getElementById('adminTabBadgeDispatches');
  const bSc = document.getElementById('adminTabBadgeScorecards');
  const bVnd = document.getElementById('adminTabBadgeVendors');
  if (bOrd) bOrd.textContent = state.pos.length;
  if (bDsp) bDsp.textContent = (state.shipments || []).length;
  if (bSc) bSc.textContent = (state.vendors || []).length;
  if (bVnd) bVnd.textContent = (state.vendors || []).length;

  // 6. Update Vendor Scorecards
  renderVendorScorecards();
}

// ==========================================
// CSV Discrepancy & Audit Log Exporter
// ==========================================
function exportShipmentsCsv() {
  if (!state.shipments || state.shipments.length === 0) {
    showToast('No shipment records to export.', true);
    return;
  }

  const headers = [
    "Shipment ID", 
    "Order Number", 
    "Vendor", 
    "Product Category",
    "Product Model",
    "Invoice Number", 
    "Dispatch Date", 
    "Item Description", 
    "Qty Dispatched (Units)", 
    "Boxes Dispatched", 
    "Good Units Received", 
    "Boxes Received", 
    "Damaged Units",
    "Defect Reason",
    "Variance", 
    "Audit Status", 
    "Invoice Filename",
    "Damage Photo Proof"
  ];

  const rows = state.shipments.map(s => {
    const po = state.pos.find(p => p.poNumber === s.poNumber);
    const vendorName = po ? po.vendor : '';
    const hasCount = s.receivedQty !== null && s.receivedQty !== undefined;
    const variance = hasCount ? (s.receivedQty - s.qtySent) : '';
    const damaged = Number(s.damagedQty || 0);
    const catInfo = getItemCategoryInfo(s);

    let status = 'Awaiting Count';
    if (hasCount) {
      if (damaged > 0 && variance === 0) status = 'Damage Recorded';
      else if (variance === 0) status = 'Exact Match';
      else if (variance < 0) status = `Shortfall (${variance})`;
      else status = `Over (+${variance})`;
    }
    const invoiceName = s.invoice ? s.invoice.name : 'None';
    const hasPhoto = s.damagePhoto ? 'Yes' : 'No';

    return [
      `"${s.id}"`,
      `"${s.poNumber}"`,
      `"${vendorName}"`,
      `"${catInfo.name}"`,
      `"${(s.model || catInfo.name).replace(/"/g, '""')}"`,
      `"${s.truckLR}"`,
      `"${s.date}"`,
      `"${(s.description || '').replace(/"/g, '""')}"`,
      s.qtySent,
      s.boxCount || 1,
      hasCount ? s.receivedQty : '""',
      hasCount ? (s.receivedBoxes || s.boxCount || 1) : '""',
      damaged,
      `"${(s.defectReason || '').replace(/"/g, '""')}"`,
      variance,
      `"${status}"`,
      `"${invoiceName}"`,
      `"${hasPhoto}"`
    ].join(',');
  });

  // Prepend UTF-8 BOM for full Microsoft Excel / Google Sheets compatibility
  const csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent([headers.join(','), ...rows].join('\n'));
  const anchor = document.createElement('a');
  anchor.setAttribute('href', csvContent);
  anchor.setAttribute('download', `LabelTrack_Discrepancy_Log_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  showToast('Exported discrepancy audit log to CSV!');
}

// Global accessibility: close active modals on Escape key or Backdrop click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    ['dispatchModal', 'receiveModal', 'newPoModal', 'vendorManageModal', 'invoicePreviewModal', 'vendorScorecardModal', 'changePasswordModal', 'updateProductionStatusModal', 'sampleArtworkModal', 'annualColorCodeModal'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.classList.contains('hidden')) {
        closeModal(id);
      }
    });
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('modal-backdrop')) {
    closeModal(e.target.id);
  }
});

// Initialize Cloud Sync on startup
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSupabase();
      updateAnnualColorUI();
    });
  } else {
    initSupabase();
    updateAnnualColorUI();
  }

  // Global Window API Exposure for Template Handlers
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.openDispatchModal = openDispatchModal;
  window.handleDispatchSubmit = handleDispatchSubmit;
  window.openReceiveModal = openReceiveModal;
  window.handleReceiveSubmit = handleReceiveSubmit;
  window.viewInvoice = viewInvoice;
  window.viewDamagePhoto = viewDamagePhoto;
  window.handleDamagePhotoSelected = handleDamagePhotoSelected;
  window.removeDamagePhoto = removeDamagePhoto;
  window.previewSelectedDamagePhoto = previewSelectedDamagePhoto;
  window.openPdfInNewTab = openPdfInNewTab;
  window.openNewPoModal = openNewPoModal;
  window.handleNewPoSubmit = handleNewPoSubmit;
  window.addNewItemRow = addNewItemRow;
  window.removeItemRow = removeItemRow;
  window.handleCategoryChange = handleCategoryChange;
  window.handleModelChange = handleModelChange;
  window.calcNewPoTotal = calcNewPoTotal;
  window.deletePo = deletePo;
  window.deleteShipment = deleteShipment;
  window.deleteVendor = deleteVendor;
  window.clearAllShipments = clearAllShipments;
  window.exportShipmentsCsv = exportShipmentsCsv;
  window.setFilter = setFilter;
  window.setCategoryFilter = setCategoryFilter;
  window.setShipmentFilter = setShipmentFilter;
  window.setGateFilter = setGateFilter;
  window.quickMatchReceive = quickMatchReceive;
  window.updateReceiveComparison = updateReceiveComparison;
  window.updateModalItemBalance = updateModalItemBalance;
  window.openChangePasswordModal = openChangePasswordModal;
  window.closeChangePasswordModal = closeChangePasswordModal;
  window.generateRandomNewPassword = generateRandomNewPassword;
  window.toggleChangePassVisibility = toggleChangePassVisibility;
  window.handleChangePasswordSubmit = handleChangePasswordSubmit;
  window.switchAdminTab = switchAdminTab;
  window.setAdminPoFilter = setAdminPoFilter;
  window.openSampleArtworkModal = openSampleArtworkModal;
  window.switchSampleModalYear = switchSampleModalYear;
  window.handleSampleProofFileChange = handleSampleProofFileChange;
  window.deleteSampleProof = deleteSampleProof;
  window.openReceiveModalSample = openReceiveModalSample;
  window.openAnnualColorManagerModal = openAnnualColorManagerModal;
  window.switchAnnualManagerTab = switchAnnualManagerTab;
  window.toggleNewYearForm = toggleNewYearForm;
  window.handleSaveYearColor = handleSaveYearColor;
  window.setActiveOperationalYear = setActiveOperationalYear;
  window.deleteAnnualColorYear = deleteAnnualColorYear;
  window.handleMatrixYearChange = handleMatrixYearChange;
  window.handleMatrixCatChange = handleMatrixCatChange;
  window.handleMatrixQuickUpload = handleMatrixQuickUpload;
  window.updateAnnualColorUI = updateAnnualColorUI;
  window.openUpdateProductionStatusModal = openUpdateProductionStatusModal;
  window.handleProductionStatusSubmit = handleProductionStatusSubmit;
  window.render = render;
  Object.defineProperty(window, 'currentDispatchInvoice', {
    get: () => currentDispatchInvoice,
    set: (val) => { currentDispatchInvoice = val; },
    configurable: true
  });
  Object.defineProperty(window, 'currentDamagePhoto', {
    get: () => currentDamagePhoto,
    set: (val) => { currentDamagePhoto = val; },
    configurable: true
  });
}


