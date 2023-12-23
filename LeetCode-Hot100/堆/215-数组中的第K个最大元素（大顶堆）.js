/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  /**
   * 借用大顶堆，我们来实现一下
   * 大顶堆数据结构的特点，父节点一定大于等于它的子节点
   * 这样就很符合我们找第K大的过程
   * 每次确定一个最大的父节点之后，将其排除
   * 剩余的子节点们用同样的方法找下一个最大节点
   * 这样子找到第K次就是我们要的
   */
  class MaxHeap {
    constructor() {
      this.heap = []
    }
    /**
     * 1️⃣ 第一步看这里❗️❗️
     * 我们构造类的目的是为了让整个过程可以更加的直观
     * 看懂每一步都在做什么
     *
     * 首先，大顶堆长什么样子，他其实就是个数组，但是按照树节点的顺序
     * 从上往下从左往右将节点值存到了数组中
     * 那么最基本的增删改查，我们这个类至少有一个insert方法
     */
    insert(val) {
      // 每次向数组末尾追加
      this.heap.push(val)
      /**
       * 追加之后要更新二叉树的结构，我们把这个更新动作取名叫heapifyUp
       * 为什么是up呢，因为当我们拥有了一堆数字，我们要构造一颗符合大顶堆要求（节点的值一定大于等于子节点的值）
       * 一定是从下往上构造的，得先将更小些的树构造完成后才能构造大的
       */
      this.heapifyUp()
    }
    /**
     * 2️⃣ 第二步看这里❗️❗️
     * 那么这个方法是我们每追加一个新元素后，做重排处理的
     * 1. 是否需要重排
     * 2. 怎么排
     */
    heapifyUp() {
      // 当前用于比较的基准index初始为末尾下标（末尾元素是新插入元素）
      let currIndex = this.heap.length - 1
      /**
       * 问题1： 因为我们是大顶堆，那么如果当前元素大于它的父节点，这就是不合法的
       * 问题2：将当前元素和小于它的父节点交换，因为我们将父子进行了交换
       * 就可能会引发，原来的父是某个人的子，我们的交换导致现在的父不满足原来做某人的子的条件
       * 所以我们需要一直向上查找，不符合条件的都需要交换
       */
      let parentIndex = this.getParentIndex(currIndex)
      while (
        parentIndex >= 0 &&
        this.heap[parentIndex] < this.heap[currIndex]
      ) {
        // 上述条件：存在父节点&&当子节点大于父节点，操作：交换这两个节点
        this.swap(parentIndex, currIndex)
        // 更新用于比较的index
        currIndex = parentIndex
        // 更新parentIndex
        parentIndex = this.getParentIndex(currIndex)
      }
      // 到这里就完成了构成大顶堆的过程，接下来我们看第三步，剥离最大节点，将剩下节点重新调整成新的大顶堆
    }
    /**
     * 找到某个节点的父节点下标
     * @param {number} index
     */
    getParentIndex(childIndex) {
      // 1. 至少有两个结点才存在父节点 2. childIndex 不是根节点
      if (this.heap.length < 2 || this.childIndex === 0) return null
      /**
       * 可以画个图自己推导出来
       * 假设两个例子(奇数/偶数)：1. [4,6,8,5,9]   2. [4,6,8,5,7,9,10]
       * 1. childIndex = 3，parentIndex = 1
       * 2. childIndex = 4，parentIndex = 1
       * 3. childIndex = 5，parentIndex = 2
       * 4. childIndex = 6，parentIndex = 2
       * 推导出 ===> parentIndex = Math.floor((childIndex - 1)/2)
       */
      return Math.floor((childIndex - 1) / 2)
    }
    /**
     * 用于交换节点
     * @param {number} i 交换节点a下标
     * @param {number} j 交换节点b下标
     */
    swap(i, j) {
      const t = this.heap[i]
      this.heap[i] = this.heap[j]
      this.heap[j] = t
    }
    /**
     * 当前最大的节点在根节点，即下标0
     * @returns number
     */
    getMax() {
      return this.heap[0]
    }
    /**
     * 用于找下一个最大节点
     * 「剥离最大的节点 + 重排大顶堆」
     */
    getNextMax() {
      /**
       * 因为剥离根节点后，我们需要重新定一个根节点
       * 我们将剩余节点中的末尾节点取出作为新的根节点
       * 这里pop了一下，长度-1，等于剥离了一个节点的动作
       */
      const last = this.heap.pop()
      // 将末尾节点放到根节点处
      this.heap[0] = last
      /**
       * 新的堆节点值已经替换完毕，现在我们需要重新排序
       * 重新排序的目的是，依旧得到一个标准的大顶堆
       * 即每个节点都大于等于其左右子节点
       * 在之前插入的时候，因为我们是从0到1构建树的过程
       * 所以是自底向上的，现在我们有了整棵树的节点
       * 可以自顶向下调整树的节点，对应的我们给该方法取名heapifyDown
       */
      this.heapifyDown(0)
      return this.heap[0]
    }
    /**
     * 和heapifyUp类似，我们比较当前节点与其左右子节点的大小
     * 不合法的就将其更换，然后再往下检查直到叶子节点
     */
    heapifyDown(currIndex = 0, len = this.heap.length) {
      /**
       * 可以画个图自己推导出来
       * 假设： [4,6,8,5,7,9,10]
       * 1. leftIndex = 1，rightIndex = 2，curr(parent)Index = 0
       * 2. leftIndex = 3，rightIndex = 4，curr(parent)Index = 1
       * 3. leftIndex = 5，rightIndex = 6，curr(parent)Index = 2
       */
      let leftIndex = currIndex * 2 + 1
      let rightIndex = currIndex * 2 + 2
      /**
       * 正常情况 应该是当前节点是较大的那个
       * 若出现左右子节点大于当前节点，则需要交换
       */
      let largestIndex = currIndex
      // leftIndex要在合法范围内
      if (leftIndex < len && this.heap[leftIndex] > this.heap[largestIndex]) {
        largestIndex = leftIndex
      }
      // rightIndex要在合法范围内
      if (rightIndex < len && this.heap[rightIndex] > this.heap[largestIndex]) {
        largestIndex = rightIndex
      }
      // 需要交换节点
      if (largestIndex !== currIndex) {
        this.swap(largestIndex, currIndex)
        /**
         * 交换后currIndex已经被放置了较大的数值
         * 我们再继续重排被交换的节点largestIndex
         */
        this.heapifyDown(largestIndex)
      }
    }
  }

  /**
   * 第一步：构建基础大顶堆
   */
  let heap = new MaxHeap()
  for (const n of nums) {
    heap.insert(n)
  }

  // K=1，默认是当前大顶堆最大的节点
  let res = heap.getMax()
  /**
   * 若 K>1 则用剥离重排法，K起步是1 ==> i=1
   * 第二步：「剥离最大的节点 + 重排大顶堆」K次
   */
  for (let i = 1; i < k; i++) {
    res = heap.getNextMax()
  }

  return res
}

// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest2 = function (nums, k) {
  class MaxHeap {
    constructor() {
      this.heap = []
    }
    /**
     * ❗️❗️先看这里，第一步理解「堆化」操作
     * 堆化：遵循大顶堆的结构特征，当前节点一定大于等于它的左右子节点
     * 我们通过从上往下依次检查是否合法，不合法的需要交换最大值和节点位置
     * 直到检查到叶子节点为止，算整个堆化完毕
     * 注意：堆化是用来解决就近三个节点的位置问题的，
     * 他们的子树一定是已经有序的情况的
     *
     * 这就导致了，当树的节点个数为3时，堆化结果一定是正确的
     * 那如果超过了最小树的节点数，我们就需要将堆化的过程按照
     * 由少至多 => 自底向上+自右往左 的顺序，这样才能让整颗大树的堆化结果符合条件
     */
    heapify(currIndex, len) {
      /**
       * 可以画个图自己推导出来
       * 假设： [4,6,8,5,7,9,10]
       * 1. leftIndex = 1，rightIndex = 2，curr(parent)Index = 0
       * 2. leftIndex = 3，rightIndex = 4，curr(parent)Index = 1
       * 3. leftIndex = 5，rightIndex = 6，curr(parent)Index = 2
       */
      let leftIndex = 2 * currIndex + 1
      let rightIndex = 2 * currIndex + 2
      // 正常情况应该是当前节点大于左右子节点的
      let largestIndex = currIndex
      /**
       * 接下来我们挨个比较当前节点和左右子节点的大小
       * 将更大的赋值给largestIndex
       * 最后我们交换currIndex和largestIndex实现最大值在当前节点
       *
       * 注意：左右子节点必须在合法范围内
       */
      if (leftIndex < len && this.heap[leftIndex] > this.heap[largestIndex]) {
        largestIndex = leftIndex
      }
      if (rightIndex < len && this.heap[rightIndex] > this.heap[largestIndex]) {
        largestIndex = rightIndex
      }
      // 如果最大值不在当前节点，则需要交换节点
      if (currIndex !== largestIndex) {
        ;[this.heap[currIndex], this.heap[largestIndex]] = [
          this.heap[largestIndex],
          this.heap[currIndex],
        ]
        /**
         * 此刻，我们已经整理好了当前小子树三个节点的位置
         * 基于当前左子节点的左右子树原来是有序的，当前右子节点的左右子树也是有序的
         * 我们现在需要继续调整的则是刚刚被我们交换过的
         * 那个子节点(可能是左子节点也可能是右子节点)及它下面的子节点们
         * 即下一个堆化操作的范围是以【下标为largestIndex的节点】作为父节点的二叉树
         */
        this.heapify(largestIndex, len)
      }
      // 以上就是完整的堆化过程
    }

    /**
     * ❗️❗️第二步看这里，如何构建一个大顶堆
     * 基于上面「堆化」的理解，构建大顶堆就是
     * 自底向上自右往左依次堆化后，形成的一颗二叉树
     */
    build(nums) {
      /**
       * 首先找到 以「非叶子节点」为根节点的子树 们的规律
       * 我们需要通过例子，将符合要求的节点下标都列出来
       * 然后找规律
       * 1. [1,2,3,4,5,6] 「非叶子节点」有3,2,1
       * index=2,1,0 len=6 index呈递减  6/2-1
       * 2. [1,2,3,4,5,6,7,8]「非叶子节点」有4,3,2,1
       * index=3,2,1,0 len=8 index呈递减 8/2-1
       * 可推导出 ===> parentIndex = Math.floor(len/2)-1
       */
      this.heap = nums
      for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
        this.heapify(i, nums.length)
      }
      /**
       * 建堆的过程就是，从最后一颗树整理到最前一颗树
       * 对应到二叉树上的顺序就是
       * 从后往前遍历每个可到达的以「非叶子节」点为根的子树
       * 对每个子树做堆化操作
       * 最终堆化到最大的这颗子树(根节点)后，就是我们要的大顶堆了
       */
    }
  }

  // 初始化
  const maxHeap = new MaxHeap()
  // 构建大顶堆(建堆)
  maxHeap.build(nums)
  /**
   * 因为我们目标是找第K大的，每一次大顶堆的根节点一定是当前数组中最大的
   * 那我们就用「剥离最大的节点 + 重排大顶堆」的方式找到第K大的
   * 核心：剥离最大节点，将剩下节点重新调整成新的大顶堆
   */
  let size = nums.length
  for (let i = 0; i < k - 1; i++) {
    // 将原先的最大节点即根节点和末尾节点交换
    ;[maxHeap.heap[0], maxHeap.heap[size - 1]] = [
      maxHeap.heap[size - 1],
      maxHeap.heap[0],
    ]
    // 再继续将前size-1个进行堆化
    maxHeap.heapify(0, --size)
  }
  return maxHeap.heap[0]
}

console.log(findKthLargest2([3, 2, 1, 5, 6, 4], 2))

/**
 * 内容参考：https://aijishu.com/a/1060000000090217
 * 简化版
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let size = nums.length

  function heapify(arr, index, len) {
    let largest = index
    let leftIndex = index * 2 + 1
    let rightIndex = index * 2 + 2

    if (leftIndex < len && arr[leftIndex] > arr[largest]) {
      largest = leftIndex
    }
    if (rightIndex < len && arr[rightIndex] > arr[largest]) {
      largest = rightIndex
    }

    if (index !== largest) {
      ;[arr[index], arr[largest]] = [arr[largest], arr[index]]

      heapify(arr, largest, len)
    }
  }

  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(nums, i, size)
  }

  for (let i = 0; i < k; i++) {
    ;[nums[0], nums[size - 1]] = [nums[size - 1], nums[0]]
    heapify(nums, 0, --size)
  }

  return nums[nums.length - k]
}
