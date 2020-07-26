const { interval } = require('rxjs')

const getNumbers = interval(500)

const subscription = getNumbers.subscribe(
  num => console.log(Math.pow(2, num))
)

const subscription2 = getNumbers.subscribe(
  num => console.log(num)
)

setTimeout(() => {
  subscription.unsubscribe()
  subscription2.unsubscribe()
}, 5000)