// IMPURA
const areaCirc = (raio) => Math.pow(raio, 2) * Math.PI

// Pura
const areaPura = (raio) => Math.pow(raio, 2) * 3.141592653589793

console.log(areaCirc(10))
console.log(areaPura(10))

// Impura
const gerarNumero = (min, max) => {
  return parseInt(Math.random() * (max - min + 1)) + min
}

console.log(gerarNumero(5, 6))
console.log(gerarNumero(5, 6))
console.log(gerarNumero(5, 6))
console.log(gerarNumero(5, 6))
console.log(gerarNumero(5, 6))
console.log(gerarNumero(5, 6))

// Pura
const somar = (a, b) => a + b

console.log(somar(5, 6))
console.log(somar(51, 6))
console.log(somar(5, 16))
console.log(somar(5, 36))
console.log(somar(53, 6))
console.log(somar(54, 56))
console.log(somar(5, 56))
