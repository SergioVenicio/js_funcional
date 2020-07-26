const { Observable, Subject } = require('rxjs')

const getObs = () => new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next(`OBS: ${Math.random()}`)
    subscriber.complete()
  }, 1000)
})

const obs = getObs()
obs.subscribe(console.log)
obs.subscribe(console.log)


/* MultiCast */
const getSubj = () => { 
  const sub = new Subject()
  setTimeout(() => {
    sub.next(`SUB: ${Math.random()}`)
    sub.complete()
  }, 1000)
   
  return sub
}

const sub = getSubj()
sub.subscribe(console.log)
sub.subscribe(console.log)
