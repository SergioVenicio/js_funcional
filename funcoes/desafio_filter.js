const carrinho = [
  { name: 'Caneta', qtde: 10, preco: 7.99 },
  { name: 'Impressora', qtde: 0, preco: 649.5 },
  { name: 'Caderno', qtde: 4, preco: 27.10 },
  { name: 'Lapis', qtde: 3, preco: 5.82 },
  { name: 'Tesoura', qtde: 1, preco: 19.20 },
]

const myFilter = (fn, arr) => {
  const newArr = []
  for(let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr) && newArr.push(arr[i])
  }

  return newArr
}

const filterQted = (item) => item.qtde > 0


console.log(carrinho.filter(filterQted).map(({ name }) => name))
console.log(myFilter(filterQted, carrinho).map(({ name }) => name))
