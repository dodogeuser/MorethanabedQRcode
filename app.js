/* All interactions run in the browser. No APIs, tracking, or stored visitor data. */
'use strict';

const whatsapp = {
  support: { phone: '96181002889', message: "Hello! I'm currently staying at a More Than A Bed property and need assistance.\n\nApartment / Property name:\nGuest name:\nIssue related to:" },
  apartments: { phone: '96171333768', message: "Hi! I'm interested in booking a short-stay apartment with More Than A Bed (minimum 2 nights).\n\nCheck-in date:\nCheck-out date:\nNumber of guests:\n\nCould you please share available options?" },
  guesthouses: { phone: '9613576426', message: "Hi! I'm interested in booking a guesthouse with More Than A Bed (minimum 1 night).\n\nCheck-in date:\nCheck-out date:\nNumber of guests:\n\nCould you please share availability and rates?" },
  longTerm: { phone: '96171333768', message: "Hi! I'm looking for a monthly or long-term rental with More Than A Bed.\n\nPreferred move-in date:\nExpected duration:\nPreferred location:\nMonthly budget:\nNumber of occupants:\n\nCould you please share suitable options?" },
  owners: { phone: '96171333768', message: "Hello! I'm a property owner interested in More Than A Bed's property management services.\n\nProperty location:\nProperty type:\nNumber of bedrooms:\n\nI'd like to learn more about your management services." }
};

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const { phone, message } = whatsapp[link.dataset.whatsapp];
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
});

document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => document.getElementById(button.dataset.dialog).showModal());
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});

const shareDialog = document.getElementById('share-dialog');
const shareInput = document.getElementById('share-url');
const shareTitle = document.getElementById('share-title');
const copyButton = document.getElementById('copy-link');
const copyStatus = shareDialog.querySelector('.copy-status');
const nativeShareButton = document.getElementById('native-share');

function openShare(title, url) {
  shareTitle.textContent = title;
  shareInput.value = url;
  copyButton.textContent = 'Copy link';
  copyStatus.textContent = '';
  nativeShareButton.hidden = !navigator.share || !/^https?:/.test(url);
  shareDialog.showModal();
}

document.querySelector('[data-share-profile]').addEventListener('click', () => {
  // A file:// address cannot be opened by other people. Share the public reference in that case.
  const url = location.protocol === 'file:' ? 'https://linktr.ee/morethanabedbeirut' : new URL(location.pathname, location.origin).href;
  openShare('Share More Than A Bed', url);
});

document.querySelectorAll('.share-card').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.link-card');
    const link = card.querySelector('a');
    const title = card.querySelector('.feature-title')?.textContent || link.textContent.trim();
    openShare(title, link.href);
  });
});

copyButton.addEventListener('click', async () => {
  copyStatus.textContent = '';
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(shareInput.value);
    copyButton.textContent = 'Copied!';
    copyStatus.textContent = 'Link copied to clipboard.';
  } catch {
    shareInput.focus();
    shareInput.select();
    copyStatus.textContent = 'Select and copy the link above using your device’s copy command.';
  }
});

nativeShareButton.addEventListener('click', async () => {
  try {
    await navigator.share({ title: shareTitle.textContent, url: shareInput.value });
  } catch (error) {
    if (error.name !== 'AbortError') copyStatus.textContent = 'Sharing is unavailable here. Use Copy link instead.';
  }
});
