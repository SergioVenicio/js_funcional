const somar = (a) => {
  return (b) => (c) => a + b + c
}

const calcular = (a) => {
  return (b) => (call) => call(a, b)
}

console.log(somar(3)(4)(5))
console.log(calcular(4)(4)((a, b) => a * b))


const carrinho = [
  { name: 'Caneta', qtde: 10, preco: 7.99, fragil: true },
  { name: 'Impressora', qtde: 1, preco: 649.5, fragil: true },
  { name: 'Caderno', qtde: 4, preco: 27.10, fragil: false },
  { name: 'Lapis', qtde: 3, preco: 5.82, fragil: false },
  { name: 'Tesoura', qtde: 1, preco: 19.20, fragil: true },
]

const fragiles = carrinho.filter(item => item.fragil)
const fragilePrices = fragiles.map(({ preco, qtde }) => {
  return preco * qtde
})
const fragileMeans = fragilePrices.reduce(( mean, value, idx, arr ) => {
  const qtde = mean.qtde + 1
  const total = mean.total + value

  if (idx + 1 < arr.length) {
    return {
      qtde,
      total,
      media: total / qtde
    }
  }

  return total / qtde
}, { qtde: 0, total: 0, value: 0 })

console.log(fragileMeans)
