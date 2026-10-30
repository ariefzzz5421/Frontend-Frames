# Leon Vasari — Filmography

An interactive VHS filmography shelf for the fictional director Leon Vasari. The complete site is in [index.html](index.html): plain HTML, CSS, and JavaScript, with no build step or runtime dependencies.

## Run locally

Serve this directory with any static file server, then open its address in a browser. For example:

~~~sh
python -m http.server 4173
~~~

The shelf supports clicking tapes, decade tabs, arrows, wheel scrolling, dragging, and Left/Right/Enter/Escape keyboard controls. The film details are fictional; the watch button explains that no stream is available.

Artwork is loaded from the four Higgsfield sheet URLs supplied in the brief. Fonts are embedded in the HTML. The page needs an internet connection for the artwork.
