(function () {
  function b64(n) { const u = new Uint8Array(n); crypto.getRandomValues(u); let s = ""; u.forEach(b => s += String.fromCharCode(b)); return btoa(s); }
  function hex(n) { const u = new Uint8Array(n); crypto.getRandomValues(u); return Array.from(u, b => b.toString(16).padStart(2, "0")).join(""); }
  function b64u(n) { return b64(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function gen() { document.getElementById("k0").textContent = "qg_" + b64u(32); document.getElementById("k1").textContent = b64(32); document.getElementById("k2").textContent = hex(32); }
  gen();
  document.getElementById("regen").onclick = gen;
  document.querySelectorAll("[data-c]").forEach(b => b.onclick = async () => {
    const t = document.getElementById(b.dataset.c).textContent;
    try { await navigator.clipboard.writeText(t); b.textContent = "Copié"; } catch (e) { b.textContent = "Sélectionne et copie"; }
    setTimeout(() => b.textContent = "Copier", 1500);
  });
})();
