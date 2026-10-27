# LabelTrack Enterprise — Two-Sided Inventory & Reconciliation Hub

An enterprise-grade, two-sided supply chain portal and purchase order reconciliation platform designed for multi-vendor label manufacturing, procurement, and physical warehouse gate audits.

---

## 📁 Project Architecture

```text
labeltrack-app/
│
├── index.html                  # Core Single Page Application (Semantic HTML5, Modals, Views)
│
├── css/
│   └── styles.css              # Executive theme: Plus Jakarta Sans, Tabular JetBrains Mono, Segmented Tabs & Badges
│
├── js/
│   ├── app.js                  # Business logic, PO metrics, Supabase sync, document compression & UI rendering
│   ├── auth.js                 # Cryptographic salted SHA-256 Web Crypto authentication & session manager
│   └── vault.js                # Encrypted user credential repository and secure storage keys
│
├── server.js                   # High-performance, zero-dependency Node.js HTTP server & ISP-resilient Supabase gateway
├── vercel.json                 # Production routing, CDN edge headers & security rules for Vercel
├── .gitignore                  # Git exclusions for OS metadata and temporary logs
└── README.md                   # System documentation and deployment guide
```

---

## 🚀 Key Enterprise Features

### 1. 🎨 Modern Executive Interface & Typography
- **Plus Jakarta Sans Typography**: Tailored typography scale with `-0.025em` tracking on headings for an ultra-clean corporate look.
- **Tabular Monospace Figures**: Numerical figures (quantities, box counts, invoice numbers, timestamps) rendered in `JetBrains Mono` with tabular numerals (`tnum`) for flawless vertical spreadsheet alignment.
- **Apple / Linear-Style Segmented Tabs**: Unified navigation switchers with micro-transitions and automatic high-contrast badge inversion.

### 2. ⚡ Intelligent Single-SKU & Multi-Item Dispatch
- **Zero-Friction Single-SKU Orders**: When dispatching an order allocated for a single SKU, the system automatically bypasses the item dropdown and displays a dedicated **Allocated Item** badge card.
- **Multi-Item Order Split Support**: For tickets containing multiple distinct items, the dropdown dynamically presents available line items with real-time remaining quota counters.
- **Hard Anti-Overrun Protection**: Prevents vendors from logging dispatch quantities that exceed remaining contracted balances.

### 3. 🏭 Live Production & Manufacturing Readiness Tracking
- Real-time 5-stage manufacturing lifecycle:
  - 📦 **In Stock (Ready Goods)**
  - 🏭 **In Production / Printing**
  - 🔍 **Finishing & Packing**
  - 🚚 **Ready for Dispatch**
  - ⏳ **Pending Supplier Confirmation**
- Allows buyers and factory managers to communicate target deadlines, estimated dispatch dates, and batch progress comments.

### 4. 🎨 Universal Annual Master Color Codes, Pantone® Standards & Security Imprints
- **Pantone® 4625 C Standard**: Preset deep Brown `PANTONE 4625 C` (Hex `#4F302B`) as the 1st primary industrial standard, with Hex codes as visual backup.
- **6-Month Color & Code Cycles**: Color and imprint mandates dynamically rotate every 6 months:
  - **H1 (1st 6 Months)**: January – June
  - **H2 (2nd 6 Months)**: July – December
- **Automated Year Code Imprint**:
  - Automatically calculates the required security code imprinted on label rolls for the active financial year (e.g. Year 2026: H1 Code `HR`, H2 Code `2HR`).
- **Dynamic Specimen Proofs**: Direct modal viewer and vector blueprint illustrating the active Pantone color band and security imprint code.

### 5. 🎗️ Thermal Transfer Ribbon Roll Consignment Tracking
- Full supply chain tracking for thermal ribbon rolls dispatched alongside label stock (or delivered on alternate days).
- Gatekeepers inspect and verify incoming ribbon counts (good rolls vs damaged/crushed rolls) prior to signing inward passes.

### 6. ✏️ Vendor Dispatch Self-Correction (Edit instead of Delete)
- Replaces raw deletion with an audited **Edit Dispatch** workflow, allowing suppliers to correct unit and box discrepancies (e.g. 10k vs 5k) while preserving gate audit history.

### 7. 📱 Mobile-Responsive Collapsible Order Cards & Clutter-Free Portal
- **Collapsible Mobile Accordion**: Long single-order cards collapse into compact, touch-friendly order rows showing SKU title, progress %, and quick toggle chevrons.
- **Clutter-Free Vendor View**: Completed 100% fulfilled orders are automatically filtered out from the primary 'All Orders' tab, keeping factory queues focused on active procurement.

### 8. 📊 Executive Monthly Dashboard & Date-Range Excel/CSV Export
- Real-time monthly executive KPI cards (Monthly Orders, Allocated Quota, Dispatched Volume, Fulfillment Rate %).
- Flexible date range exporter (`From Date` to `To Date`) generating complete multi-column CSV workbooks with BOM encoding for seamless Microsoft Excel import.

### 9. 🔒 Password Confirmation for Administrative Deletions
- Mandatory password verification modal before deleting orders, suppliers, or clearing warehouse dispatch logs, preventing accidental data loss and tampering.

### 10. 📄 Smart High-Fidelity Invoice & Challan Compression
- Automatically optimizes smartphone photos and scanned delivery challans down to **~200 KB – 300 KB** (75%–92% reduction) directly in the browser via canvas bicubic downsampling.
- Retains Full HD 1920px resolution for sharp barcode scans, signatures, and tax invoice details.
- PDF documents are preserved in their original vector format.

### 11. 🏢 Warehouse Gatekeeper Receiving & 3-Way Reconciliation
- Separate warehouse inspection terminal to record physical offloaded box counts, accept good units, and log damaged pieces.
- Photographic defect logging and discrepancy flags (Exact Match, Shortfall, Over-Delivery).
- Generates live Supplier Quality Scorecards and reliability ratings.

### 12. ☁️ Dual-Layer Cloud Persistence (Offline Resilient)
- **Primary Cloud DB**: Direct real-time synchronization with Supabase (`purchase_orders`, `shipments`, `vendors` tables and `invoices` storage bucket).
- **Local Fallback**: Instant local caching ensures zero downtime even during warehouse internet fluctuations.

---

## 🔑 Pre-Configured Portal Accounts

| Role | Email / User ID | Default Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Internal Operations Admin** | `admin@labeltrack.com` | `AdminOps2026!` *(or `admin123`)* | Full Ops Command (Orders, Inward, Scorecards, Vendors) |
| **Warehouse Gatekeeper** | `gate@labeltrack.com` | `GateSecurity2026!` *(or `gate123`)* | Gate Receiving Terminal & Physical Inspection |
| **Sample Supplier A (Apex Print)** | `dispatch@apexprint.com` | `vendor123` | Vendor Self-Service & Truck Dispatch Entry |
| **Sample Supplier B (Royal Roll)** | `dispatch@royalprinters.com` | `vendor123` | Vendor Self-Service & Truck Dispatch Entry |
| **Sample Supplier C (Premier Labels)** | `vendor@example.com` | `vendor123` | Vendor Self-Service & Truck Dispatch Entry |

> **Note**: Passwords can be changed anytime by clicking the **🔑 Password** button in the top navigation bar.

---

## 💻 Local Development & Testing

Run the included lightweight Node.js server:

```bash
# Navigate to the project folder
cd labeltrack-app

# Start the server (Port 3000)
node server.js
```

Open your browser and navigate to:
```text
http://localhost:3000
```

---

## 🚢 Production Deployment

### Option 1: Deploy to Vercel (Recommended)
1. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com/new).
3. Vercel automatically detects `vercel.json` and configures global edge CDN caching and security headers. Click **Deploy**.

### Option 2: Deploy to Any Static Web Server
Because the application is completely client-optimized and connects directly to Supabase, it can be deployed on any static web hosting provider (Netlify, Cloudflare Pages, AWS S3 / CloudFront, Apache, Nginx) by serving the root directory.
