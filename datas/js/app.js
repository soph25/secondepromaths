const APP = {
    SW: null,
    cacheName: 'assetCache1',
     appShellFiles : [
      ,
      
    ],
    init() {
      //called after DOMContentLoaded
      if ('serviceWorker' in navigator) {
        // 1. Register a service worker hosted at the root of the
        // site using the default scope.
        navigator.serviceWorker
          .register('sw.js', {
            scope: './',
          })
          .then((registration) => {
            APP.SW =
              registration.installing ||
              registration.waiting ||
              registration.active ;
              // registration.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
              //   var endpointSections = sub.endpoint.split('/');
              //   var subscriptionId = endpointSections[endpointSections.length - 1];
              //   console.log('endpoint:', subscriptionId);
              // });

            console.log('service worker registered');
          });
        // 2. See if the page is currently has a service worker.
        if (navigator.serviceWorker.controller) {
          console.log('we have a service worker installed');

        }
  
        // 3. Register a handler to detect when a new or
        // updated service worker is installed & activate.
        navigator.serviceWorker.oncontrollerchange = (ev) => {
          console.log('New service worker activated');

        };
  
      } else {
        console.log('Service workers are not supported.');

      }

   

    // document
    //   .querySelector('header>h2')
    //   .addEventListener('click', APP.deleteCache);
    },
   
    
};
  
  document.addEventListener('DOMContentLoaded', APP.init);