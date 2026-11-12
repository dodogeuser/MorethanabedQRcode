/* Optional Pulse analytics. No events are sent before opt-in. */
(() => {
  'use strict';
  let endpoint;
  try {
    const server = new URL(window.PULSE_ANALYTICS?.serverUrl);
    if (server.protocol !== 'https:') return;
    endpoint = new URL('/api/events', server).href;
  } catch { return; }
  const key = 'mtab-analytics-consent';
  const getConsent = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const cleanUrl = value => { try { const u = new URL(value, location.href); return /^https?:$/.test(u.protocol) ? u.origin + u.pathname : ''; } catch { return ''; } };
  let session = '', start = 0, scroll = 0, active = false;
  const device = innerWidth < 768 ? 'Mobile' : innerWidth < 1024 ? 'Tablet' : 'Desktop';
  const send = (type, extra = {}) => {
    if (getConsent() !== 'granted') return;
    const data = JSON.stringify({ type, url: cleanUrl(location.href), referrer: cleanUrl(document.referrer), source: new URLSearchParams(location.search).get('utm_source') || '', session, device, ...extra });
    try {
      if (!navigator.sendBeacon || !navigator.sendBeacon(endpoint, new Blob([data], { type: 'text/plain' }))) {
        fetch(endpoint, { method: 'POST', body: data, keepalive: true }).catch(() => {});
      }
    } catch { /* Analytics must never interrupt navigation. */ }
  };
  const begin = () => {
    if (session || getConsent() !== 'granted') return;
    try { session = sessionStorage.getItem('mtab-pulse-session') || crypto.randomUUID(); sessionStorage.setItem('mtab-pulse-session', session); }
    catch { session = crypto.randomUUID(); }
    active = document.visibilityState !== 'hidden'; start = Date.now();
    send('pageview');
  };
  const finish = () => {
    if (!session || !active) return;
    active = false;
    send('engagement', { seconds: Math.round((Date.now() - start) / 1000), scroll });
  };
  document.addEventListener('click', event => {
    const element = event.target.closest('a, button');
    if (!session || !element || element.closest('#analytics-consent, #cookies-dialog')) return;
    const card = element.closest('.link-card');
    const label = element.getAttribute('aria-label') || element.textContent.trim() || card?.id || 'Unlabeled';
    send('click', { label: label.slice(0, 120), target: element.href ? cleanUrl(element.href) : '' });
  });
  addEventListener('scroll', () => {
    const height = document.documentElement.scrollHeight;
    scroll = Math.max(scroll, Math.min(100, Math.round((scrollY + innerHeight) / Math.max(height, 1) * 100)));
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') finish();
    else if (session && getConsent() === 'granted') { active = true; start = Date.now(); }
  });
  addEventListener('pagehide', finish);
  const banner = document.createElement('section');
  banner.id = 'analytics-consent';
  banner.setAttribute('aria-label', 'Optional website analytics');
  banner.innerHTML = '<p>Help us understand which links are useful. Allow optional analytics for page views, clicks, and engagement?</p><div><button type="button" data-consent="denied">Decline</button><button type="button" data-consent="granted">Allow analytics</button></div>';
  document.body.append(banner);
  banner.hidden = !!getConsent();
  const choose = value => {
    try { localStorage.setItem(key, value); } catch { return; }
    banner.hidden = true;
    if (value === 'granted') begin();
    else { session = ''; active = false; try { sessionStorage.removeItem('mtab-pulse-session'); } catch {} }
    const status = document.getElementById('analytics-status');
    if (status) status.textContent = value === 'granted' ? 'Optional analytics is enabled.' : 'Optional analytics is disabled.';
  };
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => choose(button.dataset.consent)));
  chooseStatus();
  function chooseStatus() {
    const status = document.getElementById('analytics-status');
    if (status) status.textContent = getConsent() === 'granted' ? 'Optional analytics is enabled.' : 'Optional analytics is disabled until you allow it.';
  }
  begin();
})();
