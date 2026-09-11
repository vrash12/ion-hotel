# ion-hotel

A responsive, unofficial website concept for Ion Hotel Baguio. Built for prospect demonstrations with HTML, CSS and vanilla JavaScript. No dependencies or build process are required.

## Preview

Open `index.html`, or run `python -m http.server 4174 --bind 127.0.0.1` in this folder and visit `http://127.0.0.1:4174/`.

## Included

- Responsive navigation and a photo-led homepage.
- Three room cards with accessible details dialogs and inquiry shortcuts.
- Hotel amenities, neighborhood information and real phone/Facebook/map links.
- A six-photo gallery with filtering and keyboard-accessible photo navigation.
- A demonstration inquiry form with date validation. Details are never sent or stored; no room is reserved.
- Visible unofficial concept notices and `noindex, nofollow` metadata.

## Customize

Hotel facts, room information, image mappings and amenities are in `js/hotel-data.js`. Editorial copy and document metadata are in `index.html`. Brand tokens, layouts and mobile breakpoints are in `css/main.css`. Shared interaction code is in `js/main.js`.

Local images use relative paths, so they work at the GitHub Pages project path. Refer to `SOURCES.md` for photo provenance and content limitations. Source photos are reference material for this unofficial concept; reuse licenses have not been independently established.

## GitHub Pages

Repository: https://github.com/vrash12/ion-hotel

In Settings → Pages, select **Deploy from a branch**, **main**, and **/ (root)**. The `.nojekyll` file serves the plain static assets.

Expected site address: https://vrash12.github.io/ion-hotel/

This is a static demonstration. A live inquiry service or booking engine would require separate integration and hotel approval.
