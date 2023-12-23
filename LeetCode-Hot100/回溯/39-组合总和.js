/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  if (!candidates.length) return []

  let ans = []
  // 排序，从小到大累加
  candidates.sort((a, b) => a - b)

  function choose(path, begin, target) {
    if (target === 0) {
      ans.push(path.slice())
      return
    }

    // 用循环跑遍每个元素（广度）
    for (let i = begin; i < candidates.length; i++) {
      if (target - candidates[i] < 0) {
        // 当前元素已经不够减了，直接跳出（升序，后面的数字更大更不满足结果）
        break
      }
      path.push(candidates[i])
      // console.log(("递归之前 => " + path + "，剩余 = " + (target - candidates[i])))
      // 用递归让每个元素所有情况跑到头（深度）
      choose(path, i, target - candidates[i])
      path.pop()
      // console.log("递归之后 => " + path)
    }
  }

  choose([], 0, target)
  return ans
}
