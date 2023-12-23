/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let ans = 0
  //   let map = new Map()
  //   let pre = 0

  //   map.set(0, 1)

  //   for (const v of nums) {
  //     pre += v
  //     if (map.has(pre - k)) {
  //       ans += map.get(pre - k)
  //     }
  //     if (map.has(pre)) {
  //       map.set(pre, map.get(pre) + 1)
  //     } else {
  //       map.set(pre, 1)
  //     }
  //   }

  for (let i = 0; i < nums.length; i++) {
    let sum = 0
    for (let j = i; j >= 0; j--) {
      sum += nums[j]
      if (sum === k) {
        ans++
      }
    }
  }

  return ans
}

subarraySum([1, 2, 1, 2, 1], 3)
subarraySum([1, 2, 3], 3)
subarraySum([1, 1, 1], 2)
subarraySum([-1, -1, 1], 0)
