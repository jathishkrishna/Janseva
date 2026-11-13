# JANSEVA – All Government Benefits in One Place
> **"Your Rights. Your Benefits. One Platform."**  
> *ನಿಮ್ಮ ಹಕ್ಕು. ನಿಮ್ಮ ಸೌಲಭ್ಯ. ಒಂದೇ ವೇದಿಕೆ.*

**JANSEVA** is a modern, high-impact, full-stack government technology web application designed to help citizens across Karnataka and India discover scholarships, government schemes, direct financial assistance, and public services with transparent, database-driven eligibility matching.

---

## 🌟 Hackathon Presentation Highlights

1. **Complete Bilingual Experience (English & ಕನ್ನಡ):**
   - Seamless one-click language toggle in the navbar.
   - Comprehensive translation system with typography tuned using *Noto Sans Kannada*.
   - Preserves official departmental names while translating instructions naturally.

2. **Smart Rule-Based Eligibility Engine:**
   - Multi-step, private assessment comparing user criteria against database rules.
   - Dynamic evaluation across age limits, income ceilings, education levels, domicile/state restrictions, occupation, and gender.
   - Transparent classifications: **Eligible**, **Possibly Eligible** (missing verification info), and **Not Eligible**.
   - Detailed per-scheme breakdown: satisfied requirements, missing fields, failed rules, benefits offered, and required documents checklist.

3. **Karnataka State & Central Government Coverage:**
   - Real, verified flagship schemes:
     - **Karnataka SSP Post-Matric Scholarship** (Post-matric fee reimbursement & stipends)
     - **Karnataka Yuva Nidhi Scheme** (₹3,000/month for graduates, ₹1,500/month for diploma holders)
     - **Karnataka Gruha Lakshmi Scheme** (₹2,000/month direct cash transfer to female head of household)
     - **Karnataka Vidyasiri Scheme** (Food & accommodation allowance for rural students)
     - **Seva Sindhu Citizen Services** (Nadakacheri income, caste, and residence certificates)
     - **PM-KISAN** (₹6,000/year income support for landholding farmers)
     - **PM Awas Yojana - Gramin (PMAY-G)** (₹1.20L pucca house construction grant)
     - **National Means-cum-Merit Scholarship (NMMSS)** (₹12,000/yr for meritorious students)
     - **PM Mudra Yojana (PMMY)** (Collateral-free enterprise loans up to ₹10 Lakhs)
     - **Atal Pension Yojana (APY)** (Guaranteed monthly pension net for informal sector)

4. **Zero Middlemen & Strict Privacy:**
   - No Aadhaar numbers, biometric details, or bank account credentials requested or stored.
   - Every scheme links directly to official government portals (`.gov.in` / `.nic.in`).

5. **Citizen & Admin Portals:**
   - **Citizen Dashboard:** Save favourite schemes, view check history, and update or delete personal profile criteria.
   - **Admin Management Portal:** Add, edit, or archive schemes, configure eligibility rules with custom operators, manage required documents, and update verification timestamps.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24.22.1)
- **npm** v10+

### 2. Installation
```bash
# Clone or navigate to the project directory
cd janseva

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
npm run preview
```

### 5. Run Automated Tests
```bash
node tests/eligibilityEngine.test.js
```

---

## 🗄️ Supabase Backend & PostgreSQL Setup

JanSeva provides a **dual-mode architecture**:
- **Live Supabase Mode:** Connects to your PostgreSQL database with Row Level Security (RLS) policies.
- **Local Persistent Store Mode:** Automatically active out-of-the-box with full schema parity and persistent `localStorage`, so you can test all features immediately without configuring credentials.

### To Connect Your Live Supabase Project:

1. Create a project on [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase dashboard.
3. Run the schema migrations from:
   - `supabase/migrations/01_init_schema.sql` (Creates tables, extensions, foreign keys, indexes)
   - `supabase/migrations/02_rls_policies.sql` (Sets up Row Level Security and admin authorization)
4. Run the seed data script from:
   - `supabase/seed.sql` (Inserts initial verified Karnataka & Central schemes, rules, and documents)
5. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
6. Restart the development server (`npm run dev`). The status indicator in the top navbar will switch to **Supabase (Live)**.

---

## 🔑 Demo Accounts for Review & Testing

For fast demonstration without manual registration:

| Role | Email | Password | Access |
|---|---|---|---|
| **Citizen (Demo)** | `citizen@janseva.org` | `citizen123` | Search, Eligibility Checker, Favourites, Profile |
| **Admin (Nodal Officer)** | `admin@janseva.gov.in` | `admin123` | Full Admin Dashboard, Scheme CRUD, Rule Editor |

*Tip: On the `/login` page, you can click the **"Demo Citizen"** or **"Demo Admin"** quick buttons for 1-click credential population!*

---

## 📐 Database Schema & Architecture

- **`categories`**: Benefit category pillars (Scholarships, Government Schemes, Financial Assistance, Public Services).
- **`schemes`**: Government level (`Karnataka` / `Central`), bilingual titles, descriptions, benefits, application instructions, deadlines, verification status.
- **`eligibility_rules`**: Dynamic rules (`field_name`, `operator`, `expected_value`, `is_mandatory`, `rule_description_en`, `rule_description_kn`).
  - Operators: `equals`, `not_equals`, `greater_than_or_equal`, `less_than_or_equal`, `in`, `not_in`, `contains`.
- **`required_documents`**: Mandatory and optional official document checklists.
- **`saved_schemes`**: Citizen bookmarks with user foreign keys.
- **`eligibility_checks`**: Log of profile checks with outcome statistics.
- **`eligibility_results`**: Deep condition-level breakdown (matched, missing, failed rules).
- **`admin_roles`**: PostgreSQL-enforced administrative authorization for content moderation.

---

## 🛡️ Official Public Disclaimer

> **JanSeva is an independent discovery and information platform.**  
> It is not affiliated with or operated by any government department. Scheme eligibility, selection, document verification, and fund disbursement are strictly executed by the respective government authorities. All external application buttons route to official government domains (`.gov.in` / `.nic.in`).
