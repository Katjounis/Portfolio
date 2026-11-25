/* ==========================================================================
   MOI : deux comportements seulement.
   1. Les chiffres des galets montent quand ils apparaissent.
   2. Le portrait se retourne (recto photo / verso carte d'identité).
   Le reste de la page (onglets, accordéon) fonctionne sans JavaScript.
   ========================================================================== */

(function () {
  'use strict';

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Compteurs --- */
function compter(el) {
    var cible = parseInt(el.dataset.vers, 10);
    if (isNaN(cible)) return;
    var prefixe = el.dataset.prefixe || '';
    if (reduit) { el.textContent = prefixe + cible; return; }
    var debut = null, duree = 1000;
    function pas(t) {
      if (!debut) debut = t;
      var p = Math.min((t - debut) / duree, 1);
      el.textContent = prefixe + Math.round(cible * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  var chiffres = document.querySelectorAll('[data-vers]');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { compter(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    chiffres.forEach(function (el) { obs.observe(el); });
  } else {
    chiffres.forEach(compter);
  }

  /* --- 2. Retournement du portrait --- */
  var bouton = document.querySelector('[data-retourner]');
  var medaillon = document.querySelector('.mo-medaillon');
  if (bouton && medaillon) {
    var lib = bouton.querySelector('.lib');
    bouton.addEventListener('click', function () {
      var retournee = medaillon.classList.toggle('retournee');
      bouton.setAttribute('aria-pressed', retournee ? 'true' : 'false');
      if (lib) lib.textContent = retournee ? 'Le portrait' : 'Retourner';
    });
  }
})();
