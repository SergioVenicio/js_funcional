const { Observable, of } = require('rxjs')



const toLower = () => {
  return (source) => {
    return new Observable (subscribe => {
      source.subscribe({
        next(stringValue) {
            subscribe.next(stringValue.toLowerCase())
        },
        error(e) {
          subscribe.error(e)
        },
        complete() {
          subscribe.complete()
        }
      })
    })
  }
}

const endsWith = (endOfString) => {
  return (source) => {
    return new Observable (subscribe => {
      source.subscribe({
        next(stringValue) {
          stringValue
            .endsWith(endOfString) && subscribe.next(stringValue)
        },
        error(e) {
          subscribe.error(e)
        },
        complete() {
          subscribe.complete()
        }
      })
    })
  }
}


of('Ana Silva', 'Maria Silva', 'Pedro Rocha')
  .pipe(
    toLower(),
    endsWith('silva')
  )
  .subscribe(console.log)
