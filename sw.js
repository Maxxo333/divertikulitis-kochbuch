const C='kochbuch-v3';
const F=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===location.origin){const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp))}return n}).catch(()=>caches.match('index.html'))))});
