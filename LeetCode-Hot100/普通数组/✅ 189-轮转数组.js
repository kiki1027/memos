/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const n = nums.length
  const ans = new Array(n)

  for (let i = 0; i < n; i++) {
    ans[(i + k) % n] = nums[i]
  }

  for (let i = 0; i < n; i++) {
    nums[i] = ans[i]
  }
}

console.log(rotate([1, 2, 3], 2))
