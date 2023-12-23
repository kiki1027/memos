class ListNode {
  constructor(key, val, prev, next) {
    this.key = key
    this.val = val
    this.prev = prev
    this.next = next
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.count = 0
  // 虚拟头
  this.dummyHead = new ListNode()
  // 虚拟尾
  this.dummyTail = new ListNode()
  // 初始化首尾相连，这样在空链表时访问dummyHead/dummyTail不用额外做判空了
  this.dummyHead.next = this.dummyTail
  this.dummyTail.prev = this.dummyHead
  this.cache = {}
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (key in this.cache) {
    let node = this.cache[key]
    this.moveToHead(node)
    return node.val
  }
  return -1
}

/**
 * 删除node
 * @param {ListNode} node
 * @return {ListNode}
 */
LRUCache.prototype.remove = function (node) {
  let next = node.next
  let prev = node.prev
  prev.next = next
  next.prev = prev
  return node
}

/**
 * 插入头部
 * @param {ListNode} node
 * @return {ListNode}
 */
LRUCache.prototype.addToHead = function (node) {
  node.next = this.dummyHead.next
  node.prev = this.dummyHead
  this.dummyHead.next.prev = node
  this.dummyHead.next = node
}

/**
 * 插入尾部
 * @param {ListNode} node
 * @return {ListNode}
 */
LRUCache.prototype.addToTail = function (node) {
  node.prev = this.dummyTail.prev
  node.next = this.dummyTail
  this.dummyTail.prev.next = node
  this.dummyTail.prev = node
}

/**
 * 移动到头部
 * @param {ListNode} node
 * @return {ListNode}
 */
LRUCache.prototype.moveToHead = function (node) {
  this.remove(node)
  this.addToHead(node)
}

/**
 * 移动到尾部
 * @param {ListNode} node
 * @return {ListNode}
 */
LRUCache.prototype.moveToTail = function (node) {
  this.remove(node)
  this.addToTail(node)
}

/**
 * 移除尾部
 * @return {null}
 */
LRUCache.prototype.removeTail = function () {
  let node = this.remove(this.dummyTail.prev)
  delete this.cache[node.key]
  this.count--
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.get(key) !== -1) {
    // 更新
    let node = this.cache[key]
    node.val = value
    this.moveToHead(node)
  } else {
    if (this.count > 0 && this.count === this.capacity) {
      this.removeTail()
    }
    // 插入
    const node = new ListNode(key, value)
    this.addToHead(node)
    this.cache[key] = node
    this.count++
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
