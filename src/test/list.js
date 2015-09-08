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
              '[1,2,3,4,5,6]::List.delete_at(2)::List.delete_at(4) should return a new list without 3 and 6.')
})

test('List.first virtual function', (t) => {
  t.plan(1)
  t.equal([1,2,3]::List.first(),
  1,
  '[1,2,3]::List.first should return 1, the first value.')
})

test('List.last virtual function', (t) => {
  t.plan(1)
  t.equal([1,2,3]::List.last(),
  3,
  '[1,2,3]::List.last should return 3, the last value.')
})

