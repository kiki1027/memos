/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let ans = []
  let visited = {}
  const len = nums.length

  function dfs(path) {
    if (path.length === len) {
      // 当前path已经是全量了，可以加入结果集
      ans.push(path.slice())
      return
    }
    for (const num of nums) {
      // 如果是已经是当前path访问过的元素，直接跳过
      if (visited[num]) continue
      // 加入当前path
      path.push(num)
      // 标记当前元素已被访问
      visited[num] = true
      // 基于当前的path再枚举
      dfs(path)
      // 当前path的所有选择都做完了，撤销当前的选择
      path.pop()
      visited[num] = false
    }
  }

  dfs([])
  return ans
}
