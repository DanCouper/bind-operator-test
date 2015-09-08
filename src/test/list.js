import List from '../list'
const test = require('tape')

test('Basic functionality, duplicating native chaining exactly.', (t) => {
  t.plan(2);
  t.deepEqual([1,2,3]::Array.prototype.map(x => x + 1),
              [2,3,4],
              'Map should map correctly.')

  t.deepEqual([1,2,3]::Array.prototype.filter(x => x > 1),
              [2,3],
              'Filter should filter correctly.')
})

test('Simple deletion of list items, duplicating native chaining exactly.', (t) => {
  const list = new List(5).fill(0).map((_, i) => i + 1) // [1,2,3,4,5]
  const del = List.prototype.delete

  t.plan(2)
  t.deepEqual(list::del(2), [1,3,4,5], 'should delete the number 2 from [1,2,3,4,5].')
  t.deepEqual(list::del(4)::del(5), [1,3], 'should delete the numbers 4 and 5 from [1,3,4,5].')
})

test('Deleting list items by index', (t) => {
  const list = new List(5).fill(0).map((_, i) => i + 1) // [1,2,3,4,5]
  const del_at = List.prototype.delete_at

  t.plan(2)
  t.deepEqual(list::del_at(1), [1,3,4,5], 'should delete the number 2 from [1,2,3,4,5].')
  t.deepEqual(list::del_at(3)::del_at(0), [3,4], 'should delete the numbers 5 and 1 from [1,3,4,5].')
})
