# Praeto Group TechCo — Landing Page

A professional landing page and client onboarding questionnaire for Praeto Group TechCo, a tech company that builds tailored apps for businesses moving online.

## Files

- `index.html` — Landing page with animated Scorpion-style intro, hero, services, process, and questionnaire sections
- `styles.css` — Responsive styling with dark theme, gold accent, and intro animations
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
- Form submission currently shows a local success message and logs the collected data to the browser console.
- To connect the form to a backend or email service, replace the success-state logic in `scripts.js` with an API call.
