const { time } = require("console")

const gerarNumeros = () => {
  return {
    start: (fn) => {
      const timer = setInterval(() => {
        return fn(Math.random())
      }, 1000)

      return {
        stop: () => clearInterval(timer)
      }
    }
  }
}

const t = gerarNumeros()
const t2 = gerarNumeros()
const sub1 = t.start(console.log)
const sub2 = t2.start(console.log)

setTimeout(() => {
  sub1.stop()
  sub2.stop()
}, 10000)
