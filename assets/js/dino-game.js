(function () {
  'use strict';
  var launcher = document.getElementById('arcade-launcher');
  var dialog = document.getElementById('dino-arcade');
  var canvas = document.getElementById('dino-canvas');
  if (!launcher || !dialog || typeof dialog.showModal !== 'function') return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var overlay = document.getElementById('dino-overlay');
  var message = document.getElementById('dino-message');
  var subtitle = document.getElementById('dino-subtitle');
  var startButton = document.getElementById('dino-start');
  var jumpButton = document.getElementById('dino-jump');
  var pauseButton = document.getElementById('dino-pause');
  var restartButton = document.getElementById('dino-restart');
  var scoreLabel = document.getElementById('dino-score');
  var bestLabel = document.getElementById('dino-best');
  var announcement = document.getElementById('dino-announcement');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var W = 700, H = 260, ground = 208;
  var state = 'ready', playerY = 0, velocity = 0, elapsed = 0, distance = 0;
  var obstacles = [], spawnIn = 1, score = 0, best = 0, frame = null, previous = null;
  var originalOverflow = '';
  var storageKey = 'winniechen-dino-best-v1';
  try { best = Math.max(0, Math.min(99999, parseInt(localStorage.getItem(storageKey), 10) || 0)); } catch (error) { /* Storage is optional. */ }

  function pad(value) { return String(value).padStart(5, '0'); }
  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previous = null;
  }
  function announce(text) { announcement.textContent = text; }
  function panel(title, detail, action) {
    message.textContent = title;
    subtitle.textContent = detail;
    startButton.textContent = action;
    overlay.hidden = false;
  }
  function resize() {
    W = Math.max(240, canvas.clientWidth);
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * ratio);
    canvas.height = H * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.imageSmoothingEnabled = false;
    draw();
  }
  function dino(x, y) {
    ctx.fillStyle = '#c7f568';
    ctx.fillRect(x + 17, y, 20, 18);
    ctx.fillRect(x + 12, y + 15, 17, 18);
    ctx.fillRect(x + 5, y + 21, 12, 11);
    ctx.fillRect(x, y + 13, 6, 15);
    ctx.fillRect(x + 27, y + 23, 7, 4);
    var step = state === 'running' && playerY === 0 && Math.floor(elapsed * 10) % 2;
    ctx.fillRect(x + 10, y + 31, 5, step ? 6 : 12);
    ctx.fillRect(x + 23, y + 31, 5, step ? 12 : 6);
    ctx.fillStyle = '#132019';
    ctx.fillRect(x + 29, y + 4, 4, 4);
    ctx.fillRect(x + 28, y + 13, 9, 3);
    if (state === 'over') {
      ctx.fillStyle = '#ff8790';
      ctx.fillRect(x + 29, y + 4, 4, 4);
    }
  }
  function draw() {
    ctx.fillStyle = '#121e18';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#263c2e';
    for (var i = 0; i < 12; i++) {
      var starX = (i * 79 + 23 - (reducedMotion.matches ? 0 : distance * 0.08) % W + W) % W;
      ctx.fillRect(starX, 30 + (i * 37) % 90, 2, 2);
    }
    ctx.strokeStyle = '#40533b';
    ctx.beginPath(); ctx.moveTo(0, ground + 1); ctx.lineTo(W, ground + 1); ctx.stroke();
    ctx.fillStyle = '#31432f';
    for (var j = 0; j < W / 42 + 1; j++) {
      ctx.fillRect(j * 42 - distance % 42, ground + 14 + (j % 3) * 6, 9, 2);
    }
    obstacles.forEach(function (obstacle) {
      ctx.fillStyle = '#e9b58c';
      ctx.fillRect(obstacle.x + 8, ground - obstacle.h, 9, obstacle.h);
      ctx.fillRect(obstacle.x, ground - obstacle.h + 9, 6, 16);
      ctx.fillRect(obstacle.x + 3, ground - obstacle.h + 20, 11, 6);
      ctx.fillRect(obstacle.x + 20, ground - obstacle.h + 5, 6, 15);
      ctx.fillRect(obstacle.x + 12, ground - obstacle.h + 16, 14, 6);
    });
    dino(44, ground - 43 - playerY);
  }
  function endRun() {
    state = 'over'; stop();
    if (score > best) {
      best = score;
      try { localStorage.setItem(storageKey, String(best)); } catch (error) { /* Keep the score for this visit. */ }
    }
    bestLabel.textContent = pad(best);
    pauseButton.disabled = true;
    panel('Nice run!', 'Score ' + score + '. There is always another try.', 'Play again →');
    announce('Game over. Score ' + score + '. Best score ' + best + '. Press Space or choose Play again to restart.');
    draw();
  }
  function update(dt) {
    elapsed += dt;
    var speed = Math.min(W < 450 ? 285 : 365, 185 + elapsed * 4);
    distance += speed * dt;
    velocity -= 1550 * dt;
    playerY = Math.max(0, playerY + velocity * dt);
    if (playerY === 0) velocity = 0;
    spawnIn -= dt;
    if (spawnIn <= 0) {
      obstacles.push({x: W + 30, h: 30 + Math.floor(Math.random() * 15)});
      spawnIn = 1.15 + Math.random() * 0.65;
    }
    obstacles.forEach(function (obstacle) { obstacle.x -= speed * dt; });
    obstacles = obstacles.filter(function (obstacle) { return obstacle.x > -30; });
    var nextScore = Math.floor(distance / 18);
    if (score !== nextScore) { score = nextScore; scoreLabel.textContent = pad(score); }
    // Inset hitboxes forgive the empty pixels around the dino and cactus arms.
    if (obstacles.some(function (obstacle) {
      return 50 < obstacle.x + 23 && 76 > obstacle.x + 4 &&
        ground - playerY - 5 > ground - obstacle.h + 4;
    })) endRun();
  }
  function tick(now) {
    frame = null;
    if (state !== 'running' || !dialog.open) return;
    var dt = previous === null ? 0 : Math.min((now - previous) / 1000, 0.05);
    previous = now;
    // Small physics steps prevent tunnelling through a cactus on a slow frame.
    while (dt > 0 && state === 'running') {
      var step = Math.min(dt, 1 / 120);
      update(step); dt -= step;
    }
    draw();
    if (state === 'running') frame = requestAnimationFrame(tick);
  }
  function start() {
    stop(); state = 'running'; playerY = velocity = elapsed = distance = score = 0;
    obstacles = []; spawnIn = 0.9; overlay.hidden = true;
    scoreLabel.textContent = pad(0); pauseButton.disabled = false; restartButton.disabled = false;
    pauseButton.textContent = 'Pause'; announce('Run started. Jump over the cacti.');
    canvas.focus({preventScroll: true});
    frame = requestAnimationFrame(tick);
  }
  function pause() {
    if (state !== 'running') return;
    state = 'paused'; stop();
    pauseButton.textContent = 'Resume';
    panel('Take your time.', 'Your run is paused.', 'Resume →');
    announce('Game paused.'); draw();
  }
  function resume() {
    if (state !== 'paused') return;
    state = 'running'; overlay.hidden = true; pauseButton.textContent = 'Pause';
    announce('Run resumed.'); previous = null; frame = requestAnimationFrame(tick);
    canvas.focus({preventScroll: true});
  }
  function jump() {
    if (state === 'paused') { resume(); return; }
    if (state === 'ready' || state === 'over') start();
    if (playerY === 0) velocity = 510;
  }
  launcher.hidden = false;
  bestLabel.textContent = pad(best);
  launcher.addEventListener('click', function () {
    if (dialog.open) return;
    originalOverflow = document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow = 'hidden';
    state = 'ready'; obstacles = []; playerY = velocity = distance = elapsed = score = 0;
    scoreLabel.textContent = pad(0); pauseButton.disabled = restartButton.disabled = true;
    pauseButton.textContent = 'Pause';
    panel('Ready to run?', 'A tiny adventure between bigger quests.', 'Start run →');
    resize(); startButton.focus();
  });
  dialog.querySelector('.dino-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () {
    stop(); state = 'ready'; document.body.style.overflow = originalOverflow; launcher.focus();
  });
  startButton.addEventListener('click', function () { if (state === 'paused') resume(); else start(); });
  jumpButton.addEventListener('click', jump);
  pauseButton.addEventListener('click', function () { if (state === 'paused') resume(); else pause(); });
  restartButton.addEventListener('click', start);
  canvas.addEventListener('pointerdown', function (event) { if (event.button === 0) jump(); });
  dialog.addEventListener('keydown', function (event) {
    if (event.repeat) return;
    if (event.code === 'ArrowUp' || (event.code === 'Space' && event.target.tagName !== 'BUTTON')) {
      event.preventDefault(); jump();
    } else if (event.code === 'KeyP') {
      event.preventDefault(); if (state === 'paused') resume(); else pause();
    }
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); });
  window.addEventListener('blur', pause);
  window.addEventListener('resize', function () { if (dialog.open) { pause(); resize(); } });
  window.addEventListener('pagehide', stop);
})();
