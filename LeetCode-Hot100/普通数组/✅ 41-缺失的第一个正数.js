/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let len = nums.length

  for (let i = 0; i < len; i++) {
    // 我们的目标是：只交换 0,len 范围内的数
    // 范围外的数与题目无关，我们不做多余处理
    // 触发交换的条件：当前数 不等于 当前下标+1 => 证明当前数不在它应该在的位置
    // 交换对象：如果是连续整数，下标i的位置应该放着值为i+1的数，
    // 因为现在不是，那么当前nums[i]的正确位置应该是下标为 nums[i]-1，即nums[i]和nums[nums[i]-1]交换
    // 注意：如果不满足条件 会一直进行交换
    while (nums[i] > 0 && nums[i] !== i + 1 && nums[i] <= len) {
      const rightPos = nums[i] - 1

      // 已经换到正确位置
      if (nums[rightPos] === nums[i]) break

      let temp = nums[rightPos]
      nums[rightPos] = nums[i]
      nums[i] = temp
    }
  }

  for (let i = 0; i < len; i++) {
    if (nums[i] !== i + 1) return i + 1
  }

  return len + 1
}

console.log(firstMissingPositive([-1, -2, 5, 7, 0, 3]))
