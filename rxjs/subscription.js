const { timer, Subscription } = require('rxjs')

const sub = new Subscription()
const numbers = timer(3000, 500)
const sub1 = numbers.subscribe(n => console.log(`1# : ${n}`))
const sub2 = numbers.subscribe(n => console.log(`2# : ${n}`))

sub.add(sub1)
sub.add(sub2)

setTimeout(() => {
  sub.unsubscribe()
}, 5000)
