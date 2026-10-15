(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(any-pointer: fine)');
  var colors = ['#c7f568', '#92c9e6', '#ffe08a', '#f0f1e9'];
  var particles = [];
  var canvas, context, frame;

  function clear() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = null;
    particles = [];
    if (canvas) canvas.remove();
    canvas = context = null;
  }

  function makeCanvas() {
    canvas = document.createElement('canvas');
    canvas.className = 'game-click-particles';
    canvas.setAttribute('aria-hidden', 'true');
    context = canvas.getContext('2d');
    if (!context) { canvas = null; return false; }
    var scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * scale);
    canvas.height = Math.round(window.innerHeight * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    document.body.appendChild(canvas);
    return true;
  }

  function paint(now) {
    frame = null;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles = particles.filter(function (particle) {
      return now - particle.born < particle.life;
    });
    if (!particles.length) { clear(); return; }

    particles.forEach(function (particle) {
      var age = (now - particle.born) / particle.life;
      var seconds = (now - particle.born) / 1000;
      var x = Math.round(particle.x + particle.vx * seconds);
      var y = Math.round(particle.y + particle.vy * seconds + 90 * seconds * seconds);
      var size = particle.size;
      context.globalAlpha = Math.max(0, 1 - age * age);
      context.fillStyle = particle.color;
      if (particle.star) {
        context.fillRect(x - size * 1.5, y - size / 2, size * 3, size);
        context.fillRect(x - size / 2, y - size * 1.5, size, size * 3);
      } else {
        context.fillRect(x - size / 2, y - size / 2, size, size);
      }
    });
    context.globalAlpha = 1;
    frame = window.requestAnimationFrame(paint);
  }

  document.addEventListener('pointerdown', function (event) {
    if (event.pointerType !== 'mouse' || event.button !== 0 ||
        reducedMotion.matches || !finePointer.matches || document.hidden) return;
    if (event.target.closest('input, textarea, select, [contenteditable], :disabled, [aria-disabled="true"]')) return;
    if (!canvas && !makeCanvas()) return;

    var now = performance.now();
    // Bound work during rapid clicks; the animation loop exists only during a burst.
    particles = particles.slice(-78);
    for (var i = 0; i < 18; i++) {
      var angle = Math.PI * 2 * i / 18 + (Math.random() - 0.5) * 0.25;
      var speed = 45 + Math.random() * 85;
      particles.push({
        x: event.clientX, y: event.clientY,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 25,
        born: now, life: 450 + Math.random() * 250,
        size: 2 + Math.floor(Math.random() * 3),
        color: colors[i % colors.length], star: i % 5 === 0
      });
    }
    if (!frame) frame = window.requestAnimationFrame(paint);
  }, { passive: true });

  window.addEventListener('resize', clear, { passive: true });
  window.addEventListener('pagehide', clear);
  document.addEventListener('visibilitychange', function () { if (document.hidden) clear(); });
  reducedMotion.addEventListener('change', clear);
  finePointer.addEventListener('change', clear);
})();
