const fn1 = () => {
  console.log('fn1')
  fn2()
}

const fn2 = () => {
  console.log('fn2')
  fn3()
}

const fn3 = () => {
  setTimeout(() => {
    console.log('fn3')
  }, 3000)
}

const main = () => {
 fn1()
}


main()