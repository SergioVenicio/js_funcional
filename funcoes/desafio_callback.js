const runner = (fn, ...args) => {
  return fn(args)
}

const calc = (numbers, op = '+', initial = 0) => {
  return numbers.reduce((result, n) => {
    if (op === '-') return result - n
    if (op === '+') return result + n
  }, initial)
}

const sum = (numbers) => {
  const calcValue = calc(numbers)
  console.log('SUM: ', calcValue)
  return calcValue
}

const sub = (numbers) => {
  const initial = numbers.shift()
  const calcValue = calc(numbers, '-', initial)
  console.log('SUB: ', calcValue)
  return calcValue
}

runner(sum, 56, 38)
runner(sub, 182, 27, 155, 10)