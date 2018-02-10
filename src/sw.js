self.addEventListener('install', function(evt) {
  console.log('[SW]:install finished, add caches start')
  evt.waitUntil(
    caches.open('starter-cache-v1').then(function(cache) {
      console.log('[SW]:adding caches')
      return cache.addAll(['/', '/app.web.js'])
    })
  )
  // evt.waitUntil(self.skipWaiting())
  // self.skipWaiting() // just for debug sw, others are not the major target.
  console.log('[SW]:fully installed')
})

self.addEventListener('activate', function(evt) {
  console.log('[SW]:activated, start delete cache')
  evt.waitUntil(
    Promise.all([
      self.clients.claim(), // here for being effective.
      caches.keys().then(function(cacheList) {
        return Promise.all(
          cacheList.map(function(cacheName) {
            if (cacheName !== 'starter-cache-v2') {
              console.log('[SW]:cache deleting')
              return caches.delete(cacheName)
            }
          })
        )
      })
    ]).then(function (result) {
      console.log('[SW]:cache deleted')
    })
  )
  console.log('[SW]:fully activated')
})

self.addEventListener('fetch', function(evt) {
  console.log('[SW]:fetch interceptor')
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      if (response) {
        console.log('[SW]:fetch interceptor hit cache')
        return response
      }

      var request = evt.request.clone()
      return fetch(request).then(function(res) {
        if (!res || res.status !== 200) {
          console.log('[SW]:fetch interceptor request failed')
          return res
        }

        console.log('[SW]:fetch interceptor request success')
        var responseClone = res.clone()
        caches.open('starter-cache-v1').then(function(cache) {
          cache.put(evt.request, responseClone)
        })
        return res
      })
    })
  )
})
