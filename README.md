# Lumière Hair Studio — Website

A static, multi-page website for a hair salon. Plain HTML/CSS/JS, no build step.

## Structure

```
index.html          Home page
services.html        Services & pricing
about.html            About / team
contact.html          Contact & booking form
css/style.css         Shared styles (palette, typography, components)
js/script.js          Mobile nav toggle, active link highlighting, form handling
images/                Image assets (placeholder — add real photos here)
```

## Running locally

No build tools needed. Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- Placeholder branding: name ("Lumière"), colors, copy, address, and photos are all placeholders — swap in real salon details.
- The contact form (`contact.html`) is front-end only; it doesn't send data anywhere yet. Connect it to a backend or a form service (e.g. Formspree, Netlify Forms) before going live.
- Hero and team images are CSS gradient placeholders — replace with real photos in `images/`.
