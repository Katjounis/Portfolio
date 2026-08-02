/* ==========================================================================
   MOI — animations propres à la page personnelle
   ========================================================================== */

(function () {
  'use strict';

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Bandeau défilant : on duplique le contenu pour une boucle sans couture --- */
  document.querySelectorAll('.defilant-piste').forEach(function (piste) {
    piste.innerHTML += piste.innerHTML;
  });

  /* --- 2. Compteurs qui montent quand ils entrent à l'écran --- */
  function compter(el) {
    var cible = parseInt(el.dataset.vers, 10);
    if (isNaN(cible)) return;
    if (reduit) { el.textContent = cible; return; }

    var debut = null;
    var duree = 1100;
    function pas(t) {
      if (!debut) debut = t;
      var p = Math.min((t - debut) / duree, 1);
      var adouci = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(cible * adouci);
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  var chiffres = document.querySelectorAll('.chiffre[data-vers]');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { compter(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    chiffres.forEach(function (c) { obs.observe(c); });
  } else {
    chiffres.forEach(compter);
  }
})();
