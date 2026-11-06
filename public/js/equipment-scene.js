/* Static equipment maps: input-driven updates only, with one tab stop per map. */
(function () {
  document.querySelectorAll('[data-equipment-scene]').forEach(function (scene) {
    if (scene.dataset.equipmentReady) return;
    scene.dataset.equipmentReady = 'true';
    var items = Array.from(scene.querySelectorAll('[data-equipment-item]'));
    if (!items.length) return;
    var picker = scene.querySelector('[data-equipment-select]');
    function select(item, focus) {
      items.forEach(function (other) {
        var selected = other === item;
        other.setAttribute('aria-pressed', String(selected));
        other.setAttribute('tabindex', selected ? '0' : '-1');
      });
      ['name', 'status', 'metric', 'copy', 'context'].forEach(function (key) {
        var output = scene.querySelector('[data-equipment-' + key + ']');
        if (output) output.textContent = item.dataset[key] || '';
        if (key === 'status' && output) output.dataset.state = item.dataset.status;
      });
      var mapLabel = scene.querySelector('[data-equipment-map-label]');
      if (mapLabel) mapLabel.textContent = item.dataset.name + ' · ' + item.dataset.metric;
      if (picker) picker.value = item.dataset.equipmentId;
      if (focus) item.focus();
    }
    if (picker) picker.addEventListener('change', function () {
      var item = items.find(function (candidate) { return candidate.dataset.equipmentId === picker.value; });
      if (item) select(item, false);
    });
    items.forEach(function (item, index) {
      item.addEventListener('click', function () { select(item, false); });
      item.addEventListener('keydown', function (event) {
        var next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % items.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = items.length - 1;
        else if (event.key === 'Enter' || event.key === ' ') next = index;
        if (next === undefined) return;
        event.preventDefault();
        select(items[next], true);
      });
    });
  });
})();
