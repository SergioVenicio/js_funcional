const carrinho = [
  { name: 'Caneta', qtde: 10, preco: 7.99 },
  { name: 'Impressora', qtde: 0, preco: 649.5 },
  { name: 'Caderno', qtde: 4, preco: 27.10 },
  { name: 'Lapis', qtde: 3, preco: 5.82 },
  { name: 'Tesoura', qtde: 1, preco: 19.20 },
]

const myMap = (fn, arr) => {
  let newArr = []

  for (let i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i], i, arr))
  }

  return newArr
}

console.log(carrinho.map(item => item.name))
console.log(carrinho.map(item => item.qtde * item.preco))
console.log(myMap((a) => a * 2, [1, 2, 3]))
