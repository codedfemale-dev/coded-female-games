// Keep a complete release together. New versions activate after old game tabs close.
const VERSION='cf-release-manager-v3';
const FILES=['./','./index.html','./app.js?v=1','./style.css?v=1','./content.js','./engine.js','./art.js','./manifest.webmanifest','./icon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','../assets/open-sans.ttf'];
const urls=FILES.map(p=>new URL(p,self.location.href).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(urls))));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('cf-release-manager-')&&k!==VERSION).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url),scope=new URL('./',self.location.href);
 if(u.origin!==scope.origin||(!u.pathname.startsWith(scope.pathname)&&!urls.includes(u.href)))return;
 if(e.request.mode==='navigate'){e.respondWith(caches.open(VERSION).then(async c=>(await c.match(scope.href))||fetch(e.request)));return;}
 if(urls.includes(u.href))e.respondWith(caches.open(VERSION).then(async c=>(await c.match(e.request))||fetch(e.request)));
});
