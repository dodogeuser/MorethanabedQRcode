# More Than A Bed — static profile

A responsive recreation of https://linktr.ee/morethanabedbeirut using only HTML, CSS, and vanilla JavaScript. No dependencies, build step, backend, database, or cookies. Optional analytics integration is included and disabled by default.

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

## Optional Pulse analytics

Integration is prepared but **live collection is disabled** because no public analytics server is hosted yet. GitHub Pages serves static files and cannot run the Pulse Node.js collector.

1. Host `/home/georges/Desktop/WebsiteTrackingDashboard` behind a public HTTPS origin after adding dashboard authentication and ingestion protection.
2. Set `serverUrl` in `analytics-config.js` to that origin, for example `https://analytics.yourdomain.com`. Do not use localhost on the live website.
3. Publish these website files using the existing GitHub Pages workflow.
4. In Pulse, click Connect website and enter this website's live URL and the collector origin.
5. Visit the published site, choose Allow analytics, and click a link. Pulse refreshes every 10 seconds. Declining sends no events.

The local `analytics.js` handles collection; do not also install `/tracker.js`, which would duplicate events and bypass this consent integration. Cookie preferences lets visitors enable or disable future collection. No WhatsApp message query strings or URL fragments are included in recorded destinations. Browser storage restrictions or blockers may prevent collection.
