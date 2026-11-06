/* Select readable navigation ink and menu surfaces. The header itself shows the
 * real backdrop through CSS; this script never paints its background. */
(function () {
  'use strict';
  function start() {
    var nav = document.querySelector('[data-site-navigation]');
    if (!nav || nav.dataset.themeReady === 'true') return;
    nav.dataset.themeReady = 'true';
    var selectors = [
      'body > .stage', 'body > header.phero', 'body > section', 'body > main',
      '.product-page > header.phero', '.product-page > section', '.after > section',
      '.footer-ground > footer'
    ].join(',');
    var surfaces = Array.from(document.querySelectorAll(selectors));
    var cache = [], fallback, headerTop = 0, headerHeight = 72;
    var dirty = true, frame = 0, applied = '';

    function parseColor(value) {
      if (!value || value === 'transparent') return [0, 0, 0, 0];
      var rgb = value.match(/^rgba?\((.*)\)$/i);
      if (rgb) {
        var parts = rgb[1].replace(/,/g, ' ').replace(/\//g, ' ').trim().split(/\s+/);
        return [0, 1, 2].map(function (i) { return parseFloat(parts[i]) * (/%$/.test(parts[i]) ? 2.55 : 1); })
          .concat(parts[3] === undefined ? 1 : parseFloat(parts[3]) / (/%$/.test(parts[3]) ? 100 : 1));
      }
      var srgb = value.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/i);
      if (srgb) return [Number(srgb[1]) * 255, Number(srgb[2]) * 255, Number(srgb[3]) * 255, srgb[4] === undefined ? 1 : Number(srgb[4])];
      return [0, 0, 0, 0];
    }
    function luminance(color) {
      var channels = color.slice(0, 3).map(function (channel) {
        channel /= 255;
        return channel <= .04045 ? channel / 12.92 : Math.pow((channel + .055) / 1.055, 2.4);
      });
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    }
    function rgb(color) { return 'rgb(' + color.map(Math.round).join(', ') + ')'; }
    function contrast(a, b) { return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); }
    function themeFor(element, styles) {
      var ancestry = [], current = element;
      while (current && current.nodeType === 1) { ancestry.unshift(current); current = current.parentElement; }
      var color = [255, 255, 255];
      ancestry.forEach(function (node) {
        var style = styles.get(node);
        if (!style) { style = getComputedStyle(node); styles.set(node, style); }
        var layer = parseColor(style.backgroundColor);
        if (!layer.every(Number.isFinite)) return;
        var alpha = Math.max(0, Math.min(1, layer[3]));
        color = color.map(function (channel, i) { return layer[i] * alpha + channel * (1 - alpha); });
      });
      // The meadow's moving image uses the light navigation palette and a
      // readable white dropdown surface. It remains visible behind the header.
      var meadow = element.matches('.stage') && !!element.querySelector('.media');
      if (meadow) color = [255, 255, 255];
      var light = luminance(color);
      var darkContrast = contrast(light, luminance([37, 11, 30]));
      var lightContrast = contrast(light, luminance([247, 240, 237]));
      return { solid: rgb(color), tone: darkContrast >= lightContrast ? 'light' : 'dark', strong: Math.max(darkContrast, lightContrast) < 4.5 };
    }
    function surfaceAt(point) {
      var active;
      cache.forEach(function (surface) {
        if (point >= surface.top && point < surface.bottom && (!active || surface.depth > active.depth || (surface.depth === active.depth && surface.top >= active.top))) active = surface;
      });
      return active ? active.theme : fallback;
    }
    function measure() {
      var styles = new Map(), scroll = window.scrollY;
      var navBounds = nav.getBoundingClientRect();
      headerHeight = navBounds.height;
      // The announcement remains in normal flow, unlike the sticky wrapper itself.
      var header = nav.closest('.site-header');
      var preceding = header && header.previousElementSibling;
      headerTop = header ? (preceding ? preceding.getBoundingClientRect().bottom + scroll : 0) : navBounds.top + scroll;
      fallback = themeFor(document.body, styles);
      cache = surfaces.map(function (element) {
        var bounds = element.getBoundingClientRect();
        var depth = 0, parent = element.parentElement;
        while (parent) { depth++; parent = parent.parentElement; }
        return { element: element, top: bounds.top + scroll, bottom: bounds.bottom + scroll, depth: depth, theme: themeFor(element, styles) };
      }).filter(function (surface) { return surface.bottom > surface.top; });
      dirty = false;
    }
    function update() {
      frame = 0;
      if (document.hidden) return;
      if (dirty) measure();
      var point = Math.max(window.scrollY, headerTop) + headerHeight / 2;
      var theme = surfaceAt(point);
      var key = theme.solid + '|' + theme.tone + '|' + theme.strong;
      if (key === applied) return;
      applied = key;
      nav.style.setProperty('--nav-solid-background', theme.solid);
      nav.dataset.navTone = theme.tone;
      nav.dataset.navContrast = theme.strong ? 'strong' : 'brand';
    }
    function schedule() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    }
    function invalidate() { dirty = true; schedule(); }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', invalidate, { passive: true });
    window.addEventListener('pageshow', invalidate);
    document.addEventListener('load', invalidate, true);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (frame) cancelAnimationFrame(frame); frame = 0; }
      else invalidate();
    });
    if ('ResizeObserver' in window) {
      var observer = new ResizeObserver(invalidate);
      observer.observe(document.body);
      observer.observe(nav);
      surfaces.forEach(function (surface) { observer.observe(surface); });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(invalidate);
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
