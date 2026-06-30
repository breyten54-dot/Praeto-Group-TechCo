# Praeto Group TechCo — Landing Page

A professional landing page and client onboarding questionnaire for Praeto Group TechCo, a tech company that builds tailored apps for businesses moving online.

## Files

- `index.html` — Landing page with animated Scorpion-style intro, hero, services, process, and questionnaire sections
- `styles.css` — Responsive styling with dark theme, green accent, and intro animations
- `scripts.js` — Intro sequence, form validation, mobile menu, and success-state handling
- `logo.svg` — Custom Praeto Group TechCo logo recreated as an animatable SVG

## How to view

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
- Form submission sends the project brief to **praetotech@outlook.com** via [EmailJS](https://www.emailjs.com/).
- To enable email delivery, update `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID` in `scripts.js` with your EmailJS credentials. Until then, the form will show the success state locally for testing.

## Email setup (EmailJS)

The project brief form is wired to send submissions to **praetotech@outlook.com** using EmailJS.

1. Sign up for a free account at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create an **Email Service** (e.g., Outlook, Gmail, or any SMTP provider)
3. Create an **Email Template** with variables matching the form field names:
   - `{{companyName}}`, `{{industry}}`, `{{companySize}}`, `{{businessDescription}}`
   - `{{brandValues}}`, `{{existingBranding}}`
   - `{{projectGoal}}`, `{{appType}}`, `{{appTypeOther}}`
   - `{{targetAudience}}`, `{{customerActions}}`, `{{customerIntegrations}}`
   - `{{internalTeam}}`, `{{internalActions}}`, `{{internalIntegrations}}`
   - `{{userActions}}`, `{{integrations}}`
   - `{{successMetrics}}`, `{{inspiration}}`
   - `{{contactName}}`, `{{contactRole}}`, `{{email}}`, `{{phone}}`, `{{extraInfo}}`
   - `{{to_email}}` (set automatically to `praetotech@outlook.com`)
4. Copy your **Public Key**, **Service ID**, and **Template ID**
5. Replace the placeholders in `scripts.js`:

```js
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

6. Deploy the updated file. Submissions will then be emailed to `praetotech@outlook.com`.

### Email template example

```
New Project Brief from {{contactName}} ({{email}})

Company: {{companyName}}
Industry: {{industry}}
Size: {{companySize}}

Business Description:
{{businessDescription}}

Project Goal:
{{projectGoal}}

App/Website Type: {{appType}}
Target Audience: {{targetAudience}}
Customer Actions: {{customerActions}}
Customer Integrations: {{customerIntegrations}}
Internal Team: {{internalTeam}}
Internal Actions: {{internalActions}}
Internal Integrations: {{internalIntegrations}}
Success Metrics: {{successMetrics}}
Inspiration: {{inspiration}}

Contact Role: {{contactRole}}
Phone: {{phone}}
Extra Info: {{extraInfo}}
```
