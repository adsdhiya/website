// Decorative CSS animations only run while their section is in view.
(function () {
  var sections = Array.from(document.querySelectorAll('.bento, .architecture-reference, .pimg'));
  if (!sections.length || typeof IntersectionObserver === 'undefined') return;
  var visibility = new Map(), leaving = false;
  function sync(element) {
    element.classList.toggle('motion-paused', !visibility.get(element) || document.hidden || leaving);
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visibility.set(entry.target, entry.isIntersecting);
      sync(entry.target);
    });
  }, { rootMargin: '80px 0px', threshold: 0 });
  sections.forEach(function (element) {
    visibility.set(element, false);
    sync(element);
    observer.observe(element);
  });
  function syncAll() { sections.forEach(sync); }
  document.addEventListener('visibilitychange', syncAll);
  window.addEventListener('pagehide', function () { leaving = true; syncAll(); });
  window.addEventListener('pageshow', function () { leaving = false; syncAll(); });
})();
