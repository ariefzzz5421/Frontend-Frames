# Ariefz Frames

This repository contains two static sites:

- [Leon Vasari filmography](index.html), the interactive VHS shelf.
- [Ariefz Frames dashboard](dashboard/index.html), the collection home with a live-site link and a copyable [original build prompt](dashboard/prompts/leon-vasari.txt).

The filmography is deployed at https://frontend-design-woad.vercel.app/ and links back to the collection at https://ariefz-frames.vercel.app/. The dashboard lives in a separate Vercel project whose root directory is dashboard/, so both sites can deploy from the same repository without changing the filmography URL. The custom domain frames.ariefz.xyz is attached to the dashboard project and awaits a CNAME record at the external DNS provider.

## Run locally

From the repository root:

~~~sh
python -m http.server 4747
~~~

Open http://localhost:4747/ for the filmography and http://localhost:4747/dashboard/ for the collection. There is no build step or runtime dependency.

The shelf supports clicking tapes, decade tabs, arrows, wheel scrolling, dragging, and Left/Right/Enter/Escape keyboard controls. The film details are fictional; the watch button explains that no stream is available.

Artwork is loaded from the four Higgsfield sheet URLs supplied in the brief. Fonts are embedded in the HTML. The page needs an internet connection for the artwork.
