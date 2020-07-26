const { Observable } = require('rxjs')
const fakeFor = (subscriber, x, stop) => {
  if (x > stop) {
    subscriber.complete()
    return
  }

  subscriber.next(x)
  fakeFor(subscriber, x+1, stop)
}

const between = (min, max) => {
  if (min > max) [min, max] = [max, min]
  return new Observable(subscriber => {
    fakeFor(subscriber, min, max)
  })
}

between(0, 10).subscribe({
  next(x) { console.log(x) }
})