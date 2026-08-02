/* ==========================================================================
   MOI : comportements de la planche de fanzine
   ========================================================================== */

(function () {
  'use strict';

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Bande défilante : contenu dupliqué pour une boucle sans couture --- */
  document.querySelectorAll('.z-bande-piste, .z-rail-texte').forEach(function (piste) {
    piste.innerHTML += piste.innerHTML;
  });

  /* --- 2. Images absentes : on marque le bloc pour afficher le repère --- */
  document.querySelectorAll('.z-portrait img, .z-vignette img, .z-image img')
    .forEach(function (img) {
      var marquer = function () {
        var b = img.closest('.z-portrait') || img.closest('.z-vignette') || img.closest('.z-image');
        if (b) b.classList.add('vide');
      };
      img.addEventListener('error', marquer);
      if (img.complete && img.naturalWidth === 0) marquer();
    });

  /* --- 3. Compteurs --- */
  function compter(el) {
    var cible = parseInt(el.dataset.vers, 10);
    if (isNaN(cible)) return;
    if (reduit) { el.textContent = cible; return; }
    var debut = null, duree = 1200;
    function pas(t) {
      if (!debut) debut = t;
      var p = Math.min((t - debut) / duree, 1);
      el.textContent = Math.round(cible * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  var chiffres = document.querySelectorAll('.z-compteur .n[data-vers]');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (e) {
      e.forEach(function (x) {
        if (x.isIntersecting) { compter(x.target); obs.unobserve(x.target); }
      });
    }, { threshold: 0.6 });
    chiffres.forEach(function (c) { obs.observe(c); });
  } else {
    chiffres.forEach(compter);
  }
})();
