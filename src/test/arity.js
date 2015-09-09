import enforceArity from '../arity'
const test = require('tape')



test('Enforced arity with `this` insertion', (t) => {
  function add(a,b) { return a + b; }
  const Calc = { add: enforceArity(add, 2) }

  t.plan(2)
  //t.throws(Calc.add())
  t.equal(Calc.add(2,2),
          4,
          'Function operates normally is given correct args.')
  t.equal(2::Calc.add(2),
          4,
          'Function uses `this` as the first argument if args.length - 1 passed.')
})
