const { Observable } = require('rxjs')

const obs = Observable.create(subscriber => {
  subscriber.next('RxJs')
  subscriber.next('é')
  subscriber.next('bem')
  subscriber.next('poderoso')

  if(Math.random() > 0.5) {
    subscriber.complete()
  } else {
    subscriber.error('Que problema?')
  }
})

// obs.subscribe(
//   v => console.log(v), // next
//   err => console.error(err), // error
//   () => console.log('Complete') // complete
// )

obs.subscribe({
  next(v) { console.log(v) },
  error(err) { console.error(err) },
  complete () {
    console.log('Complete')
  }
})