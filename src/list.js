import enforceArity from './arity'

const del = function(list, item) {
  let index = list.indexOf(item)
  if(!index in list) return list

  return list.filter((_, i) => index !== i)
}

const del_at = function(list, index) {
  if(!index in list) return list

  return list.filter((_, i) => index !== i)
}

const duplicate = function(item, times) {
  return Array(times).fill(item)
}

const first = function(list) {
  let [head, ...tail] = list
  return head
}

const foldl = function(list, acc, callback) {
  return list.reduce(callback, acc)
}

const foldr = function(list, acc, callback) {
  return list.reduceRight(callback, acc)
}

const last = function(list) {
  let [head, ...tail] = list.reverse()
  return head
}

const replace_at = function(list, index, value) {
  if(!index in list) return list

  return list.map(function(v, i) {
    // NOTE explicit function/return pair;
    // fat arrow not working in this case.
    return index === i ? value : v
  })
}

const update_at = function(list, index, callback) {
  if(!index in list) return list

  return list.map(function(v, i) {
    return index === i ? callback.apply(null, arguments) : v
  })
}

const wrap = function(...items) {
  if(items.length === 1 && Array.isArray(items[0])) return items[0]
  return [...items]
}

const zip = function(listOfLists) {
  let op = listOfLists.filter(arr => arr.length !== 0) // remove empty arrays
  let shortest = op.reduce((p,c) => (p.length > c.length) ? c : p ).length
  return [for (i of Array(shortest).keys())
            op.reduce(function(acc, curr) {
              acc.push(curr[i]);
              return acc }, [])]
}

const List = {
  del: enforceArity(del, 2),
  del_at: enforceArity(del_at, 2),
  duplicate: enforceArity(duplicate, 2),
  first: enforceArity(first, 1),
  foldl: enforceArity(foldl, 3),
  foldr: enforceArity(foldr, 3),
  last: enforceArity(last, 1),
  replace_at: enforceArity(replace_at, 3),
  update_at: enforceArity(update_at, 3),
  wrap: enforceArity(wrap, 1),
  zip: enforceArity(zip, 1)
}

export default List
