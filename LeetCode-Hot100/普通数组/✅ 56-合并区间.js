/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  let pre = intervals[0]
  let ans = []

  for (let i = 0; i < intervals.length; i++) {
    const cur = intervals[i]
    if (cur[0] <= pre[1]) {
      // 重叠了
      pre[1] = Math.max(pre[1], cur[1])
    } else {
      // 未重叠，有效区间
      ans.push(pre)
      // 检查下一位
      pre = cur
    }
  }

  // 最后一位补上
  ans.push(pre)
  return ans
}
