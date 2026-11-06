// A shared record, revealed by an automatic sweep or a visitor's pointer.
(function () {
  var canvas = document.getElementById('graph');
  if (!canvas || !canvas.getContext) return;
  var context = canvas.getContext('2d');
  if (!context) return;
  var host = canvas.parentElement;
  var cell = document.getElementById('chaos');
  var bento = document.querySelector('.bento');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var paused = motion.matches;
  var visible = false;
  var frameId = 0;
  var lastTime = 0;
  var elapsed = 0;
  var angle = .4;
  var tilt = .2;
  var width, height, radius, cx, cy, dpr;
  var progress = motion.matches ? 1 : 0;
  var pointerTarget = progress;
  var pointerInside = false;
  var pointerUntil = 0;
  var rangeFocused = false;
  var lastState = '';
  var lastPercent = -1;
  var points = [], projected = [], chords = [], tangle = [], noise = [], cores = [], highlights = [];
  var count = 700;
  var phi = Math.PI * (3 - Math.sqrt(5));
  var colours = ['#B03729', '#3EC6E8', '#315ADE', '#6CA9CB'];
  // Seeded positions keep the diagram consistent across resize and motion changes.
  var seed = 2041;
  function random() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function clamp(value) { return Math.min(1, Math.max(0, value)); }
  for (var i = 0; i < count; i++) {
    var y = 1 - i / (count - 1) * 2;
    var r = Math.sqrt(1 - y * y);
    points.push([Math.cos(phi * i) * r, y, Math.sin(phi * i) * r]);
    projected.push([0, 0, 0]);
    noise.push([6 + random() * 14, 2 + random() * 3, .25 + random() * .6, random() * Math.PI * 2]);
  }
  for (i = 0; i < 420; i++) chords.push([Math.floor(random() * count), Math.floor(random() * count)]);
  for (i = 0; i < 260; i++) tangle.push([Math.floor(random() * count), Math.floor(random() * count)]);
  for (i = 0; i < 5; i++) cores.push(Math.floor(random() * count));
  for (i = 0; i < 22; i++) highlights.push([Math.floor(random() * count), colours[i % 4]]);

  var controls = document.createElement('div');
  controls.className = 'sphere-controls';
  var hint = document.createElement('span');
  hint.textContent = 'Move across to bring it together';
  var pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  controls.append(hint, pauseButton);
  var label = document.createElement('label');
  label.className = 'sphere-range-label';
  var ends = document.createElement('span');
  ends.innerHTML = '<span>Chaos</span><span>Calm</span>';
  var range = document.createElement('input');
  range.type = 'range';
  range.className = 'sphere-range';
  range.min = '0'; range.max = '100'; range.step = '1';
  range.setAttribute('aria-label', 'Reveal the unified data centre record');
  label.append(ends, range);
  host.append(controls, label);

  function syncButton() {
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', paused ? 'Start automatic sphere motion' : 'Pause automatic sphere motion');
    pauseButton.title = paused ? 'Start automatic motion' : 'Pause automatic motion';
  }
  function syncState() {
    var state = lastState || (progress > .5 ? 'calm' : 'chaos');
    if (progress > .54) state = 'calm';
    if (progress < .46) state = 'chaos';
    if (state !== lastState) {
      lastState = state;
      if (cell) {
        cell.dataset.state = state;
        cell.querySelectorAll('.pane').forEach(function (pane) {
          pane.setAttribute('aria-hidden', String(!pane.classList.contains(state)));
        });
      }
      if (bento) {
        bento.dataset.state = state;
        bento.querySelectorAll('.flip, .fade').forEach(function (element) {
          var copy = element.getAttribute('data-' + state);
          if (copy !== null) element.textContent = copy;
          element.classList.remove('out', 'flipping');
        });
      }
    }
    var percent = Math.round(progress * 100);
    if (percent !== lastPercent) {
      lastPercent = percent;
      range.value = String(percent);
      range.setAttribute('aria-valuetext', percent + '% unified record');
      canvas.dataset.calmPercent = String(percent);
    }
  }
  function resize() {
    var bounds = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.width = Math.round(bounds.width * dpr);
    height = canvas.height = Math.round(bounds.height * dpr);
    radius = Math.min(width * .40, Math.max(40, height - 116 * dpr) * .48);
    cx = width / 2; cy = height / 2;
    paint();
  }
  function projectPoints() {
    var ca = Math.cos(angle), sa = Math.sin(angle), cb = Math.cos(tilt), sb = Math.sin(tilt);
    for (var i = 0; i < points.length; i++) {
      var point = points[i], target = projected[i];
      var x = point[0] * ca - point[2] * sa;
      var z = point[0] * sa + point[2] * ca;
      var y = point[1] * cb - z * sb;
      z = point[1] * sb + z * cb;
      target[0] = cx + x * radius; target[1] = cy + y * radius; target[2] = z;
    }
  }
  function paint() {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    projectPoints();
    var divider = cx + radius * 1.15 - progress * radius * 2.3;
    var time = elapsed / 1000;
    context.lineWidth = dpr;
    chords.forEach(function (chord) {
      var p = projected[chord[0]], q = projected[chord[1]];
      if (p[0] < divider || q[0] < divider) return;
      context.strokeStyle = 'rgba(101,75,117,' + (.06 + .12 * ((p[2] + q[2]) / 2 + 1) / 2) + ')';
      context.beginPath(); context.moveTo(p[0], p[1]); context.lineTo(q[0], q[1]); context.stroke();
    });
    tangle.forEach(function (chord, index) {
      var p = projected[chord[0]], q = projected[chord[1]];
      if (p[0] >= divider || q[0] >= divider || (index + Math.floor(time * 10)) % 4 === 0) return;
      context.strokeStyle = 'rgba(198,75,110,.16)';
      context.beginPath(); context.moveTo(p[0], p[1]); context.lineTo(q[0], q[1]); context.stroke();
    });
    projected.forEach(function (point, index) {
      var depth = (point[2] + 1) / 2;
      if (point[0] < divider) {
        var n = noise[index], jx = Math.sin(time * 9 + n[3]) * 1.5 * dpr, jy = Math.cos(time * 7 + n[3]) * 1.5 * dpr;
        context.fillStyle = 'rgba(190,68,108,' + n[2] * (.3 + .6 * depth) + ')';
        context.fillRect(point[0] - n[0] * dpr / 2 + jx, point[1] + jy, n[0] * dpr, n[1] * dpr);
      } else {
        context.fillStyle = 'rgba(34,26,33,' + (.2 + .65 * depth) + ')';
        context.fillRect(point[0], point[1], dpr * (1 + depth), dpr * (1 + depth));
      }
    });
    cores.forEach(function (index, n) {
      var point = projected[index];
      if (point[0] >= divider) return;
      var pulse = 4 + 3 * Math.sin(time * 3 + n);
      context.fillStyle = 'rgba(190,68,108,.85)';
      context.fillRect(point[0] - pulse * dpr / 2, point[1] - pulse * dpr / 2, pulse * dpr, pulse * dpr);
    });
    highlights.forEach(function (node) {
      var point = projected[node[0]];
      if (point[0] < divider) return;
      context.fillStyle = node[1];
      context.fillRect(point[0] - 2 * dpr, point[1] - 2 * dpr, 4 * dpr, 4 * dpr);
    });
    context.fillStyle = '#B89CC8';
    context.fillRect(divider, cy - radius * 1.12, dpr, radius * 2.24);
    context.beginPath(); context.arc(divider, cy, 5 * dpr, 0, Math.PI * 2); context.fill();
    syncState();
  }
  function automaticProgress() {
    var phase = (elapsed % 14000) / 14000;
    if (phase < .12) return 0;
    if (phase < .55) return (1 - Math.cos(Math.PI * (phase - .12) / .43)) / 2;
    if (phase < .78) return 1;
    return (1 + Math.cos(Math.PI * (phase - .78) / .22)) / 2;
  }
  function animate(now) {
    frameId = 0;
    var delta = Math.min(now - (lastTime || now), 40);
    lastTime = now;
    if (!paused) { elapsed += delta; angle += delta * .000072; tilt += delta * .000024; }
    var manual = pointerInside || rangeFocused || now < pointerUntil;
    var target = manual ? pointerTarget : paused ? progress : automaticProgress();
    progress += (target - progress) * Math.min(1, delta / 90);
    paint();
    if (visible && !document.hidden && (!paused || Math.abs(target - progress) > .001)) frameId = requestAnimationFrame(animate);
  }
  function wake() {
    if (!frameId && visible && !document.hidden) { lastTime = 0; frameId = requestAnimationFrame(animate); }
  }
  function point(event) {
    var bounds = canvas.getBoundingClientRect();
    pointerTarget = 1 - clamp(((event.clientX - bounds.left) * dpr - (cx - radius * 1.15)) / (radius * 2.3));
    pointerUntil = performance.now() + 1500;
    if (motion.matches || paused) { progress = pointerTarget; paint(); }
    wake();
  }
  canvas.addEventListener('pointerenter', function (event) { pointerInside = event.pointerType !== 'touch'; point(event); });
  canvas.addEventListener('pointermove', point);
  canvas.addEventListener('pointerdown', point);
  canvas.addEventListener('pointerleave', function () { pointerInside = false; pointerUntil = performance.now() + 650; wake(); });
  canvas.addEventListener('pointerup', function (event) { if (event.pointerType === 'touch') pointerInside = false; });
  canvas.addEventListener('pointercancel', function () { pointerInside = false; pointerUntil = 0; wake(); });
  range.addEventListener('focus', function () { rangeFocused = true; pointerTarget = progress; });
  range.addEventListener('blur', function () { rangeFocused = false; pointerUntil = performance.now() + 1200; wake(); });
  range.addEventListener('input', function () { pointerTarget = progress = Number(range.value) / 100; pointerUntil = performance.now() + 1800; paint(); wake(); });
  pauseButton.addEventListener('click', function () { paused = !paused; syncButton(); wake(); });
  motion.addEventListener('change', function (event) { paused = event.matches; if (paused) { progress = pointerTarget = 1; paint(); } syncButton(); wake(); });
  document.addEventListener('visibilitychange', wake);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
  else window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) wake();
      else if (frameId) { cancelAnimationFrame(frameId); frameId = 0; }
    }, { threshold: .05 }).observe(canvas);
  } else visible = true;
  syncButton(); resize(); wake();
})();
