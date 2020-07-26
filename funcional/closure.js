const criaSomar = (x) => {
  // Closure é uma função que lembra do escopo léxico (x)
  return n => n + x
}

const somar1 = criaSomar(1)
const somar10 = criaSomar(10)

console.log(somar1(10))
console.log(somar10(10))