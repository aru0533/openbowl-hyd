# OpenBowl Hyderabad

A 100% transparent street dog feeding & care fund for Hyderabad. Every rupee in
(donations, with UPI/bank RRN) and every rupee out (food & medical spends, with
shop receipts and feeding photos) is published on the site.

@AGENTS.md

## Stack

| Layer      | Choice                                                      |
| ---------- | ----------------------------------------------------------- |
| Framework  | Next.js 16 App Router (`app/`), React 19, `cacheComponents` on |
| Language   | TypeScript, `strict: true`                                  |
| Styling    | Tailwind CSS v4 (CSS-first config in `app/globals.css`, no `tailwind.config`) |
| Data (soon)| Supabase — Postgres for ledger/expenses, Storage for receipts & photos |
| Payments (soon) | Razorpay Checkout (UPI first) + webhook verification   |

This Next.js version differs from older ones — read the relevant guide in
`node_modules/next/dist/docs/` before using an API you haven't checked.

## Layout

```
app/
  layout.tsx          Root layout, fonts, site metadata
  page.tsx            Homepage — composes sections, computes fund summary
  globals.css         Tailwind import + theme tokens
components/           One component per file, kebab-case filenames
  site-header.tsx
  leo-tribute.tsx           Hero — "Leo's Legacy" dedication, portrait (/leo.jpg) + story
  balance-banner.tsx        Section 1 — Collected / Spent / Balance
  sponsor-section.tsx       Section 2 — preset cards + custom amount (client)
  sponsor-preview-modal.tsx Razorpay placeholder modal (client)
  donations-ledger.tsx      Section 3 — verified donations w/ RRN (server shell)
  donations-ledger-list.tsx RRN / donor search + ledger table/cards (client)
  expense-feed.tsx          Section 4 — spend entries w/ receipt + photo proof (server shell)
  expense-feed-list.tsx     Category filter pills + expense cards (client)
  feeding-photo-placeholder.tsx  Inline-SVG photo frame (no external images)
  receipt-preview.tsx       Expandable itemised shop receipt
  site-footer.tsx
lib/
  types.ts            Domain types (Donation, Expense, SponsorTier, FundSummary)
  format.ts           formatINR, formatDate, rupeesToPaise
  mock-data.ts        Day 1 mock data — replaced by Supabase queries later
```

## Conventions

### TypeScript
- Strict mode; no `any`, no non-null `!` unless provably safe. Prefer `type` over
  `interface` for data shapes; export domain types from `lib/types.ts`.
- Component props get an explicit `type XProps = { ... }`.
- Use `readonly` arrays for data passed into presentational components.

### Money (INR)
- **Store and pass all amounts as integer paise** (`Paise` type). This matches
  Razorpay's API and avoids floating-point errors. ₹250 → `25000`.
- **Only** render money through `formatINR()` from `lib/format.ts`
  (`Intl.NumberFormat("en-IN")`, Indian digit grouping: ₹1,00,000).
- Convert user-entered rupees with `rupeesToPaise()`; validate min/max before use.
- Fund totals are derived (sum of donations / expenses), never hard-coded.

### Dates
- Store as ISO strings. Render with `formatDate()`, which pins
  `timeZone: "Asia/Kolkata"` so server and client output match (no hydration diff).
- With `cacheComponents` on, don't call `new Date()` / `Date.now()` during render
  of a Server Component without reading the caching docs first.

### Components
- Server Components by default. Add `"use client"` only to the leaf that needs
  state/effects/browser APIs (currently `sponsor-section`, `sponsor-preview-modal`,
  `donations-ledger-list` and `expense-feed-list`).
- Data fetching/derivation happens in `app/page.tsx` (later: server-side Supabase
  calls); components receive plain props and stay presentational.
- No external image URLs. Placeholders are inline SVG/CSS so nothing breaks. The
  only raster image is `public/leo.jpg` (via `next/image`) in the tribute hero.

### UI
- **Mobile-first**: write base classes for ~360px screens, then layer `sm:`/`md:`/`lg:`.
  Tables collapse into stacked cards below `md`.
- Palette: warm stone background, amber for primary actions, emerald for
  "verified"/positive money, rose for spends. Rounded-2xl cards, subtle borders.
- Accessibility: semantic headings per section (`<section aria-labelledby>`),
  native `<dialog>` for modals, visible focus rings, ≥44px tap targets.
- Transaction IDs (RRN) and receipt numbers render in monospace badges.

## Upcoming integrations

- **Supabase**: tables `donations` (amount_paise, donor_name nullable → "Anonymous",
  message, rrn, verified_at) and `expenses` (amount_paise, description, area,
  spent_on, receipt_path, photo_path). Server-only service key; public reads via RLS.
- **Razorpay**: create order in a Route Handler / Server Action, open Checkout
  client-side, confirm via signature-verified webhook before a donation appears
  in the ledger. Never trust client-reported payment success.

## Commands

```
npm run dev     # dev server
npm run build   # production build (also type-checks)
npm run lint
```
