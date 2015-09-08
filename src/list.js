class List extends Array {
  constructor(length) {
    super()
    this.length = length
  }

  delete(item) {
    let i = this.indexOf(item)
    this.splice(i, 1)
    return this
  }

  delete_at(index) {
    this.splice(index, 1)
    return this
  }
}

export default List
