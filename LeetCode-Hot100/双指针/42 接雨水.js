/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let max = 0
  let volume = 0
  let [leftMax, rightMax] = [[], []]

  for (let i = 0; i < height.length; i++) {
    max = Math.max(height[i], max)
    leftMax[i] = Math.max(height[i], max)
  }

  max = 0

  for (let i = height.length - 1; i >= 0; i--) {
    max = Math.max(height[i], max)
    rightMax[i] = Math.max(height[i], max)
  }

  for (let i = 0; i < height.length; i++) {
    volume += Math.min(leftMax[i], rightMax[i]) - height[i]
  }

  return volume
}

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let volume = 0
  let [left, right] = [0, height.length - 1]
  let [leftMax, rightMax] = [0, 0]

  while (left < right) {
    // leftMax是从左往右已遍历柱子中最大的
    // rightMax是从右往左已遍历柱子中最大的

    // A. 对于left来说，
    // 1. 新的leftMax是left及其左侧中最大的，它对应的rightMax我们假设叫做rMax
    // 2. rMax一定大于等于当前height[right]的rightMax
    leftMax = Math.max(leftMax, height[left])
    // B. 对于right来说，
    // 1. 新的rightMax是right及其右侧中最大，它对应的leftMax我们假设叫做lMax
    // 2. lMax一定大于等于当前height[left]的leftMax
    rightMax = Math.max(rightMax, height[right])
    // 一个柱子的容积 = 它左侧的最大值和右侧的最大值中更小的值 - 它自身的高度
    // v(i) = Math.min(leftMax, rightMax) - height[i]
    // 👆🏻上面的 leftMax,rightMax 指的是单独某个柱子(i)所对应的
    // 当我们将i换成会滑动的left和right时，
    // 对于left来说，它的rightMax一定大于等于
    // 于是对照上述的结论A-2，rMax一定大于等于当前height[right]的rightMax
    // 因为一根柱子的容积是由左右两侧柱子最大值中的更小值决定的，
    // 那我们可以直接用height[right]的rightMax代替rMax进行比较即可
    // 同理，结论B-2，lMax一定大于等于当前height[left]的leftMax
    // 可以直接用height[left]的leftMax和rightMax进行比较

    // left的leftMax和right的rightMax比较
    if (leftMax < rightMax) {
      volume += leftMax - height[left++]
    } else {
      volume += rightMax - height[right--]
    }
  }

  return volume
}
