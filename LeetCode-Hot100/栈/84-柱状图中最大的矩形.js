/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let max = 0
  let stack = [] // pair: [left-cover-index, height]

  for (let i = 0; i < heights.length; i++) {
    const h = heights[i]
    let leftCoverIndex = i
    // 如果当前高度小于栈顶高度，则栈顶高度无法累加后续高度，将其出栈
    while (stack.length && h < stack[stack.length - 1][1]) {
      const [leftIndex, maxHeight] = stack.pop()
      // i - leftIndex 等于出栈高度到当前高度的间距 再乘以高度 则是其能覆盖的面积
      max = Math.max(max, (i - leftIndex) * maxHeight)
      /**
       * 出栈的柱子高度一定大于当前柱子高度，则当前柱子一定可以向前覆盖，
       * 我们记录下最前能覆盖到的下标
       */
      leftCoverIndex = leftIndex
    }
    /**
     * 因为只有当前高度小于之前的高度，才会执行出栈
     * 那么当前高度相应可以向前覆盖出栈个数的高度
     * 即当前高度最前可以覆盖到的下标为start
     */
    stack.push([leftCoverIndex, h])
  }

  /**
   * 如果栈内还有元素，则证明他们都是可以累加到最后的
   * 我们用同样的计算方式，将高度依次计算出来
   * 这里注意，因为都是可以累加到最后的，那么宽度则是最后一根柱子的右边界-最左柱子的左边界
   */
  while (stack.length) {
    const [leftIndex, height] = stack.pop()
    max = Math.max(max, (heights.length - leftIndex) * height)
  }

  return max
}

console.log(largestRectangleArea([3, 6, 5, 7, 4, 8, 1, 0]))
