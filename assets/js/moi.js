/* ==========================================================================
   MOI : un seul comportement, le retournement du portrait
   (recto photo, verso carte d'identité). Les chiffres sont écrits en dur
   dans la page ; les onglets et les questions marchent sans JavaScript.
   ========================================================================== */

(function () {
  'use strict';

  var bouton = document.querySelector('[data-retourner]');
  var medaillon = document.querySelector('.mo-medaillon');
  if (!bouton || !medaillon) return;

  var lib = bouton.querySelector('.lib');
  bouton.addEventListener('click', function () {
    var retournee = medaillon.classList.toggle('retournee');
    bouton.setAttribute('aria-pressed', retournee ? 'true' : 'false');
    if (lib) lib.textContent = retournee ? 'Le portrait' : 'Retourner';
  });
})();
