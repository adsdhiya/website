/* Ten local launch appearances, stored only in this browser. No tracking or network call. */
(function () {
  'use strict';
  var dialog = document.querySelector('[data-launch-ceremony]');
  if (!dialog || dialog.dataset.launchBound === 'true' || typeof dialog.showModal !== 'function') return;
  dialog.dataset.launchBound = 'true';
  var key = 'dhiya:diwali-launch:2026:v1', limit = 10;
  var cut = dialog.querySelector('[data-launch-cut]'), skip = dialog.querySelector('[data-launch-skip]');
  var status = dialog.querySelector('[data-launch-status]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timer = 0, state = 'idle', priorFocus = null, priorOverflow = '', storage = null;
  var preview = dialog.dataset.previewAllowed === 'true' && new URLSearchParams(window.location.search).get('launch-preview') === '1';
  var count = 0;
  function readCount(candidate) {
    var raw = candidate.getItem(key), parsed = raw === null ? 0 : Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : limit;
  }
  // Some private modes disallow localStorage. Session storage is a graceful fallback;
  // with neither available, skip the overlay rather than show it forever.
  for (var i = 0; i < 2 && !storage; i++) {
    try {
      var candidate = i === 0 ? window.localStorage : window.sessionStorage;
      count = readCount(candidate);
      if (count >= limit && !preview) return;
      candidate.setItem(key, String(Math.min(count, limit)));
      storage = candidate;
    } catch (_) {}
  }
  if (!preview && !storage) return;
  function finish(restoreFocus) {
    if (state === 'closed') return;
    var wasOpen = state !== 'idle';
    clearTimeout(timer); state = 'closed';
    if (dialog.open) dialog.close();
    // A page can leave before DOMContentLoaded. Nothing was locked or focused
    // yet, so do not overwrite the site's existing scroll/focus state.
    if (!wasOpen) return;
    document.documentElement.style.overflow = priorOverflow;
    document.documentElement.removeAttribute('data-launch-open');
    if (restoreFocus === false) return;
    if (priorFocus && priorFocus !== document.body && priorFocus.isConnected) priorFocus.focus({ preventScroll: true });
    else {
      var home = document.querySelector('.nav-brand');
      if (home) home.focus({ preventScroll: true });
    }
  }
  function inaugurate() {
    if (state !== 'ready') return;
    state = 'cutting'; dialog.dataset.state = 'cutting';
    if (status) status.textContent = 'The ribbon is cut. Welcome to Dhiya. Happy Diwali!';
    if (cut) cut.setAttribute('aria-disabled', 'true');
    // Let the welcome settle before revealing the site, even without motion.
    timer = window.setTimeout(finish, reduced.matches ? 1200 : 3600);
  }
  if (cut) cut.addEventListener('click', inaugurate);
  if (skip) skip.addEventListener('click', finish);
  dialog.addEventListener('cancel', function (event) { event.preventDefault(); finish(); });
  dialog.addEventListener('close', function () { if (state !== 'closed') finish(); });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.target.closest('button,a,input,select,textarea')) { event.preventDefault(); inaugurate(); }
  });
  // Avoid restoring a half-open curtain from the browser's back/forward cache.
  window.addEventListener('pagehide', function () { finish(false); });
  reduced.addEventListener('change', function () {
    if (reduced.matches && state === 'cutting') {
      clearTimeout(timer);
      timer = window.setTimeout(finish, 1200);
    }
  });
  function open() {
    if (state !== 'idle') return;
    priorFocus = document.activeElement;
    priorOverflow = document.documentElement.style.overflow;
    try {
      // Initialization can precede DOMContentLoaded by some time. Respect an
      // appearance counted by another page while this page was still loading.
      if (!preview) {
        count = readCount(storage);
        if (count >= limit) { state = 'closed'; return; }
      }
      dialog.showModal();
      // Mark the open modal before persisting: if storage fails, finish must
      // still close it and restore the exact previous page state.
      state = 'ready';
      if (!preview) storage.setItem(key, String(Math.min(count + 1, limit)));
      dialog.dataset.state = 'ready';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.setAttribute('data-launch-open', 'true');
      if (cut) cut.focus({ preventScroll: true });
    } catch (_) { finish(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', open, { once: true });
  else open();
})();
