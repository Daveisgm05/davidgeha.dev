# David Geha — Portfolio

Personal portfolio site for David Geha, creative developer & designer. Built with React and Vite.

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/) (dev server + build)
- Plain CSS (per-component stylesheets)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
public/                 static assets (favicon, hero image)
src/
  App.jsx               page composition
  components/           Header, SelectedWork, About, MyWork, Contact, Reveal
  index.css / App.css   global styles
index.html              document shell + SEO meta
```

## Still to personalize

- Real project content in `src/components/SelectedWork.jsx` and `src/components/MyWork.jsx`
- Contact email and social handles in `src/components/Contact.jsx` (see the `TODO` notes)
- About-section copy and stats in `src/components/About.jsx`
