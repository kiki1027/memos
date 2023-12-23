/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let l = 0
  let r = nums.length - 1

  // 二分查找：关键点在于，每次变化左右区间找到中间值比较
  while (l <= r) {
    let mid = Math.floor((l + r) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }

  return l
}
