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

Each transformer function returns either a new list*, a value, or a boolean.

\* *Except if an out-of-bounds [index/value] parameter is passed, in which case the original list will be returned.*

**TODO** Passing an empty list should return an empty list.

### Implemented Functions

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
> [1,2,3,4]::first()
1
```

#### `List.foldl(callback, acc)`
#### `List.foldr(callback, acc)`

#### `List.last()`

```
> [1,2,3,4]::last()
4
```

#### `List.replace_at(index, value)`

```
> [1,2,3,4]::replace_at(1, 'fart')
[1, 'fart', 3, 4]
```

#### `List.update_at(index, callback)`

```
> [1,2,3,4]::update_at(1, add2(v) => v + 2)
[1, 4, 3, 4]
```
