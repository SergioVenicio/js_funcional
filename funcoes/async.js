// esperar = async (sec = 2000) => {
//   setTimeout(()=>{}, sec)
// }

// calc = async (sec = 2000) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       return resolve(Math.random() * 100)
//     }, sec)
//   })
// }

// const exec = async () => {
//   const n = await calc(3500)
//   const n2 = await calc(5900)
//   const n3 = await calc(2500)

//   console.log(`Async 1 ... ${n}`)
//   console.log(`Async 2 ... ${n2}`)
//   console.log(`Async 3 ... ${n3}`)

//   return new Promise((resolve) => {
//     resolve('OK')
//   })
// }

// exec().then(console.log)

const getRandom = async (max, min) => {
  const factor = max - min + 1
  return parseInt(Math.random() * factor) + min
}

const getNumbers = async (min, max, forbidden = []) => {
  if (min > max) [max, min] = [min, max]

  return new Promise(async (resolve, reject) => {
    const random = await getRandom(max, min)
    if (forbidden.includes(random)) {
      reject('Forbidden')
    }
    resolve(random)
  })
}

const mega = async () => {
  const numbers = []

  for (i = 0; i < 6; i++) {
    numbers.push(await getNumbers(1, 60, numbers))
  }

  return numbers
}

mega()
  .then(console.log)
  .catch(console.warn)


