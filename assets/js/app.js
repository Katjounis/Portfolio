/* ==========================================================================
   APP : comportements communs à toutes les pages
   Pas d'apparition au défilement : le contenu est affiché tout de suite.
   ========================================================================== */

(function () {
  'use strict';

  /* --- 1. Image absente : on affiche un repère au lieu d'une icône cassée --- */
  document.querySelectorAll('.cadre img, .exp-logo img, .exp-vignette img').forEach(function (img) {
    var marquerVide = function () {
      var boite = img.closest('.cadre') || img.closest('.exp-logo') || img.closest('.exp-vignette');
      if (boite) boite.classList.add('vide');
    };
    img.addEventListener('error', marquerVide);
    if (img.complete && img.naturalWidth === 0) marquerVide();
  });

  /* --- 2. Vidéo absente : même repère --- */
  document.querySelectorAll('.video-bloc video').forEach(function (v) {
    v.addEventListener('error', function () {
      var b = v.closest('.video-bloc');
      if (b) b.classList.add('vide');
    }, true);
  });

  /* --- 3. Lien de navigation actif selon la page ouverte --- */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bandeau nav a').forEach(function (a) {
    if (a.getAttribute('href') === page) {
      a.classList.add('ici');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* --- 4. Lightbox : clic sur une photo pour l'afficher en grand --- */
  var boite = document.createElement('div');
  boite.className = 'lightbox';
  boite.setAttribute('role', 'dialog');
  boite.setAttribute('aria-modal', 'true');
  boite.setAttribute('aria-label', 'Image agrandie, Échap pour fermer');
  boite.innerHTML = '<img alt="">';
  document.body.appendChild(boite);
  var grande = boite.querySelector('img');

  function ouvrir(src, alt) {
    grande.src = src;
    grande.alt = alt || '';
    boite.classList.add('ouverte');
  }
  function fermer() {
    boite.classList.remove('ouverte');
    grande.removeAttribute('src');
  }

  /* Les images des fiches projet sont dans un lien de carte : on les laisse au lien */
  document.querySelectorAll('.cadre img').forEach(function (img) {
    if (img.closest('.fiche')) return;
    img.addEventListener('click', function () { ouvrir(img.currentSrc || img.src, img.alt); });
  });
  boite.addEventListener('click', fermer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fermer();
  });
})();
