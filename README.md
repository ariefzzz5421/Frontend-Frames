# Frontend Frames

An expanding collection of interactive web design concepts. The canonical site is `https://frontend-frames.vercel.app/`.

| Route | Design | Recreation prompt |
| --- | --- | --- |
| `/` | Collection | — |
| `/designs/leon-vasari/` | Fictional filmography VHS shelf | `/prompts/leon-vasari.txt` |
| `/designs/orvante/` | Fictional branding studio | `/prompts/orvante.txt` |

The deployed Vercel project serves `dashboard/` as its root directory. The former Leon Vasari project at `frontend-design-woad.vercel.app` redirects to its route in Frontend Frames. The custom domain `frames.ariefz.xyz` is attached to the collection project but requires its DNS CNAME at the domain provider before it will resolve.

## Run locally

From the repository root:

```sh
python -m http.server 4747 --directory dashboard
```

Open `http://localhost:4747/`. There is no build step or runtime dependency. The designs use remote artwork and need an internet connection for those images. Fonts in the design pages are embedded.

## Add another design

1. Create `dashboard/designs/<slug>/index.html` and link its back control to `../../`.
2. Add an optimized preview to `dashboard/media/` and a newly written recreation prompt to `dashboard/prompts/`.
3. Add a card to `dashboard/index.html` with same-origin design links and a `.show-prompt` button carrying `data-prompt`, `data-title`, and `data-number`.
4. Update the collection count, verify mobile and desktop, and deploy.

The visual references were sourced from [MotionSites AI](https://motionsites.ai/). The copyable prompts in this repo are independently written recreation briefs. Film details, studio statistics, and client names are fictional concept content.
