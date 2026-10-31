# Frontend Frames

An expanding collection of interactive web design concepts. The canonical site is `https://frontend-frames.vercel.app/`.

| Route | Design | Recreation prompt |
| --- | --- | --- |
| `/` | Collection | — |
| `/designs/leon-vasari/` | Fictional filmography VHS shelf | `/prompts/leon-vasari.txt` |
| `/designs/orvante/` | Fictional branding studio | `/prompts/orvante.txt` |
| `/designs/saltwake/` | Two-scene pirate voyage | `/prompts/saltwake.txt` |
| `/designs/lumora/` | Interactive Cadet Skyranger hero | `/prompts/lumora.txt` |
| `/designs/3d-portfolio/` | Fictional creator portfolio | `/prompts/3d-portfolio.txt` |
| `/designs/phoenix-ignis/` | 3D creature field guide | `/prompts/phoenix-ignis.txt` |

The deployed Vercel project serves `dashboard/` as its root directory. The former Leon Vasari project at `frontend-design-woad.vercel.app` redirects to its route in Frontend Frames. The custom domain `frames.ariefz.xyz` is attached to the collection project but requires its DNS CNAME at the domain provider before it will resolve.

## Run locally

From the repository root:

```sh
python -m http.server 4747 --directory dashboard
```

Open `http://localhost:4747/`. The gallery and three new designs are static HTML, CSS, and JavaScript. The 3D Portfolio is authored in React, TypeScript, and Tailwind in `experiments/3d-portfolio/`; its Vite output is committed to `dashboard/designs/3d-portfolio/` so the deployed site remains static. Rebuild it after source changes:

```sh
cd experiments/3d-portfolio
npm install
npm run build
```

The detailed pages use remote artwork or 3D models, so those visuals need an internet connection. The Phoenix guide has an illustration fallback if its 3D models cannot load.

## Add another design

1. Create `dashboard/designs/<slug>/index.html` and link its back control to `../../`.
2. Add an optimized preview to `dashboard/media/` and a newly written recreation prompt to `dashboard/prompts/`.
3. Add a card to `dashboard/index.html` with a same-origin design link, a prompt button, and the right category data for the gallery filters.
4. Update the collection count, verify mobile and desktop, and deploy.

The visual references were sourced from [MotionSites AI](https://motionsites.ai/). The copyable prompts in this repo are independently written recreation briefs. Film details, studio statistics, client names, creature facts, and creator projects are fictional concept content.
