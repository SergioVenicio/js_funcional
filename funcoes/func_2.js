const powMaker = (exp) => {
  return (base) => Math.pow(base, exp)
}

const pow2 = powMaker(2)
const pow3 = powMaker(3)

console.log(
  pow2(2),
  pow2(4),
  pow2(8),
  pow2(16),
  pow2(32),
  pow2(64),
  pow2(128),
  pow2(1024)
)