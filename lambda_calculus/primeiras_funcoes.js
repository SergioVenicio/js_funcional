const I = a => a
const SELF = f => f(f)
const FIRST = a => _ => a
const FLIP = f => a => b => f(b)(a)
const SEC = a => b => FLIP(FIRST)(a)(b)

const T = FIRST
const F = SEC
const NOT = a => a(F)(T)
const OR = a => b => a(a)(b)
const AND = a  => b => a(b)(a)
const EQ = a => b => a(b)(NOT(b))
const XOR = a => b => NOT(EQ(a)(b))
T.inspect = () => 'TRUE'
F.inspect = () => 'FALSE'

let r = I(I)
r
r = FIRST(1)(2)
r
r = SEC(1)(2)
r
r = FLIP(FIRST)(1)(2)
r
r = SEC(1)(2)
r = NOT(T)
r
r = AND(T)(F)
r
r = OR(T)(F)
r
r = EQ(T)(T)
r
r = EQ(T)(F)
r
r = EQ(F)(F)
r
r = EQ(F)(T)
r
r = XOR(T)(T)
r
r = XOR(T)(F)
r
r = XOR(F)(F)
r
r = XOR(F)(T)
r
