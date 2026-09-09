# AVD 360 Solution — Website

Production-ready marketing website for **AVD 360 Solution** — an integrated
Business Excellence and Digital Transformation company.

_Elevating Business Performance • Not Just Software. A System. A Solution._

Built with **Next.js 14 (App Router) + TypeScript**, **Tailwind CSS**,
**MongoDB (Mongoose)**, **react-hook-form + Zod**, and **Framer Motion**.

---

## Features

- **Pages:** Home, About, Services, AVD 360 Platform, Why Us, Contact
- **Brand theme:** navy / gold / gradient-blue palette with logo-style gold-dot
  dividers, angular accents and Poppins typography
- **Contact form** wired to `POST /api/contact`, validated with Zod on client
  **and** server, saved to MongoDB, with success/error feedback
- **Optional email notification** (Resend) when a form is submitted — cleanly
  skipped if not configured
- **Newsletter** endpoint `POST /api/newsletter`
- **Protected admin read** `GET /api/contact` (Bearer token) for future use
- **SEO:** per-page metadata, OpenGraph/Twitter tags, `sitemap.xml`, `robots.txt`
- Fully responsive, mobile-first, with a hamburger menu on small screens
- Reusable component library (`components/`) and centralized content
  (`lib/content.ts`)

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable             | Required | Description                                                        |
| -------------------- | -------- | ------------------------------------------------------------------ |
| `MONGODB_URI`        | Yes      | MongoDB Atlas connection string                                    |
| `RESEND_API_KEY`     | No       | Resend API key for contact email notifications                     |
| `CONTACT_NOTIFY_TO`  | No       | Address that receives notifications                                |
| `CONTACT_NOTIFY_FROM`| No       | Verified sender (defaults to `onboarding@resend.dev`)              |
| `ADMIN_API_TOKEN`    | No       | Bearer token to protect `GET /api/contact`                         |

> If email variables are omitted, submissions are still saved to MongoDB and
> email notification is skipped silently.

### 3. Set up MongoDB Atlas

1. Create a free cluster at <https://www.mongodb.com/atlas>.
2. Create a database user and allow your IP (or `0.0.0.0/0` for testing).
3. Copy the connection string and set it as `MONGODB_URI` in `.env.local`,
   e.g. `mongodb+srv://user:pass@cluster.mongodb.net/avd360?retryWrites=true&w=majority`.

Collections (`contacts`, `subscribers`) are created automatically on first write.

### 4. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>.

---

## Brand logo

The site ships with a generated brand placeholder at **`public/logo.svg`** and a
matching **`public/favicon.svg`** (the angular "AVD" mark with the gold triangle
dot and gradient-blue stroke).

To use the real artwork:

1. Drop your file into `public/` (e.g. `public/logo.jpeg`).
2. In `lib/content.ts`, change:
   ```ts
   export const logoSrc = "/logo.jpeg";
   ```
3. Optionally update the OpenGraph image paths in `app/layout.tsx`.

The `Logo` component uses a plain `<img>` so both SVG and JPEG work without
extra Next.js image configuration.

---

## Contact API

### `POST /api/contact`

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@acme.com",
  "phone": "+91 90000 00000",
  "company": "Acme Ltd",
  "service": "ISO Management",
  "message": "We'd like help with ISO 9001 certification."
}
```

`service` must be one of: `Consulting`, `Business Excellence`,
`Quality Management`, `ISO Management`, `Digital Solution`.

### `GET /api/contact` (protected)

Requires `Authorization: Bearer <ADMIN_API_TOKEN>`. Returns the latest 200
submissions. Returns `503` if `ADMIN_API_TOKEN` is not set.

---

## Deploy to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project at <https://vercel.com/new>.
3. Add the environment variables (`MONGODB_URI`, and optionally the email +
   admin variables) in **Project → Settings → Environment Variables**.
4. In MongoDB Atlas, allow Vercel egress (use `0.0.0.0/0` or Atlas's network
   access settings).
5. Deploy. The `lib/mongodb.ts` connection cache is serverless-safe.

---

## Scripts

| Command         | Description               |
| --------------- | ------------------------- |
| `npm run dev`   | Start the dev server      |
| `npm run build` | Production build          |
| `npm run start` | Run the production build  |
| `npm run lint`  | Lint the project          |

---

## Project structure

```
app/
  api/contact/route.ts      POST (save) + GET (protected list)
  api/newsletter/route.ts   POST subscribe
  about | services | platform | why-us | contact
  layout.tsx | page.tsx | globals.css | sitemap.ts | robots.ts
components/                 Reusable UI (Navbar, Footer, cards, forms, …)
lib/                        content, validation (zod), mongodb, email, utils
models/                     Mongoose schemas (Contact, Subscriber)
public/                     logo.svg, favicon.svg
```

---

© AVD 360 Solution. Let's Build Smarter Businesses Together.
