const path = require('path')
const fn = require('./funcoes')
const PATH_DIR = path.join(__dirname, 'dados', 'legendas')
const regexToCompar = [
  /^\r$/,
  /^$/,
  /\d{1,}/
]
const charactersToReplace = [
  {regex: /-/mg, to: ''},
  {regex: /\"\"/mg, to: ''},
  {regex: /,/mg, to: ''},
  {regex: /\./mg, to: ''},
  {regex: /<[^>]*>/mg, to: ''},
  {regex: /\[/mg, to: ''},
  {regex: /\//mg, to: ''},
  {regex: /\]/mg, to: ''},
]

const splitData = data => data.join('\n').split('\n')
const filterRows = rows => rows.filter(row => {
  const filterFuntion = fn.filterRegex([...regexToCompar])
  return filterFuntion(row)
})
const replaceChars = rows => rows.map(row => {
  const fnReplace = fn.replaceCharacters([...charactersToReplace])
  return fnReplace(row)
})
const trimRows = rows => rows.map(row => row.trim())
const reduceRows = rows => rows.reduce((fullString, row) => {
  return [...fullString, ...row.split(' ')]
}, [])
const rowsTochars = chars => {
  return chars.reduce((counter, char) => {
    if (!char || char === "'" || char === '"' || char === ' ') return counter
    if (counter[char]) {
      counter[char] += 1
    } else {
      counter[char] = 1
    }
    return counter
  }, {})
}

const orderChars = chars => {
  const sorted = Object.keys(chars).sort((a, b) => chars[b] - chars[a])
  return sorted.reduce((newObj, char) => {
    return {
      ...newObj,
      [char]: chars[char]
    }
  }, {})
}

const pipeLine = (fns) => {
  return (value) => {
    return fns.reduce(async (dataset, fn) => {
      if (Promise.resolve(dataset) === dataset) {
        return fn(await dataset)
      } else {
        return fn(dataset)
      }
    }, value)
  }
}

fn.readDir(PATH_DIR)
  .then(files => {
    return Promise.all(
      files.map(file => fn.readFile(file))
    )
  })
  .then(dataset => {
    const fns = [
      splitData,
      filterRows,
      replaceChars,
      trimRows,
      reduceRows,
      rowsTochars,
      orderChars,
      fn.writeResponse(PATH_DIR)
    ]
    pipeLine(fns)(dataset)
  })
  .catch(console.error)
