# Bind Operator Test

[![Build Status](https://semaphoreci.com/api/v1/projects/c36ee1ae-c85d-447b-b358-864cc2ee5fdc/533839/badge.svg)](https://semaphoreci.com/dancouper/bind-operator-test)

[![Coverage Status](https://coveralls.io/repos/DanCouper/bind-operator-test/badge.svg?branch=master&service=github)](https://coveralls.io/github/DanCouper/bind-operator-test?branch=master)

## About

Test of the proposed ES7 bind operator `::` ([proposal](https://github.com/zenparsing/es-function-bind), [strawman](http://wiki.ecmascript.org/doku.php?id=strawman:bind_operator)).

This repo contains a simplified version of Elixir/Erlang's List/:list module, implemented as a series of virtual functions. The virtual functions can be chained using the bind operator.

### Usage

`import List from 'list'`.

Starting with the initial list, chain on *n* transfomer functions using `::`.
The tranformer functions are all implemented as methods under the `List` constant. `this` in the functions always refers to a list, and currently [natch] necessitates the functions being explicitly bound.

Each transformer function does not necessarily return a new list.
**TODO** Passing an empty list should generlly return an empty list.

### Implemented Functions

**Note 1** none of the `key_` functions (*eg* `List.keysort`) have been implemented as they deal with tuples, which JS most definitely does not have.
**Note 2** none of the `to_` functions (*eg* `List.to_integer`) have been implemented as they mainly deal in charlists *etc*; not very useful.

#### `List.delete(value)`

```
> [1,2,3,4]::List.delete(3)
[1,2,4]
```

#### `List.delete_at(index)`

```
> [1,2,3,4]::List.delete(3)
[1,2,4]
```

#### `List.first()`

```
> [1,2,3,4]::List.first()
1
```

#### `List.foldl(acc, callback)`
#### `List.foldr(acc, callback)`

#### `List.last()`

```
> [1,2,3,4]::List.last()
4
```

#### `List.replace_at(index, value)`

```
> [1,2,3,4]::List.replace_at(1, 'fart')
[1, 'fart', 3, 4]
```

#### `List.update_at(index, callback)`

```
> [1,2,3,4]::List.update_at(1, add2(v) => v + 2)
[1, 4, 3, 4]
```

#### `List.wrap(args)`
