/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const size = temperatures.length
  const stack = []
  const res = new Array(size).fill(0)

  /**
   * 维护一个递减下标栈，当出现比站内数字大的数字，
   * 则依次比较栈内已有的数字，将小于当前的数字都出栈，
   * 因为我们存入的是下标，所以得到出栈的下标可以对应设置res的值
   * res[x] = 当前数字的下标 - 出栈下标
   * 最后将当前下标入栈
   */
  for (let i = 0; i < size; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const index = stack.pop()
      res[index] = i - index
    }
    stack.push(i)
  }

  return res
}

console.log(dailyTemperatures([89, 62, 70, 58, 47, 47, 46, 76, 100, 70]))
