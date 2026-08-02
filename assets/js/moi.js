/* ==========================================================================
   MOI : compteurs de score. Les images sont gérées par app.js.
   ========================================================================== */

(function () {
  'use strict';

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function compter(el) {
    var cible = parseInt(el.dataset.vers, 10);
    if (isNaN(cible)) return;
    if (reduit) { el.textContent = cible; return; }
    var debut = null, duree = 1100;
    function pas(t) {
      if (!debut) debut = t;
      var p = Math.min((t - debut) / duree, 1);
      el.textContent = Math.round(cible * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  var scores = document.querySelectorAll('.m-score .n[data-vers]');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (e) {
      e.forEach(function (x) {
        if (x.isIntersecting) { compter(x.target); obs.unobserve(x.target); }
      });
    }, { threshold: 0.6 });
    scores.forEach(function (s) { obs.observe(s); });
  } else {
    scores.forEach(compter);
  }
})();
