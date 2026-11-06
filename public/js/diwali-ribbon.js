/* A brief, opt-in Diwali greeting. No persistent animation or stored state. */
(function () {
  'use strict';
  document.querySelectorAll('[data-diwali-ribbon]').forEach(function (ribbon) {
    if (ribbon.dataset.diwaliBound === 'true') return;
    var button = ribbon.querySelector('.diwali-flame-button');
    var caption = ribbon.querySelector('[data-diwali-caption]');
    if (!button || !caption) return;
    ribbon.dataset.diwaliBound = 'true';
    var timer = 0;
    var initial = caption.dataset.defaultCaption || caption.textContent;
    function reset() {
      window.clearTimeout(timer);
      timer = 0;
      ribbon.dataset.lit = 'false';
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', 'Light the Diwali lamps');
      caption.textContent = initial;
    }
    button.addEventListener('click', function () {
      window.clearTimeout(timer);
      ribbon.dataset.lit = 'true';
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', 'Keep the Diwali lamps lit');
      caption.textContent = 'Happy Diwali · bright beginnings.';
      timer = window.setTimeout(reset, 6000);
    });
    document.addEventListener('visibilitychange', function () { if (document.hidden) reset(); });
    window.addEventListener('pagehide', reset);
  });
})();
