const enforceArity = (fn, arity) =>
  function(...args) {
    //if(arity - args.length < 1) throw new Error('Not enough arguments passed.')
    //if(args.length - arity > 0) throw new Error('Too many arguments passed.')

    if (arity - args.length == 1) {
      return fn.call(this, this, ...args)
    } else {
      return fn.call(null, ...args)
    }
  }

export default enforceArity
