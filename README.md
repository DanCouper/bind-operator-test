# Bind Operator Test

[![Build Status](https://semaphoreci.com/api/v1/projects/c36ee1ae-c85d-447b-b358-864cc2ee5fdc/533839/badge.svg)](https://semaphoreci.com/dancouper/bind-operator-test)

[![Coverage Status](https://coveralls.io/repos/DanCouper/bind-operator-test/badge.svg?branch=master&service=github)](https://coveralls.io/github/DanCouper/bind-operator-test?branch=master)

```
import { duplicate, del, first } from 'list'

> [0,1,2,3]::del(0)::first()::duplicate(3)
// [0,1,2,3] -> [1,2,3] -> 1 -> [1,1,1]
```

```
import List from 'list'

> List.wrap(1,2,3,4)::List.del(4)::List.last()
// [1,2,3,4] -> [1,2,3] -> 3
```


## Intro

Test of the proposed ES7 bind operator `::` ([proposal](https://github.com/zenparsing/es-function-bind), [strawman](http://wiki.ecmascript.org/doku.php?id=strawman:bind_operator)).

## About

This repo contains a simplified version of Elixir/Erlang's List/:list module, implemented as a series of [essentially virtual] functions. These functions can be chained using the bind operator. This is facilitated by the use of a decorator function that fixes their arity and injects a `this` context as the first argument if the function is chained. The bind operator can then be used to bind the result of the previous computation to `this`. It works the same as Elixir's pipe (`|>`) operator, or the Unix pipe (`|`).

The arity function (with zero error handling) module:
```
const enforceArity = (fn, arity) =>
  function(...args) {
    if (arity - args.length == 1) {
      return fn.call(this, this, ...args)
    } else {
      return fn.call(null, ...args)
    }
  }
```

Example lib:
```
const add = (a,b) => a + b
const mul = (a,b) => a * b

const Calc = {
    add: enforceArity(add, 2),
    mul: enforceArity(mul, 2),
}

export default Calc
```

Usage:
```
import { add, mul } from 'calc'

> 2::add(4)::mul(7)
42
```

## Requirements

This requires [Babel](http://babeljs.io) be installed and up-to-date, and the test commands all use `--stage 0` to turn on [experimental ES7 features](http://babeljs.io/docs/usage/experimental/). Node v0.12.7 used (I am getting segfaults/various other errors on Node 4.0).

### Usage

> **IMPORTANT** the functions have **fixed arity**; this is the only sensible
> way I can think of to allow autofilling of the first argument to allow
> chaining. Errors *should* be thrown if the args passed do not match the
> arity, however this is proving harder than it should be to implement,
> and is breaking my tests, hence is on the back burner for now.

The functions can be used on their own, in which case the first argument is the item to operate upon. For example:
```
> List.del([1,2,3], 2)
[1,3]
```

When they are used in conjunction with the bind operator, the first argument is autofilled as `this`, allowing them to be chained indefinitely.

```
> [1,2,3,4,5,6]::List.replace_at(1, 10)::List.delete_at(0)::List.first()
10
```


### Implemented Functions

#### `List.del(list, value)`

Returns a new list with the specified value removed.

```
> List.del([1,2,3,4], 3)
[1,2,4]

> [1,2,3,4]::List.del(3)
[1,2,4]
```

#### `List.del_at(list, index)`

Returns a new list with the value at the specified index removed.

```
> List.del_at([1,2,3,4], 3)
[1,2,3]

> [1,2,3,4]::List.del_at(3)
[1,2,3]
```

#### `List.duplicate(item, times)`

Returns a list of *n* times the item.
*NOTE the test on this should pass without issue: ES6/strict mode should prevent boxed objects being returned in lieu of primitives. This isn't happening, so there is an ugle if/else block to manually unbox `this` values.*

```
> List.duplicate('foo', 3)
['foo','foo','foo']
```

```
> 'foo'::List.duplicate(3)
['foo','foo','foo']
```


#### `List.first(list)`

Returns the first value in the given list.

```
> List.first([1,2,3,4])
1

> [1,2,3,4]::List.first()
1
```

#### `List.foldl(list, acc, callback)`
**currently unimplemented**

#### `List.foldr(list, acc, callback)`
**currently unimplemented**

#### `List.last(list)`

Returns the last item in the list.

```
> List.last(1,2,3,4)
4

> [1,2,3,4]::List.last()
4
```

#### `List.replace_at(list, index, value)`

Returns a new list with the value at the specfied index replaced with a new value.

```
> List.replace_at([1,2,3,4], 1, 'fart')
[1, 'fart', 3, 4]

> [1,2,3,4]::List.replace_at(1, 'fart')
[1, 'fart', 3, 4]
```

#### `List.update_at(list, index, callback)`

As `List.replace_at/3`, but accepts a callback rather than a value.

```
> const add2 = (v) => v + 2

> List.update_at([1,2,3,4], 1, add2)
[1, 4, 3, 4]

> [1,2,3,4]::List.update_at(1, add2)
[1, 4, 3, 4]
```

#### `List.wrap(args)`

Wraps passed values in an array, and returns that array. If the passed value is already an array, just returns that.

```
> List.wrap('fart')
['fart']

> 'fart'::List.wrap()
['fart']
```


#### `List.zip(listOfLists)`

Zips an array of arrays. Extra values are ignored; the zip operation will return a number of zipped lists equal to the shortest subarray. Each will be of length equal to the `listOfLists` length. Empty lists are ignored.

```
> List.zip([[1,2], [], [1,2,3], [1,2]])
[[1,1,1],[2,2,2]]

> [[1,2], [], [1,2,3], [1,2]]::List.zip()
[[1,1,1],[2,2,2]]
```
