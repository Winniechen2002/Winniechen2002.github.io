(function () {
  'use strict';
  document.querySelectorAll('[data-copy-id]').forEach(function (button) {
    button.hidden = false;
    button.addEventListener('click', async function () {
      var account = button.closest('.game-account');
      var feedback = account.querySelector('.game-copy-status');
      try {
        await navigator.clipboard.writeText(button.dataset.copyId);
        feedback.textContent = 'Copied. See you in game!';
      } catch (error) {
        var range = document.createRange();
        range.selectNodeContents(account.querySelector('[data-player-id]'));
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        feedback.textContent = 'Please copy the selected ID.';
      }
    });
  });
})();
