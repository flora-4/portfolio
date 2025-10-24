# portfolio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
# Portfolio

Personal portfolio built with Vue 3 and Vite. This project showcases projects, skills, experiences and formations with a modern, animated UI.

Live demo: https://flora-4.github.io/portfolio/

---

## Table of contents

- About
- Features
- Tech stack
- Getting started
  - Prerequisites
  - Install
  - Run (dev / build / preview)
- Deploying to GitHub Pages
- Project structure (key files)
- Notable components
- Contributing
- License & contact

---

## About

This repository contains a personal portfolio web app created with Vue 3 and Vite. It uses component-driven architecture and includes animated sections (projects, skills, experiences, formations) and a responsive design.

The project is configured to be deployed to GitHub Pages under the `/portfolio/` base path (see `vite.config.js` and `package.json`).

## Features

- Vue 3 single-file components (SFCs)
- Smooth animations and responsive layout
- A timeline-style "Formations" section with SVG arc visuals and animated cards
- Contact form (email sending via a browser email client or EmailJS if configured)
- Easy GitHub Pages deployment script

## Tech stack

- Vue 3
- Vite
- Tailwind CSS (plugin usage present)
- PostCSS / Autoprefixer
- GH Pages deployment via `gh-pages`

## Getting started

### Prerequisites

- Node.js (see `package.json` engines): recommended Node 20.x or newer compatible version
- npm (comes with Node)

### Install

Open a terminal in the project root and run:

```powershell
npm install
```

### Run development server

```powershell
npm run dev
```

This starts Vite and opens a hot-reloading dev server (check the terminal for the local URL).

### Build for production

```powershell
npm run build
```

### Preview production build locally

```powershell
npm run preview
```

## Deploying to GitHub Pages

This project includes a `deploy` script in `package.json` that uses `gh-pages`:

```powershell
npm run build; npm run deploy
```

Notes for GitHub Pages:

- `vite.config.js` sets `base: '/portfolio/'` so built assets expect to be served from `/portfolio/`.
- `package.json` includes `homepage: "https://flora-4.github.io/portfolio/"` which helps some tools and previews.
- If you deploy to a custom domain or to the repository root, update `base` in `vite.config.js` and remove or update the `homepage` field accordingly.

## Project structure (key files)

Top-level

- `index.html` — app entry
- `package.json` — scripts & dependencies
- `vite.config.js` — Vite config (includes `base: '/portfolio/'`)

Source

- `src/main.js` — app bootstrap
- `src/App.vue` — root component
- `src/router/index.js` — Vue Router setup
- `src/views/Home.vue` — main page
- `src/components/` — UI components
  - `AboutMe.vue`
  - `Background.vue`
  - `ContactSection.vue`
  - `experiences.vue`
  - `Formations.vue`  ← formation timeline with animated SVG and responsive cards
  - `GlobeTech.vue`
  - `PortfolioHeader.vue`
  - `projects.vue`
  - `skills.vue`

Assets

- `src/assets/` — images and CSS (`main.css` is present)

Public

- `public/` — static assets copied to `dist/`

## Notable component: `Formations.vue`

This component (located at `src/components/Formations.vue`) displays the academic/professional parcours. Key details:

- Uses an array of formation objects (title, school, date, description, image)
- Renders an SVG arc visual with animated stroke and dots to indicate timeline points
- Each timeline card includes an image (with error handling fallback), title, school and description
- Responsive CSS included for mobile/tablet/desktop

## Customization tips

- Update the `formations` array in `src/components/Formations.vue` to change the timeline entries.
- Replace images in `src/assets/` and update imports in components.
- To change the base path for deployment, edit `base` in `vite.config.js` and the `homepage` field in `package.json`.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch
3. Make changes and add small commits
4. Open a pull request describing the change

If you add or change public behavior, include a small note in this README or add tests where applicable.

## License

No license file is included in this repository. If you want to make this project open-source, consider adding a `LICENSE` (MIT, Apache-2.0, etc.).

## Contact

If you want to get in touch, add contact information here (email, LinkedIn, etc.).

---

Thanks for checking out the portfolio — feel free to edit the content and make it your own.
