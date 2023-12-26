var MedianFinder = function () {
  this.heap = [];
  this.minHeap = [];
  this.maxHeap = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  // 原始
  this.heap.push(num);
  // 小顶堆
  this.minHeap.push(num);
  // 大顶堆
  this.maxHeap.push(num);
  // 小顶堆插入新元素
  this.minHeapifyUp(this.minHeap.length - 1);
  // 大顶堆插入新元素
  this.maxHeapifyUp(this.maxHeap.length - 1);
};
MedianFinder.prototype.swap = function (arr, a, b) {
  const t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
};
MedianFinder.prototype.minHeapifyUp = function (index) {
  if (index <= 0) return;
  const parentIndex = Math.floor(index / 2);
  if (this.minHeap[index] < this.minHeap[parentIndex]) {
    this.swap(this.minHeap, index, parentIndex);
    this.minHeapifyUp(parentIndex);
  }
};
MedianFinder.prototype.maxHeapifyUp = function (index) {
  if (index === 0) return;
  const parentIndex = Math.floor(index / 2);
  if (this.maxHeap[index] > this.maxHeap[parentIndex]) {
    this.swap(this.maxHeap, index, parentIndex);
    this.maxHeapifyUp(parentIndex);
  }
};

MedianFinder.prototype.heapifyDown = function (arr, index, len, comparator) {
  let leftIndex = index * 2 + 1;
  let rightIndex = index * 2 + 2;
  let parentIndex = index;
  if (leftIndex < len && comparator(arr[leftIndex], arr[parentIndex])) {
    parentIndex = leftIndex;
  }
  if (rightIndex < len && comparator(arr[rightIndex], arr[parentIndex])) {
    parentIndex = rightIndex;
  }
  if (parentIndex !== index) {
    this.swap(arr, parentIndex, index);
    this.heapifyDown(arr, parentIndex, len, comparator);
  }
};
MedianFinder.prototype.minHeapify = function (arr) {
  /**
   * a=子节点，b=父节点
   * 子节点>父节点，则正常，反之需要交换
   * 这里按照需要交换的条件写
   * 即需要交换返回1，不需要返回0
   */
  this.heapifyDown(arr, 0, arr.length, (a, b) => (a > b ? 0 : 1));
};
MedianFinder.prototype.maxHeapify = function (arr) {
  /**
   * a=子节点，b=父节点
   * 子节点>父节点，则需要交换
   */
  this.heapifyDown(arr, 0, arr.length, (a, b) => (a > b ? 1 : 0));
};
/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const len = this.heap.length % 2 ? 1 : 2;
  let count = this.heap.length - len;
  let minHeap = [...this.minHeap];
  let maxHeap = [...this.maxHeap];
  while (count > 0) {
    minHeap[0] = minHeap.pop();
    maxHeap[0] = maxHeap.pop();
    this.minHeapify(minHeap);
    this.maxHeapify(maxHeap);
    count -= 2;
  }
  /**
   * 利用 大顶堆 小顶堆，每次shift根节点，及重新堆化
   * 推出节点数量达到目标数量后，当前大小顶堆的根节点则是中间值
   */
  return (minHeap[0] + maxHeap[0]) / 2;
};
let a = new MedianFinder();
const arr = [6, 10, 2, 6, 5, 0, 6, 3, 1, 0];
arr.forEach((e) => {
  a.addNum(e);
});
console.log(a.findMedian());
