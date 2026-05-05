(function () {
  function activateTab(tab) {
    var playground = tab.closest('[data-code-playground]');

    if (!playground) {
      return;
    }

    var target = tab.getAttribute('data-playground-tab');
    var tabs = playground.querySelectorAll('[data-playground-tab]');
    var panels = playground.querySelectorAll('[data-playground-panel]');

    tabs.forEach(function (item) {
      var isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      var isActive = panel.getAttribute('data-playground-panel') === target;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  }

  document.addEventListener('click', function (event) {
    var tab = event.target.closest('[data-playground-tab]');

    if (!tab) {
      return;
    }

    activateTab(tab);
  });

  document.addEventListener('keydown', function (event) {
    var tab = event.target.closest('[data-playground-tab]');

    if (!tab || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) {
      return;
    }

    var tabs = Array.prototype.slice.call(tab.closest('[role="tablist"]').querySelectorAll('[data-playground-tab]'));
    var index = tabs.indexOf(tab);
    var direction = event.key === 'ArrowRight' ? 1 : -1;
    var nextTab = tabs[(index + direction + tabs.length) % tabs.length];

    event.preventDefault();
    nextTab.focus();
    activateTab(nextTab);
  });
})();
