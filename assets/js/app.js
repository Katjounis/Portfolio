/* ==========================================================================
   APP — comportements communs à toutes les pages
   ========================================================================== */

(function () {
  'use strict';

  /* --- 1. Apparition progressive au défilement --- */
  var aReveler = document.querySelectorAll('.revele');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('vu');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    aReveler.forEach(function (el) { obs.observe(el); });
  } else {
    aReveler.forEach(function (el) { el.classList.add('vu'); });
  }

  /* --- 2. Image absente : on affiche le repère hachuré au lieu d'une icône cassée --- */
  document.querySelectorAll('.cadre img, .blason img').forEach(function (img) {
    var marquerVide = function () {
      var boite = img.closest('.cadre') || img.closest('.blason');
      if (boite) boite.classList.add('vide');
    };
    img.addEventListener('error', marquerVide);
    if (img.complete && img.naturalWidth === 0) marquerVide();
  });

  /* --- 3. Lien de navigation actif selon la page ouverte --- */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bandeau nav a').forEach(function (a) {
    var cible = a.getAttribute('href');
    if (cible === page) a.classList.add('ici');
  });
})();
