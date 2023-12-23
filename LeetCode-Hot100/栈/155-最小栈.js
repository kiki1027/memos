var MinStack = function () {
  this.stack = []
  this.minStack = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val)
  if (this.minStack.length) {
    const min = this.getMin()
    this.minStack.push(Math.min(min, val))
  } else {
    this.minStack.push(val)
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.minStack.pop()
  this.stack.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[Math.max(this.stack.length - 1, 0)]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[Math.max(this.minStack.length - 1, 0)]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
