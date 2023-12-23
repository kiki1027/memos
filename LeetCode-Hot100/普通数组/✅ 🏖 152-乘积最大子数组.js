/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let ans = nums[0]
  let min = nums[0]
  let max = nums[0]
  let tempMin = 0
  let tempMax = 0

  for (let i = 1; i < nums.length; i++) {
    tempMin = min * nums[i]
    tempMax = max * nums[i]
    min = Math.min(nums[i], tempMin, tempMax)
    max = Math.max(nums[i], tempMin, tempMax)
    ans = Math.max(ans, max)
  }

  return ans
}
