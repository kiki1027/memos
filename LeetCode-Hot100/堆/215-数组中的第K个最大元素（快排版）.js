/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  /**
   * 第K大的数字等同于升序之后，下标为 length-k 的数字
   * [1,2,3,4,5] 第2大的数字是 nums[5-2]=>nums[3]=>4
   */
  const index = nums.length - k

  function quickSelect(l, r) {
    // 找到这一轮的基准
    let pivot = nums[r]
    /**
     * 遍历除基准外的所有数字，小于等于基准的都放到左侧
     * 我们定义一个指针p，用于标记小于等于基准的数字下标
     */
    let p = l
    for (let i = l; i < r; i++) {
      // 小于等于基准的都放到左侧
      if (nums[i] <= pivot) {
        swap(nums, i, p)
        // 因为我们成功交换了一个较小的值到p位置，要给p位置+1，用于下次的交换
        p++
      }
    }
    // 最后我们将基准(也就是r位置的数字)挪到p的位置，这样就形成了基准在中间的分隔形式
    swap(nums, r, p)
    /**
     * 此时我们这一轮的排序已经结束，[<基准的，基准，>基准的]
     * 来判断一下，当前基准位置和目标index的关系
     * 以此决定下一轮排序的范围
     */
    if (p === index) {
      // case3: 当前基准下标 === 目标下标，则当前基准位置即我们的目标下标
      return nums[p]
    }
    if (p < index) {
      // case1: 当前基准下标 < 目标下标，则目标还在基准的右侧(更新下一个范围 l=p+1)
      return quickSelect(p + 1, r)
    } else if (p > index) {
      // case2: 当前基准下标 > 目标下标，则目标还在基准的左侧(更新下一个范围 r=p-1)
      return quickSelect(l, p - 1)
    }
  }

  return quickSelect(0, nums.length - 1)
}

function swap(arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))
