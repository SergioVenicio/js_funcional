const gerarElementos = (arr) => {
  return {
    init: (fn) => {
      let idx = 0
      const inter = setInterval(() => {
        if (idx >= arr.length) {
          clearInterval(inter)
        } else {
          fn(arr[idx])
          idx++
        }
      }, 1000)
    } 
  }
}

const sub = gerarElementos([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
])

setTimeout(() => sub.init(console.log), 4000)