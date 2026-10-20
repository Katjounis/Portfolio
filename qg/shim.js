/* QG mobile : remplace le runtime claude.ai par une lecture seule de _QG/live/etat.json (dépôt privé Katjounis/cerveau). */
(function(){
const REPO="Katjounis/cerveau",PATH="_QG/live/etat.json",KEY="qg-gh-token";
let token=null;try{token=localStorage.getItem(KEY)}catch(e){}
let state=null,etag=null,lastOk=null,listeners=new Set();
document.documentElement.classList.add("ro");

async function load(force){
  if(!token)return;
  try{
    const h={"Authorization":"Bearer "+token,"Accept":"application/vnd.github.raw+json","X-GitHub-Api-Version":"2022-11-28"};
    if(etag&&!force)h["If-None-Match"]=etag;
    const r=await fetch("https://api.github.com/repos/"+REPO+"/contents/"+encodeURIComponent(PATH).replace(/%2F/g,"/")+"?ref=main",{headers:h,cache:"no-store"});
    if(r.status===304){lastOk=Date.now();pill();return}
    if(r.status===401||r.status===403){pill("Jeton refusé ("+r.status+")",true);return}
    if(r.status===404){pill("Fichier d'état introuvable",true);return}
    if(!r.ok){pill("GitHub "+r.status,true);return}
    etag=r.headers.get("ETag");state=await r.json();lastOk=Date.now();
    try{localStorage.setItem("qg-etat",JSON.stringify(state))}catch(e){}
    listeners.forEach(f=>{try{f()}catch(e){console.error(e)}});pill();setTimeout(()=>{try{runBrief()}catch(e){}},100);
  }catch(e){pill("Hors ligne, dernière version gardée",true)}
}
try{const c=localStorage.getItem("qg-etat");if(c)state=JSON.parse(c)}catch(e){}

function coll(c){const s=state&&state.collections&&state.collections[c];return Array.isArray(s)?s:[]}
function snapOf(c,o,prev){
  let a=coll(c).slice();
  if(o.order){const[f,d]=o.order;a.sort((x,y)=>{const u=x[f]==null?"":x[f],v=y[f]==null?"":y[f];return(u<v?-1:u>v?1:0)*(d==="desc"?-1:1)})}
  if(o.lim)a=a.slice(0,o.lim);
  const docs=a.map(x=>{const id=x._id;const d=Object.assign({},x);delete d._id;return{id,exists:true,data:()=>JSON.parse(JSON.stringify(d))}});
  const added=docs.filter(d=>!prev.has(d.id));
  return{docs,size:docs.length,empty:!docs.length,docChanges:()=>added.map(doc=>({type:"added",doc}))};
}
const RO=()=>Promise.reject(Object.assign(new Error("Lecture seule : modifie depuis le QG dans Claude"),{code:"read_only"}));
function query(c,o){
  return{
    orderBy:(f,d)=>query(c,Object.assign({},o,{order:[f,d||"asc"]})),
    limit:n=>query(c,Object.assign({},o,{lim:n})),
    where:()=>query(c,o),
    doc:id=>({
      onSnapshot(cb){const f=()=>{const x=coll(c).find(d=>d._id===id);const d=x?Object.assign({},x):null;if(d)delete d._id;cb({id,exists:!!x,data:()=>d})};listeners.add(f);if(state)f();return()=>listeners.delete(f)},
      get(){const x=coll(c).find(d=>d._id===id);return Promise.resolve({id,exists:!!x,data:()=>x})},
      set:RO,update:RO,delete:RO
    }),
    onSnapshot(cb){let prev=new Set();const f=()=>{const s=snapOf(c,o,prev);prev=new Set(s.docs.map(d=>d.id));cb(s)};listeners.add(f);if(state)f();return()=>listeners.delete(f)},
    get(){return Promise.resolve(snapOf(c,o,new Set()))},
    add:RO
  };
}
const db={collection:c=>query(c,{})};
const user={can:()=>false,id:"samuel",name:"Samuel"};

function gEvent(e){const dt=v=>!v?undefined:/T/.test(v)?{dateTime:v}:{date:v};return{id:e.id||e.start+e.summary,summary:e.summary,start:dt(e.start),end:dt(e.end),htmlLink:e.lien||e.htmlLink,location:e.lieu||e.location||""}}
const mcp={
  watchTool(server,tool,input,cb){
    if(server!=="Google Calendar"||tool!=="list_events"){setTimeout(()=>cb({type:"error",error:{code:"not_granted"}}));return()=>{}}
    const f=()=>{const ag=state&&state.agenda;if(!ag){cb({type:"error",error:{code:"attente"}});return}
      const a=Date.parse(input.startTime),b=Date.parse(input.endTime);
      const ev=(ag.events||[]).filter(e=>{const s=Date.parse(e.start);return s>=a-864e5&&s<b}).map(gEvent);
      cb({type:"data",result:{payload:{events:ev},cache:{storedAt:ag.maj||state.maj}}})};
    listeners.add(f);if(state)setTimeout(f);return()=>listeners.delete(f)},
  callTool:()=>Promise.reject(Object.assign(new Error("Lecture seule"),{code:"not_granted"})),
  listTools:()=>Promise.resolve({servers:[]})
};
window.claude={use:n=>Promise.resolve(n==="db"?db:n==="user"?user:n==="mcp"?mcp:null)};

/* Pastille d'état + réglage du jeton */
function fmt(t){return t?new Date(t).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}):"?"}
function pill(msg,err){const p=document.getElementById("ro-pill");if(!p)return;
  const m=state&&state.maj?" · données de "+new Date(state.maj).toLocaleString("fr-FR",{weekday:"short",hour:"2-digit",minute:"2-digit"}):"";
  p.querySelector("span").textContent=msg?msg:(token?"En direct"+m:"Jeton manquant");p.classList.toggle("err",!!err||!token)}
function setup(){
  const box=document.createElement("div");box.id="ro-setup";
  box.innerHTML='<form><h2>QG Katjounis</h2><p>Colle ton jeton GitHub (fine-grained, dépôt <b>cerveau</b> seulement, Contents en lecture). Il reste sur ce téléphone.</p><input type="password" autocomplete="off" placeholder="github_pat_..." required><div><button type="submit">Connecter</button> <button type="button" data-x>Annuler</button></div><small>Pour le changer plus tard : touche la pastille en haut.</small></form>';
  const f=box.querySelector("form");f.onsubmit=e=>{e.preventDefault();token=f.querySelector("input").value.trim();try{localStorage.setItem(KEY,token)}catch(e){}box.remove();etag=null;load(true)};
  box.querySelector("[data-x]").onclick=()=>box.remove();document.body.append(box);f.querySelector("input").focus()}
addEventListener("DOMContentLoaded",()=>{
  const p=document.createElement("button");p.id="ro-pill";p.innerHTML='<i></i><span></span>';p.onclick=()=>{if(!token)return setup();if(confirmLike())load(true)};document.body.append(p);pill();
  function confirmLike(){return true}
  p.oncontextmenu=e=>{e.preventDefault();setup()};
  let t;p.addEventListener("touchstart",()=>{t=setTimeout(setup,700)});p.addEventListener("touchend",()=>clearTimeout(t));
  if(!token)setup();else load(true);
  setInterval(()=>{if(!document.hidden)load()},60000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)load()});
  if(state)setTimeout(()=>{listeners.forEach(f=>f());try{runBrief()}catch(e){}},50);
});
if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
})();
