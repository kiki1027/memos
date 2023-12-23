/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map()
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1)
  })

  const res = new MinHeap()
  map.forEach((value, key) => {
    // 插入并建堆完成
    res.insert({ value, key })
    /**
     * 如果当前堆节点数量已经大于K
     * 我们可以直接将根节点推出
     * 保持小顶堆长度等于K
     * 最后无痛输出就行
     */
    if (res.size() > k) {
      res.shift()
    }
  })

  return res.heap.map((e) => e.key)
}

/**
 * ❗️❗️一个重点
 * 如果是自上往下，那么方向是左右子树中选一个
 * 如果是自下往上，那么方向只有一个，就是父节点
 */
class MinHeap {
  constructor() {
    this.heap = []
  }
  size() {
    return this.heap.length
  }
  insert(obj) {
    this.heap.push(obj)
    this.heapifyUp(this.heap.length - 1)
  }
  shift() {
    this.heap[0] = this.heap.pop()
    this.heapifyDown(0, this.heap.length)
  }
  swap(a, b) {
    const t = this.heap[a]
    this.heap[a] = this.heap[b]
    this.heap[b] = t
  }
  heapifyUp(currIndex) {
    if (!currIndex) return
    const parentIndex = Math.floor((currIndex - 1) / 2)
    if (this.heap[parentIndex].value > this.heap[currIndex].value) {
      this.swap(currIndex, parentIndex)
      // 一直向上检查交换
      this.heapifyUp(parentIndex)
    }
  }
  heapifyDown(index, len) {
    let leftIndex = index * 2 + 1
    let rightIndex = index * 2 + 2
    if (
      leftIndex < len &&
      this.heap[leftIndex].value < this.heap[index].value
    ) {
      this.swap(leftIndex, index)
      this.heapifyDown(leftIndex, len)
    }
    if (
      rightIndex < len &&
      this.heap[rightIndex].value < this.heap[index].value
    ) {
      this.swap(rightIndex, index)
      this.heapifyDown(rightIndex, len)
    }
  }
}
