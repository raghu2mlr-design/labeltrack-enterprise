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

### 4. 🎨 Universal Annual Master Color Codes & Technical Proofs
- Centralized fiscal year master color bands (e.g., 2026 Mandate) to enforce visual inventory aging and eliminate counterfeiting.
- Direct modal viewer for approved high-resolution technical specimen artwork before dispatch and during gate receipt.

### 5. 📄 Smart High-Fidelity Invoice & Challan Compression
- Automatically optimizes smartphone photos and scanned delivery challans down to **~200 KB – 300 KB** (75%–92% reduction) directly in the browser via canvas bicubic downsampling.
- Retains Full HD 1920px resolution for sharp barcode scans, signatures, and tax invoice details.
- PDF documents are preserved in their original vector format.

### 6. 🏢 Warehouse Gatekeeper Receiving & 3-Way Reconciliation
- Separate warehouse inspection terminal to record physical offloaded box counts, accept good units, and log damaged pieces.
- Photographic defect logging and discrepancy flags (Exact Match, Shortfall, Over-Delivery).
- Generates live Supplier Quality Scorecards and reliability ratings.

### 7. ☁️ Dual-Layer Cloud Persistence (Offline Resilient)
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
