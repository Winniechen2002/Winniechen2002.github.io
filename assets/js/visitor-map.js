(function () {
  'use strict';

  var container = document.querySelector('.visitor-map-container');
  if (!container) return;

  var status = container.querySelector('.visitor-map-status');
  var message = container.querySelector('[data-map-message]');
  var retry = container.querySelector('[data-map-retry]');
  var script = document.getElementById('mapmyvisitors');
  if (!script || !status || !message || !retry) return;
  var loaded = false;
  var timer;

  function unavailable() {
    if (loaded) return;
    message.textContent = 'The visitor map is temporarily unavailable. Please try again later.';
    retry.hidden = false;
  }

  function checkMap() {
    var widget = container.querySelector('#mapmyvisitors-widget');
    var count = container.querySelector('.mapmyvisitors-visitors');
    // The provider creates an empty map before its statistics request finishes.
    if (!widget || !widget.querySelector('svg') || !count || !/\d/.test(count.textContent)) return;
    loaded = true;
    status.hidden = true;
    // Keep the provider's verified destination, but prefer HTTPS.
    if ((widget.getAttribute('href') || '').indexOf('http://mapmyvisitors.com/') === 0) {
      widget.href = widget.href.replace('http://', 'https://');
    }
    clearTimeout(timer);
    observer.disconnect();
  }

  var observer = new MutationObserver(checkMap);
  observer.observe(container, { childList: true, subtree: true, characterData: true });
  timer = setTimeout(unavailable, 15000);
  script.addEventListener('error', unavailable);
  retry.addEventListener('click', function () { window.location.reload(); });
  checkMap();
})();
