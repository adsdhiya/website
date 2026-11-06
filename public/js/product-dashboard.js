/* Local sample-data exploration; no network requests or operational writes. */
(function () {
  'use strict';
  document.querySelectorAll('[data-product-demo]').forEach(function (dashboard) {
    if (dashboard.dataset.demoReady === 'true') return;
    dashboard.dataset.demoReady = 'true';
    var selections = Array.from(dashboard.querySelectorAll('.pd-select'));
    var title = dashboard.querySelector('[data-preview-title]');
    var copy = dashboard.querySelector('[data-preview-copy]');
    var meta = dashboard.querySelector('[data-preview-meta]');
    function reveal(button) {
      var viewport = button && button.closest('[data-board-viewport]');
      if (!viewport) return;
      // Scroll only the miniature floor, never the visitor's page position.
      var bounds = button.getBoundingClientRect(), frame = viewport.getBoundingClientRect();
      if (bounds.top < frame.top + 6) viewport.scrollTop -= frame.top + 6 - bounds.top;
      else if (bounds.bottom > frame.bottom - 6) viewport.scrollTop += bounds.bottom - frame.bottom + 6;
    }
    function select(button, focus) {
      if (!button || button.hidden) return;
      selections.forEach(function (item) {
        var selected = item === button;
        item.setAttribute('aria-pressed', String(selected));
        if (item.closest('[data-preview-grid]')) item.tabIndex = selected ? 0 : -1;
      });
      if (title) title.textContent = button.dataset.detailTitle || '';
      if (copy) copy.textContent = button.dataset.detailCopy || '';
      if (meta) meta.textContent = button.dataset.detailMeta || '';
      if (focus) button.focus({ preventScroll: true });
      reveal(button);
    }
    selections.forEach(function (button) {
      button.addEventListener('click', function () { select(button, false); });
    });
    dashboard.querySelectorAll('[data-board-viewport]').forEach(function (viewport) {
      var selected = viewport.querySelector('[aria-pressed="true"]');
      if (selected) reveal(selected);
    });
    dashboard.querySelectorAll('[data-preview-grid]').forEach(function (grid) {
      grid.addEventListener('keydown', function (event) {
        var button = event.target.closest('.pd-select');
        if (!button) return;
        var items = Array.from(grid.querySelectorAll('.pd-select')).filter(function (item) { return !item.hidden; });
        var index = items.indexOf(button), next = index;
        var columns = getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length;
        if (event.key === 'ArrowRight') next = (index + 1) % items.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
        else if (event.key === 'ArrowDown') next = Math.min(items.length - 1, index + columns);
        else if (event.key === 'ArrowUp') next = Math.max(0, index - columns);
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = items.length - 1;
        else return;
        event.preventDefault();
        select(items[next], true);
      });
    });
    var credit = dashboard.querySelector('[data-credit-toggle]');
    if (credit) credit.addEventListener('click', function () {
      var included = credit.getAttribute('aria-pressed') !== 'true';
      credit.setAttribute('aria-pressed', String(included));
      dashboard.querySelector('[data-invoice-total]').textContent = included ? '$23,128' : '$24,248';
      dashboard.querySelector('[data-kpi="2"]').textContent = included ? '$23.1k' : '$24.2k';
      dashboard.querySelector('[data-invoice-status]').textContent = included ? 'Credit included' : 'Before SLA credit';
      var row = dashboard.querySelector('[data-credit-row]');
      row.dataset.excluded = String(!included);
      select(row, false);
      if (meta) meta.textContent = included ? 'Credit included · sample total $23,128' : 'Credit excluded for comparison · sample total $24,248';
    });
    var filters = Array.from(dashboard.querySelectorAll('[data-rack-filter]'));
    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        var state = filter.dataset.rackFilter;
        filters.forEach(function (other) { other.setAttribute('aria-pressed', String(other === filter)); });
        var racks = Array.from(dashboard.querySelectorAll('[data-rack-state]'));
        racks.forEach(function (rack) { rack.hidden = state !== 'all' && rack.dataset.rackState !== state; });
        var visible = racks.filter(function (rack) { return !rack.hidden; });
        var count = dashboard.querySelector('[data-rack-count]');
        if (count) count.textContent = visible.length + (state === 'all' ? ' positions' : state === 'b' ? (visible.length === 1 ? ' alarm' : ' alarms') : ' reserved');
        var current = visible.find(function (rack) { return rack.getAttribute('aria-pressed') === 'true'; });
        select(current || visible[0], false);
      });
    });
    var meters = Array.from(dashboard.querySelectorAll('[data-meter]'));
    meters.forEach(function (meter) {
      meter.addEventListener('click', function () {
        var power = meter.dataset.meter === 'power';
        meters.forEach(function (other) { other.setAttribute('aria-pressed', String(other === meter)); });
        dashboard.querySelector('[data-meter-label]').textContent = power ? 'Committed power' : 'GPU utilisation';
        dashboard.querySelector('[data-meter-value]').textContent = power ? '404 / 420 kW' : '87% · 96 GPUs';
        var bar = dashboard.querySelector('[data-meter-bar]');
        bar.setAttribute('aria-label', power ? 'Committed power used' : 'GPU utilisation');
        bar.setAttribute('aria-valuemax', power ? '420' : '100');
        bar.setAttribute('aria-valuenow', power ? '404' : '87');
        bar.querySelector('i').style.width = (power ? 404 / 420 * 100 : 87) + '%';
      });
    });
  });
})();
