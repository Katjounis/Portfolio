/* ==========================================================================
   MOI : un seul comportement, le retournement du portrait
   (recto photo, verso carte d'identité). Les onglets et les questions
   fonctionnent sans JavaScript.
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
    if (lib) lib.textContent = retournee ? 'Voir le portrait' : 'Retourner';
  });
})();
