/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let ans = new Array(nums.length).fill(1)

  // 左边乘积
  for (let i = 1; i < nums.length; i++) {
    ans[i] = ans[i - 1] * nums[i - 1]
  }

  // 右边乘积
  let temp = 1
  // 倒序 使得每一轮的乘积可以被保存下来 下一轮再利用
  for (let i = nums.length - 1; i > 0; i--) {
    // 右边乘积临时变量
    temp *= nums[i]
    // 当前轮的右边乘积 * 当前轮的左边乘积
    ans[i - 1] *= temp
  }

  return ans
}

productExceptSelf([1, 2, 3, 4])
