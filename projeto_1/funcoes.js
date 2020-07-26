const path = require('path')
const fs = require('fs')

const fileFilter = (ext) => {
  return (file) => String(file).endsWith(ext)
}
const srtFilter = fileFilter('.srt')

const readDir = (dirname) => {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(dirname)
                        .filter(srtFilter)
                        .map(_f => path.join(dirname, _f))
      resolve(files)
    } catch (e) { reject(e) }
  })
}


const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      err && reject(err) || resolve(content.toString())
    })
  })
}

const replaceCharacters = (characters) => {
  const _replace_closure = (row) => {
    const char = characters.shift()
    if (!characters || !char) {
      return row
    }
  
    const {regex, to} = char
    const newRow = row.replace(regex, to)
    return _replace_closure(newRow)
  }
  return _replace_closure
}

const filterRegex = (regexToCompar) => {
  const _filter_closure = (row) => {
    const regexFilter = regexToCompar.shift()
    if (!regexToCompar) return true
    const resp = (
      !row.match(regexFilter) &&
      !_filter_closure(row)
    )
    return resp
  }

  return _filter_closure
}

const writeResponse = (dirname) => {
  return (response) => {
    return new Promise((resolve, reject) => {
      const _file = path.join(dirname, 'resp.txt')
      fs.writeFile(_file, JSON.stringify(response), err => {
        err && reject(err)
        resolve('OK')
      })
    })
  }
}

module.exports = {
  filterRegex,
  readDir,
  readFile,
  replaceCharacters,
  writeResponse
}