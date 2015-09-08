import List from '../list'
const test = require('tape')

test('List.delete virtual function.', (t) => {
  t.plan(3)

  t.deepEqual([1,2,3]::List.delete(5),
              [1,2,3],
              '[1,2,3]::List.delete(5) passes a value not present, so should just return the input list.')

  t.deepEqual([1,2,3]::List.delete(1),
              [2,3],
              '[1,2,3]::List.delete(1) should return a new list without the 1.')

  t.deepEqual([1,2,3,4,5,6]::List.delete(3)::List.delete(5),
              [1,2,4,6],
              '[1,2,3,4,5,6]::List.delete(3)::List.delete(5) should return a new list without 3 and 5.')
})

test('List.delete_at virtual function.', (t) => {
  t.plan(2);
  t.deepEqual([1,2,3]::List.delete_at(0),
              [2,3],
              '[1,2,3]::List.delete_at(0) should return a new list without the 1.')

  t.deepEqual([1,2,3,4,5,6]::List.delete_at(2)::List.delete_at(4),
              [1,2,4,5],
              'chaining should return a new list with two items removed.')
})



test('List.first virtual function', (t) => {
  t.plan(1)
  t.equal([1,2,3]::List.first(),
  1,
  'should return the first value in the list.')
})

test('List.last virtual function', (t) => {
  t.plan(1)
  t.equal([1,2,3]::List.last(),
  3,
  'should return the last value in the list.')
})

test('List.replace_at virtual function', (t) => {
  t.plan(2)
  t.deepEqual([1,2,3]::List.replace_at(4, 10),
              [1,2,3],
              'if passed an out-of-bounds index, should return the original list.')
  t.deepEqual([1,2,3]::List.replace_at(2, 10),
              [1,2,10],
              'should return a new list with the new value at the specified index.')
})

test('List.update_at virtual function', (t) => {
  const cb = (el) => el + 10
  t.plan(3)
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


