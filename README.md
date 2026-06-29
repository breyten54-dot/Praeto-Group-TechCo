# Praeto Group TechCo — Landing Page

A professional landing page and client onboarding questionnaire for Praeto Group TechCo, a tech company that builds tailored apps for businesses moving online.

## Files

- `index.html` — Main landing page with hero, services, process, and questionnaire sections
- `styles.css` — Responsive styling with a dark theme and gold accent
- `scripts.js` — Form validation, mobile menu, and success-state handling

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

- The questionnaire collects business identity, project goals, scope preferences, and contact details.
- Form submission currently shows a local success message and logs the collected data to the browser console.
- To connect the form to a backend or email service, replace the success-state logic in `scripts.js` with an API call.
