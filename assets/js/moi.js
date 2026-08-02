/* ==========================================================================
   MOI : comportements de l'interface arcade
   ========================================================================== */

(function () {
  'use strict';

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Bandeau défilant : contenu dupliqué pour une boucle sans couture --- */
  document.querySelectorAll('.a-defile-piste').forEach(function (piste) {
    piste.innerHTML += piste.innerHTML;
  });

  /* --- 2. Images absentes : on marque le bloc pour afficher le repère --- */
  document.querySelectorAll('.a-avatar img, .a-slot img, .a-ecran img')
    .forEach(function (img) {
      var marquer = function () {
        var b = img.closest('.a-avatar') || img.closest('.a-slot') || img.closest('.a-ecran');
        if (b) b.classList.add('vide');
      };
      img.addEventListener('error', marquer);
      if (img.complete && img.naturalWidth === 0) marquer();
    });

  /* --- 3. Compteurs de score, par paliers pour rester dans le ton --- */
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

  var scores = document.querySelectorAll('.a-score .n[data-vers]');
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
