const readline = require('readline')
const { resolve } = require('path')

const getResponse = (questionSrt) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    rl.question(questionSrt, resp => {
      resolve(resp)
      rl.close()
    })
  })
}

const namorada = (evnt) => {
  if (evnt !== 's') return

  console.log('N: Apagar as luzes...')
  console.log('N: Pedir silêncio...')
  console.log('N: Surpresa!!!')
}

const sindico = () => {
  console.log('S: Monitorando o barulho...\n')
}

const porteiro = async (interessados) => {
  while (true) {
    const resp = await getResponse('O namorado chegou? (s/N/q) ')

    if (resp.toLowerCase() === 'q') {
      break
    }
    interessados.map(obs => obs(resp))

    if (resp.toLowerCase() === 's') {
      break
    }
  }
}

porteiro([namorada, sindico])