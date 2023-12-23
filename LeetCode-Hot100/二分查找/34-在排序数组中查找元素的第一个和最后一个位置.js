/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  let start = -1
  let end = -1

  while (left <= right) {
    let mid = Math.floor((right + left) / 2)
    if (nums[mid] === target) {
      let l = 0
      let r = 0
      while (nums[mid + l] === target) {
        start = mid + l--
      }
      while (nums[mid + r] === target) {
        end = mid + r++
      }
      break
    } else if (target < nums[mid]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return [start, end]
}
