const CACHE="hangar-v12";
const LIBS=["https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/renderers/CSS2DRenderer.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(LIBS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const local=new URL(r.url).origin===self.location.origin;
  if(local){e.respondWith(fetch(r,{cache:"no-store"}).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r)));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res;})));
});
