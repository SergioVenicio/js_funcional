const { Observable, from } = require('rxjs')

const first = () => {
  return (source) => {
    return new Observable(subscriber => {
      source.subscribe({
        next(e) { 
          subscriber.next(e) 
          subscriber.complete()
        }
      })
    })
  }
}

const last = () => {
  return (source) => {
    return new Observable(subscribe => {
      let last = undefined
      source.subscribe({
        next(e) {
          last = e
        },
        complete() {
          subscribe.next(last)
          subscribe.complete()
        }
      })
    })
  }
}

from([1, 2, 3, 4, 5])
  .pipe(last())
  .subscribe(console.log)