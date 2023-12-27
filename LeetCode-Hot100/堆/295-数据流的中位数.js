var MedianFinder = function () {
  /**
   * 维护两个堆，small、large
   * small存放较小的数字，大顶堆 => 根节点则是较小的数字里最大的一个
   * large存放较大的数字，小顶堆 => 根节点则是较大的数字里最小的一个
   */
  this.small = [];
  this.large = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  /**
   * 默认我们把新数字插入到small中
   * 如果奇数个
   * 中间值就是大顶堆的根节点
   * 如果偶数个
   * 中间值就是(小值但大顶堆的根节点+大值但小顶堆的根节点)/2
   */
  this.small.push(num);
  // 大顶堆 插入新数字
  this.heapifyUp(this.small, this.small.length - 1, (a, b) => a > b);
  /**
   * small中的值要比large中的值都小
   * 若出现不满足条件的，则将该值推入large中
   * 对应的两个堆都需要重新堆化一下
   */
  if (this.small[0] > this.large[0]) {
    this.large.push(this.small[0]);
    /**
     * 新增元素，从下到上堆化
     * 小顶堆 parent<child
     */
    this.heapifyUp(this.large, this.large.length - 1, (a, b) => a < b);
    this.small[0] = this.small.pop();
    /**
     * 删除元素，从上到下堆化
     * 大顶堆 parent>child
     */
    this.heapifyDown(this.small, 0, this.small.length, (a, b) => a > b);
  }
  // 新数字入堆之后，检查small和large是否平衡
  const smallLen = this.small.length;
  const largeLen = this.large.length;
  if (smallLen > largeLen + 1) {
    this.large.push(this.small[0]);
    /**
     * 新增元素，从下到上堆化
     * 小顶堆 parent<child
     */
    this.heapifyUp(this.large, this.large.length - 1, (a, b) => a < b);
    this.small[0] = this.small.pop();
    /**
     * 删除元素，从上到下堆化
     * 大顶堆 parent>child
     */
    this.heapifyDown(this.small, 0, this.small.length, (a, b) => a > b);
  }
  if (largeLen > smallLen + 1) {
    this.small.push(this.large[0]);
    /**
     * 新增元素，从下到上堆化
     * 大顶堆 parent>child
     */
    this.heapifyUp(this.small, this.small.length - 1, (a, b) => a > b);
    this.large[0] = this.large.pop();
    /**
     * 删除元素，从上到下堆化
     * 小顶堆 parent<child
     */
    this.heapifyDown(this.large, 0, this.large.length, (a, b) => a < b);
  }
};
MedianFinder.prototype.swap = function (arr, a, b) {
  const t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
};
MedianFinder.prototype.heapifyUp = function (arr, index, comparator) {
  if (index === 0) return;
  /**
   * child=1,2,parent=0
   * child=3,4,parent=1
   * child=5,6,parent=2
   */
  let parentIndex = Math.floor((index - 1) / 2);
  if (!comparator(arr[parentIndex], arr[index])) {
    this.swap(arr, parentIndex, index);
    this.heapifyUp(arr, parentIndex, comparator);
  }
};
MedianFinder.prototype.heapifyDown = function (arr, index, len, comparator) {
  let leftIndex = index * 2 + 1;
  let rightIndex = index * 2 + 2;
  let findIndex = index;

  if (leftIndex < len && !comparator(arr[findIndex], arr[leftIndex])) {
    findIndex = leftIndex;
  }
  if (rightIndex < len && !comparator(arr[findIndex], arr[rightIndex])) {
    findIndex = rightIndex;
  }
  if (findIndex !== index) {
    this.swap(arr, findIndex, index);
    this.heapifyDown(arr, findIndex, len, comparator);
  }
};
/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.small.length > this.large.length) {
    return this.small[0];
  }
  if (this.large.length > this.small.length) {
    return this.large[0];
  }
  return (this.small[0] + this.large[0]) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

const obj = new MedianFinder();
// [26],[],[6],[],[8],[],[2],[],[14],[],[25],[],[25],[],[4],[],[33],[],[18],[],[10],[],[14],[],[27],[],[3],[],[35],[],[13],[],[24],[],[27],[],[14],[],[5],[],[0],[],[38],[],[19],[],[25],[],[11],[],[14],[],[31],[],[30],[],[11],[],[31],[],[0],[]]
obj.addNum(40);
// console.log(obj.findMedian());
obj.addNum(12);
// console.log(obj.findMedian());
obj.addNum(16);
// console.log(obj.findMedian());
obj.addNum(14);
// console.log(obj.findMedian());
obj.addNum(35);
// console.log(obj.findMedian());
obj.addNum(19);
// console.log(obj.findMedian());
obj.addNum(34);
// console.log(obj.findMedian());
obj.addNum(35);
// console.log(obj.findMedian());
obj.addNum(28);
console.log(obj.findMedian());
obj.addNum(35);
console.log(obj.findMedian());
obj.addNum(26);
console.log(obj.findMedian());
obj.addNum(6);
console.log(obj.findMedian());
obj.addNum(8);
console.log(obj.findMedian());
obj.addNum(2);
console.log(obj.findMedian());
