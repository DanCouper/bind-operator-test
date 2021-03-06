import List from '../list'
const test = require('tape')

test('List.del function...', (t) => {
  t.plan(4)

  t.deepEqual(List.del([1,2,3], 2),
              [1,3],
              'running the function without chaining should return expected value.')

  t.deepEqual([1,2,3]::List.del(5),
              [1,2,3],
              'passing an unmatched value should return the input list.')

  t.deepEqual([1,2,3]::List.del(1),
              [2,3],
              'passing a matched value should return a new list without that value.')

  t.deepEqual([1,2,3,4,5,6]::List.del(3)::List.del(5),
              [1,2,4,6],
              'chaining matched deletions should cause a new list to be returned without those values.')
})

test('List.del_at function...', (t) => {
  t.plan(4);

  t.deepEqual(List.del_at([1,2,3], 2),
              [1,2],
              'running the function without chaining should return expected value.')

  t.deepEqual([1,2,3]::List.del_at(10),
              [1,2,3],
              'passing an out-of-bounds index should return the original list.')

  t.deepEqual([1,2,3]::List.del_at(0),
              [2,3],
              'passing an in-bounds index should return a new list without that value.')

  t.deepEqual([1,2,3,4,5,6]::List.del_at(2)::List.del_at(4),
              [1,2,4,5],
              'chaining should return a new list with two items removed.')
})

test('List.duplicate function...', (t) => {
  // NOTE the test on this should pass without issue:
  // ES6/strict mode should prevent boxed objects being returned
  // in lieu of primitives. This isn't happening, so there is
  // an ugle if/else block to manually unbox `this` values.
  "use strict"
  t.plan(4)

  t.deepEqual(List.duplicate('fart', 3),
              ['fart','fart','fart'],
              'running the function without chaining should return a list of *n* duplicates of the value passed')

  t.deepEqual('fart'::List.duplicate(3),
              ['fart','fart','fart'],
              'should return a list of *n* duplicates of the value passed')

  t.deepEqual([1,2]::List.duplicate(3),
               [[1,2],[1,2],[1,2]],
               'should return an array of *n* duplicates of the array passed')

  t.deepEqual(1::List.duplicate(3),
               [1,1,1],
               'should return an array of *n* duplicates of the number passed')
})

test('List.first function...', (t) => {
  t.plan(2)
  t.equal(List.first([1,2,3]),
          1,
          'running function without chaining should return correct value.')

  t.equal([1,2,3]::List.first(),
          1,
          'should return the first value in the list.')
})

test('List.last function...', (t) => {
  t.plan(2)

  t.equal(List.last([1,2,3]),
          3,
          'running function without chaining should return correct value.')

  t.equal([1,2,3]::List.last(),
          3,
          'should return the last value in the list.')
})

test('List.replace_at function...', (t) => {
  t.plan(3)

  t.deepEqual(List.replace_at([1,2,3], 0, 'fart'),
              ['fart',2,3],
              'runnning function without chaining should return new list with replacement as expected.')

  t.deepEqual([1,2,3]::List.replace_at(4, 10),
              [1,2,3],
              'if passed an out-of-bounds index, should return the original list.')

  t.deepEqual([1,2,3]::List.replace_at(2, 10),
              [1,2,10],
              'should return a new list with the new value at the specified index.')
})

test('List.update_at function...', (t) => {
  const cb = (el) => el + 10
  t.plan(4)

  t.deepEqual(List.update_at([1,2,3], 2, cb),
              [1,2,13],
              'running function without chaining should return new list with replacement as expected.')

  t.deepEqual([1,2,3]::List.update_at(4, cb),
              [1,2,3],
              'if passed an out-of-bounds index, should return the original list.')

  t.deepEqual([1,2,3]::List.update_at(2, cb),
              [1,2,13],
              'should return a new list with the new value at the specified index.')

  t.deepEqual([1,2,3]::List.update_at(2, (v) => v + 10),
              [1,2,13],
              'should return a new list with the new value at the specified index.')
})

test('List.wrap function...', (t) => {
  t.plan(3)

  t.deepEqual(List.wrap('fart'),
              ['fart'],
              'running function without chaining should return a wrapped value')

  t.deepEqual(List.wrap(1,2,3,4),
              [1,2,3,4],
              'passed arguments should be wrapped in an array')

  t.deepEqual([1,2,3,4]::List.wrap(),
              [1,2,3,4],
              'if an array is passed, it should be returned as-is')
})

test('List.zip function...', (t) => {
  t.plan(4)

  t.deepEqual(List.zip([[1,2],[3,4],[1,4]]),
              [[1,3,1],[2,4,4]],
              'running function without chaining should zip list of lists of equal size')

  t.deepEqual([[1,2],[3,4],[1,4]]::List.zip(),
              [[1,3,1],[2,4,4]],
              'running function should zip list of lists of equal size')

  t.deepEqual([[1,2,3,4],[3,4,5],[1,4]]::List.zip(),
              [[1,3,1],[2,4,4]],
              'zipping should stop based on the length of the shortest list; extra values should be discarded.')

  t.deepEqual([[],[1,2],[3,4],[],[1,4]]::List.zip(),
              [[1,3,1],[2,4,4]],
              'empty lists should be ignored.')

})


