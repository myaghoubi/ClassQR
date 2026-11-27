const CACHE='attendance-v1.6.0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./supabase-config.js',
'./lib/leaflet.js','./lib/leaflet.css','./lib/qrcode.min.js','./lib/jsQR.js','./lib/supabase.js',
'./lib/fonts/Vazirmatn-Regular.woff2','./lib/fonts/Vazirmatn-Bold.woff2','./lib/images/layers.png','./lib/images/layers-2x.png','./lib/images/marker-icon.png','./lib/images/marker-icon-2x.png','./lib/images/marker-shadow.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
if(new URL(e.request.url).hostname.endsWith('.supabase.co'))return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('./index.html'))))});
