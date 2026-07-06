# Wellcare Advanced Laboratory — Website

A modern, production-ready 3-page website for Wellcare Advanced Laboratory, built with React, Vite, React Router, and Framer Motion.

## Pages

- **Home** — Hero, services (test panels), mission/vision, why choose us, call-to-action
- **About Us** — Lab introduction, mission, vision, why choose us
- **Contact Us** — Contact details, EmailJS-powered contact form, Google Map

## Tech Stack

- React 18 + Vite
- React Router v6
- Framer Motion (animations)
- React Icons
- EmailJS (`@emailjs/browser`) — frontend-only contact form email
- Plain CSS with a design-token system (no Tailwind build step required)

---

## 1. Install dependencies

```bash
npm install
```

## 2. Add your real logo

Replace the placeholder file at:

```
src/assets/logo.png
```

with your actual Wellcare Advanced Laboratory logo (PNG, ideally square, transparent or white background works best). No code changes are needed — it's referenced by filename throughout the site (Navbar, Hero, Footer, About page).

Also update `public/favicon.png` with a small square version of your logo if you'd like a custom browser tab icon.

## 3. Set up EmailJS (for the Contact form)

The Contact page sends form submissions via [EmailJS](https://www.emailjs.com) — no backend required.

### Steps:

1. **Create a free EmailJS account** at https://www.emailjs.com
2. **Add an Email Service** (e.g. Gmail, Outlook) under *Email Services* → note the **Service ID**
3. **Create an Email Template** under *Email Templates*. Use these variable names in your template so they match the form field `name` attributes:
   - `{{name}}`
   - `{{email}}`
   - `{{reason}}`
   - `{{message}}`

   Example template body:
   ```
   New contact form submission from Wellcare Advanced Laboratory website

   Name: {{name}}
   Email: {{email}}
   Reason: {{reason}}
   Message: {{message}}
   ```
   Note the **Template ID**.
4. **Get your Public Key** under *Account* → *General* → *API Keys*.
5. **Create a `.env` file** in the project root (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

6. Fill in your real values in `.env`:

   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

7. Restart the dev server after editing `.env` (Vite only reads env files on startup).

> The contact form will show a clear error message in the UI (and a console warning) if these variables are missing, so it fails gracefully rather than silently.

## 4. Run the dev server

```bash
npm run dev
```

Visit the printed local URL (typically `http://localhost:5173`).

## 5. Build for production

```bash
npm run build
```

Output is generated in `dist/`. Preview the production build locally with:

```bash
npm run preview
```

---

## Editable contact details

All phone numbers, WhatsApp number, email, and address live in one place for easy editing:

```
src/utils/site.js
```

Update the `SITE` object there to change contact info site-wide (Navbar, Footer, Hero, Contact page, booking WhatsApp messages, and the map embed all read from this file).

## Booking flow (WhatsApp)

The "Book Appointment" button opens a modal collecting Name, Phone, Preferred Date, Preferred Time, and an optional Message. On submit, it builds a pre-filled WhatsApp message and opens `https://wa.me/917598735468?text=...` in a new tab — no backend or database involved.

## Folder structure

```
src/
  assets/          logo.png (replace with real logo)
  components/      Navbar, Footer, Hero, Services, BookingModal, etc.
  pages/           Home.jsx, About.jsx, Contact.jsx
  styles/          globals.css (design tokens, base styles)
  utils/           site.js (shared contact constants + WhatsApp URL builder)
```

## Notes

- No backend, no database, no login system — purely frontend, as specified.
- `prefers-reduced-motion` is respected; animations are disabled for users who request it at the OS level.
- The contact form and booking form both include client-side validation with inline error messages.
