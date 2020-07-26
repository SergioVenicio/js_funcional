const path = require('path')
const { 
  endsWith,
  readFile,
  readDir,
  splitData,
  removeBlankRows,
  filterRows,
  replaceData,
  toWords,
  groupElements,
  writeResponse
} = require('./funcoes')
const { map } = require('rxjs/operators')
const _ = require('lodash')


const PATH_DIR = path.join(__dirname, 'dados', 'legendas')
const regexToCompar = [
  /^\r$/,
  /^\n$/,
  /^$/,
  /\d{1,}/,
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
  {regex: /♪/mg, to: ''},
  {regex: /\?/mg, to: ''},
  {regex: /!/mg, to: ''},
]

readDir(PATH_DIR)
  .pipe(endsWith('.srt'))
  .pipe(readFile())
  .pipe(
    splitData('\n'),
    removeBlankRows(),
    filterRows(regexToCompar),
    replaceData(charactersToReplace),
    removeBlankRows(),
    toWords()
  )
  .pipe(
    groupElements(),
    map(words => _.sortBy(words, word => -word.qtde))
  )
  .pipe(
    writeResponse(PATH_DIR)
  )
  .subscribe(console.log)