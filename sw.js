self.addEventListener('install', ()=>{
  self.skipWaiting();
  console.log('installed');
})

self.addEventListener('activate', (ev) => {
  //service worker is activated
  console.log('activated');
});


self.addEventListener('push', (event) =>{
  const data = event.data ? event.data.json() : {};


  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage(data);
    });
  });

  event.waitUntil(
      self.registration.showNotification(data.title,{
        body: data.message,
        icon:'datas/img/logo192x192.png',
        data: {url:data.lien},
        actions: [{action: data.lien,  title: "Voir en ligne"}]
      })
  )

})

