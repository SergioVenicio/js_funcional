const fs = require('fs')
const path = require('path')

const _file = path.join(__dirname, 'dados.txt')

const FileReader = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {}, (error, content) => {
      if (error) reject(error)
      resolve(content)
    })
      
  })
}
const showContent = (content) => {
  console.log(content.toString())
}

const fileReader = FileReader(_file)

fileReader
  .then(content => content.toString().split('\n'))
  .then(content => content.join(', '))
  .then(console.log)
  .catch(e => console.log(e))