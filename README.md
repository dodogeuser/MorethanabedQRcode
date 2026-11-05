# More Than A Bed — static profile

A responsive recreation of https://linktr.ee/morethanabedbeirut using only HTML, CSS, and vanilla JavaScript. No dependencies, build step, backend, database, cookies, or analytics.

## Open

Double-click `index.html` to open it directly. All visual assets are included under `assets/`.

For a local HTTP preview, run `python3 -m http.server 8080 --bind 127.0.0.1` in this directory, then visit http://127.0.0.1:8080. This optional development file server is not an application backend.

## Behavior

- All eight main links retain the original destinations and WhatsApp message templates.
- Each card's three-dot button opens a share dialog; profile sharing, clipboard copying, native sharing where supported, Escape, and backdrop dismissal are implemented.
- Message opens a contact chooser linking to the existing WhatsApp support and reservations numbers. Linktree authentication and messaging are not replicated because they require a backend.
- Follower counts and Instagram previews are static snapshots. No live Instagram connection is required.
- Privacy, cookie preferences, and account information are browser-only dialogs. Report and More from Linktree link to the original external services.
- Original Linktree page imagery and icons are bundled locally. The typeface uses a system sans-serif fallback.

Edit destinations and WhatsApp templates in `index.html` and `app.js`; adjust colors and layout in `styles.css`. The links still open external services, which require an internet connection.
