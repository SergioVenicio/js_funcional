const { Observable } = require('rxjs')

const promise = new Promise(resolve => {
  resolve('Promise é bem legal!!!') // Só resolve / rejeita 1 vez
  resolve('Promise é bem legal!!!')
})

const obs = new Observable(subscriber => {
  'Observer é bem legal!!!'.split(' ').map(word => {
    subscriber.next(word)
  }) // Stream (Generator)

  setTimeout(() => {
    subscriber.next('Observer é bem legal!!!')
    subscriber.complete()
  }, 1500)
})

promise.then(console.log)
obs.subscribe(console.log)