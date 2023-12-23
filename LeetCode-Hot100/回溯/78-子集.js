/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let ans = []

  /**
   * path: 已遍历路径
   * index: 下一个遍历位置
   */
  function choose(path, index, nums) {
    if (index === nums.length) {
      // 全部遍历完了
      ans.push(path.slice())
      return
    }

    // 选
    choose(path.concat(nums[index]), index + 1, nums)
    // 每次选完之后会退回到选之前的位置，进行不选操作
    // 不选
    choose(path, index + 1, nums)
  }

  choose([], 0, nums)

  return ans
}
