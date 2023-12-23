/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  // 边界情况
  if (n === 1) return ["()"]
  // 为了避免重复使用Set
  let ans = []

  /**
   * path: 路径
   * left: 左括号个数
   * right: 右括号个数
   */
  function choose(path, left, right) {
    // 递归终点，左右括号个数都满了
    if (left === n && right === n) {
      ans.push(path)
      return
    }

    // 左括号（当左括号个数还不足n个时可以继续插入）
    if (left < n) {
      choose(path + "(", left + 1, right)
    }
    // 右括号（当左括号个数满足条件，且右括号个数少于左括号个数时可以继续插入右括号）
    if (right < left && left <= n) {
      choose(path + ")", left, right + 1)
    }
  }

  choose("", 0, 0)

  return ans
}
