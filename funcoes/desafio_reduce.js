const carrinho = [
  { name: 'Caneta', qtde: 10, preco: 7.99 },
  { name: 'Impressora', qtde: 0, preco: 649.5 },
  { name: 'Caderno', qtde: 4, preco: 27.10 },
  { name: 'Lapis', qtde: 3, preco: 5.82 },
  { name: 'Tesoura', qtde: 1, preco: 19.20 },
]


const total = carrinho.reduce((total, { qtde, preco }) => {
  return total + (qtde * preco)
}, 0)

console.log(total)


const total2 = carrinho.map(({qtde, preco}) => qtde * preco).reduce((total, value) => {
  return total + value
}, 0)

console.log(total2)