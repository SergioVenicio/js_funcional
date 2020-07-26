const { Observable, subscriber } = require('rxjs')

const fakeFor = (subscriber, elements) => {
  const value = elements.shift()
  if (!elements || !value) {
    subscriber.complete()
    return
  }
  subscriber.next(value)
  fakeFor(subscriber, [...elements])
}

const of = (...elements) => {
  return Observable.create(subscriber => {
    fakeFor(subscriber, elements)
  })
}


of(1, 2, 3).subscribe(console.log)