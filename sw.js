const C="scheda-v1",F=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const n=fetch(e.request).then(x=>{if(x.ok)caches.open(C).then(c=>c.put(e.request,x.clone()));return x}).catch(()=>r);return r||n}))});
