# Praeto Group TechCo — Landing Page

A professional landing page and client onboarding questionnaire for Praeto Group TechCo, a tech company that builds tailored apps for businesses moving online.

## Files

- `index.html` — Landing page with animated Scorpion-style intro, hero, services, process, and questionnaire sections
- `styles.css` — Responsive styling with dark theme, green accent, and intro animations
- `scripts.js` — Intro sequence, form validation, mobile menu, and success-state handling
- `logo.svg` — Custom Praeto Group TechCo logo recreated as an animatable SVG
- `api/send-brief.js` — Vercel serverless function that emails submitted project briefs
- `package.json` — Project dependencies (nodemailer)

## How to view locally

Open `index.html` in any modern web browser:

```bash
# On macOS / Linux
open index.html

# On Windows
start index.html
```

Or serve the folder with any static file server.

## Notes

- The page opens with a Scorpion-inspired animated intro that reveals the Praeto logo before fading into the homepage. The intro plays out fully on every visit.
- The questionnaire collects business identity, project goals & vision, and contact details.
- It focuses on what the client wants the app/website to be and how it will be used — no code, backend, or build questions.

## Email setup (Vercel + Outlook)

Project briefs are sent to **praetotech@outlook.com** via a Vercel serverless function using Outlook SMTP.

### 1. Generate an Outlook app password

Microsoft no longer allows plain passwords for SMTP. You need an app password:

1. Sign in to [https://account.microsoft.com/security](https://account.microsoft.com/security)
2. Enable **Two-step verification** if it is not already on
3. Go to **Advanced security options** → **Create a new app password**
4. Copy the generated 16-character password

### 2. Add environment variables in Vercel

1. Go to your Vercel dashboard → select the Praeto project
2. Open **Settings** → **Environment Variables**
3. Add these two variables:

| Name | Value |
|------|-------|
| `OUTLOOK_EMAIL` | `praetotech@outlook.com` |
| `OUTLOOK_APP_PASSWORD` | the app password you just generated |

4. Redeploy the project (Vercel → Deployments → Redeploy latest)

### 3. Test the form

Fill out and submit the project brief questionnaire. The details should arrive at `praetotech@outlook.com` within a few seconds.

### Troubleshooting

- If emails fail, check the Vercel function logs in **Deployments** → **Functions**
- Make sure `OUTLOOK_APP_PASSWORD` is the app password, not your regular Outlook password
- If Outlook SMTP keeps failing, consider switching to a transactional email service like SendGrid or Resend by editing `api/send-brief.js`
