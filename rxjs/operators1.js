const { of } = require('rxjs')
const { first, map, filter } = require('rxjs/operators')

of(
  'x', 1, 2, 'abacate', 3, 4, 5, 6, 7, 'a', 'b', 3, Math.PI
)
.pipe(
  filter(x => Number.isInteger(x)),
  first(),
  map(v => v * 100),
  map(v => `O valor é ${v}....`),
)
.subscribe(console.log)