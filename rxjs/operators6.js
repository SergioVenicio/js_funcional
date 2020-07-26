const { Observable, from } = require('rxjs')

const createPipeOperator = (baseOperator) => {
  return (source) => {
    return new Observable(subscriber => {
      const operator = baseOperator(subscriber)
      source.subscribe({
        next: operator.next || (v => subscriber.next(v)),
        complete: operator.complete || (_ => subscriber.complete()),
        error: operator.error || (e => subscriber.error(e)),
      })
    })
  }
}

const first = () => {
  const firstOperator = subscriber => ({
    next: value => {
      subscriber.next(value) 
      subscriber.complete()
    }
  })
  return createPipeOperator(firstOperator)
}

const last = () => {
  lastValue = undefined
  const lastOperator = subscriber => ({
    next: value => {
      lastValue = value
    },
    complete: () => {
      subscriber.next(lastValue)
      subscriber.complete()
    }
  })
  return createPipeOperator(lastOperator)
}

from([1, 2, 3, 4, 5])
  .pipe(first())
  .subscribe(console.log)