const List = {
  // `this` will always refer
  // to the input list.
  delete(item) {
    let index = this.indexOf(item)
    if(!index in this) return this

    return this.filter((_, i) => index !== i)
  },

  delete_at(index) {
    if(!index in this) return this

    return this.filter((_, i) => index !== i)
  },

  first() {
    let [head, ...tail] = this
    return head
  },

  foldl(callback, acc = null) {
    return this.reduce(callback, acc)
  },

  foldr(callback, acc = null) {
    return this.reduceRight(callback, acc)
  },

  last() {
    let [head, ...tail] = this.reverse()
    return head
  },

  replace_at(index, value) {
    if(!index in this) return this

    return this.map(function(v, i) {
      // NOTE explicit function/return pair;
      // fat arrow not working in this case.
      return index === i ? value : v
    })
  },

  update_at(index, callback) {
    if(!index in this) return this

    return this.map(function(v, i) {
      return index === i ? callback.apply(null, Array.from(arguments)) : v
    })
  },

  // Need to figure out this. It can *either* be passed
  // a value from `this` to deal with, or it can act as
  // a 'static' method. It *cannot* do both, and there need be
  // slightly different ways of dealing with each.
  // wrap(...items) {
  //   if(items.length === 1 && Array.isArray(items[0])) return items[0]
  //   return [...items]
  // }

}

export default List
