const path = require('path')
const fs = require('fs')
const { Observable } = require('rxjs')

const readDir = (dirname) => {
  return new Observable(subscriber => {
    const files = fs.readdirSync(dirname)
    while(true) {
      _file = files.shift()
      if (!_file) {
        subscriber.complete()
        return
      }
      subscriber.next(path.join(dirname, _file))
    }
  })
}

const replaceCharacters = (characters) => {
  const _replace_closure = (row) => {
    const char = characters.shift()
    if (!characters || !char || !row) {
      return row
    }

    const {regex: regexp, to} = char
    const newRow = String(row).replace(regexp, '')
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

const createPipeOperator = (baseOperator) => {
  return (source) => {
    return new Observable(subscriber => {
      const operator = baseOperator(subscriber)
      source.subscribe({
        next: operator.next || (v => subscriber.next(v)),
        complete: operator.complete || (_ => subscriber.complete()),
        error: operator.error || (e => subscriber.error(e)),
      })
    })
  }
}

const endsWith = (endOfString) => {
  return createPipeOperator(subscribe => ({
    next: text => {
      text.endsWith(endOfString) && subscribe.next(text)
    }
  }))
}

const readFile = () => {
  return createPipeOperator(subscribe => ({
    next: _f => {
      const content = fs.readFileSync(_f)
      subscribe.next(content.toString())
    }
  }))
}

const splitData = (splitter) => {
  return createPipeOperator(subscribe => ({
    next: (data) => {
      data.split(splitter).forEach(row => {
        subscribe.next(row)
      })
    }
  }))
}

const removeBlankRows = () => {
  return createPipeOperator(subscribe => ({
    next: row => {
      const newRow = row.trim()
      newRow && subscribe.next(newRow)
    }
  }))
}

const replaceData = filters => {
  return createPipeOperator(subscribe => ({
    next: row => {
      const newRow = replaceCharacters([...filters])(row)
      subscribe.next(newRow)
    }
  }))
}

const filterRows = (filters) => {
  return createPipeOperator(subscribe => ({
    next: row => {
      const newFilter = filterRegex([...filters])
      !newFilter(row) && subscribe.next(row)
    }
  }))
}

const toWords = () => {
  return createPipeOperator(subscribe => ({
    next: row => {
      row.split(' ').forEach(word => {
        word && subscribe.next(word.toLowerCase())
      })
    }
  }))
}

function groupElements() {
  const reducer = {}
  return createPipeOperator(subscriber => ({
      next(word) {
        const qtde = reducer[word] ? reducer[word].qtde + 1 : 1
        reducer[word] = { element: word, qtde }
      },
      complete() {
        subscriber.next(reducer)
      }
  }))
}

const writeResponse = (dirname) => {
  return createPipeOperator(subscribe => ({
    next: response => {
      const _file = path.join(dirname, 'resp.txt')
      fs.writeFile(_file, JSON.stringify(response), _ => {
        subscribe.next('OK')
      })
    }
  }))
}

module.exports = {
  endsWith,
  readDir,
  readFile,
  removeBlankRows,
  splitData,
  replaceData,
  writeResponse,
  filterRows,
  toWords,
  groupElements
}