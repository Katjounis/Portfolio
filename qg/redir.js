if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(() => {});
try { localStorage.removeItem("qg-gh-token"); localStorage.removeItem("qg-etat"); } catch (e) {}
location.replace("https://qg.chaux-samuel.workers.dev/");
