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
    [head, ...tail] = this
    return head
  },

  foldl(callback, acc = null) {
    return this.reduce(callback, acc)
  },

  foldr(callback, acc = null) {
    return this.reduceRight(callback, acc)
  },

  last() {
    [head, ...tail] = this.reverse()
    return head
  },

  replace_at(index, value) {
    if(!index in this) return this

    return this.map((v, i) => {
      index === i ? value : v
    })
  },

  update_at(index, callback) {
    if(!index in this) return this

    return this.map((v, i) => {
      index === i ? v::callback : v
    })
  }

}

export default List
