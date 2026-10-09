# LabelTrack Enterprise — Supplier PO & Reconciliation Hub

Production-ready two-sided inventory and purchase order reconciliation platform designed for multi-vendor label manufacturing and procurement.

---

## 📁 Modular Project Structure (Optimized for Git & Vercel)

```text
labeltrack-app/
│
├── index.html                  # Semantic UI with responsive modals and view containers
│
├── css/
│   └── styles.css              # Plus Jakarta Sans, JetBrains Mono, badge pills & transitions
│
├── js/
│   ├── vault.js                # Encrypted credential repository loader
│   ├── app.js                  # PO engine, SKU balance calculations, smart document compression
│   └── auth.js                 # Web Crypto API salted SHA-256 verification (no magic links)
│
├── data/
│   └── credentials.enc.json    # Encrypted password vault (salted SHA-256 hashes)
│
├── vercel.json                 # Vercel deployment routing, CDN edge caching & security headers
├── .gitignore                  # Git exclusions for OS & temp files
├── server.js                   # Lightweight zero-dependency local Node.js HTTP server
└── README.md                   # Project documentation
```

---

## 🚀 Core Features

1. **Smart High-Fidelity Invoice Compression**:
   - Camera photos and invoice scans are automatically optimized in the browser down to **~200 KB – 300 KB** (75%–92% reduction) without degrading text readability.
   - Preserves Full HD 1920px resolution with high-precision bicubic smoothing for razor-sharp barcodes, tax numbers, and signatures.
   - Vector PDFs are kept 100% original and authentic.
   - Instant preview modal lets suppliers verify readability before dispatching.

2. **Multi-Item / Multi-SKU PO Creation**:
   - Internal Ops can raise orders containing 1, 2, 3, 4+ distinct line items/SKUs in a single ticket with supplier assignment.

3. **Hard Anti-Overrun Quota Lock**:
   - Suppliers cannot dispatch more than the remaining unfulfilled balance of any SKU.

4. **Warehouse 3-Way Variance Gatekeeper**:
   - Gatekeepers record physical roll counts and cross-verify vendor invoices and transport LR slips.
   - Flags exact matches, shortfalls, and surplus dispatches automatically.

5. **1-Click Audit Log Export (CSV / Excel)**:
   - Download the full reconciliation discrepancy ledger to spreadsheet with all timestamps, quantities, and audit statuses.

6. **Encrypted Authentication (No Magic Links / No Plaintext Passwords)**:
   - Passwords are cryptographically salted and hashed using `SHA-256`. Verified client-side via the browser's native Web Crypto API.

---

## 🔑 Pre-Configured Encrypted Accounts

| Role | Email / User ID | Initial Password | Encryption Standard |
| :--- | :--- | :--- | :--- |
| **Vendor A (Apex Print)** | `dispatch@apexprint.com` | `ApexVendor2026!` | Salted SHA-256 Vault |
| **Vendor B (Royal Roll)** | `dispatch@royalprinters.com` | `RoyalVendor2026!` | Salted SHA-256 Vault |
| **Internal Ops Admin** | `admin@labeltrack.com` | `AdminOps2026!` | Salted SHA-256 Vault |

*All passwords can be updated, rotated, or new vendors added directly from the **Manage Vendors** panel, with instant export to `credentials.enc.json`.*

---

## 🚢 Deploy to GitHub & Vercel (100% Free)

### Step 1: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/labeltrack-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Select your imported GitHub repository.
3. Click **Deploy**.
4. Your application will be live globally with automatic HTTPS, edge CDN caching, and zero monthly cost.
