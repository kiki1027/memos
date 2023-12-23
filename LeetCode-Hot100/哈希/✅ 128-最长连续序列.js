/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  let max = 0
  let temp = 1
  nums.sort((a, b) => a - b)
  nums = new Set(nums)

  if (nums.length < 2) {
    return nums.length
  }

  for (const n of nums) {
    if (nums.has(n + 1)) {
      temp++
    } else {
      max = Math.max(max, temp)
      temp = 1
    }
  }

  return max
}

console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
console.log(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]))
