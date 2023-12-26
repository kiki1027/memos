/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let res = 0;
  /**
   * 双指针，当左指针<右指针表示是可行的买点
   * 固定买点指针，向后推卖点指针，依次存入最大差价
   *
   * 若左指针>右指针，证明当前不是可行的买点
   * 买点指针向后推，卖点指针则同步更新为它的下一天
   */
  let inDay = 0;
  let outDay = inDay + 1;
  while (inDay < outDay && outDay < prices.length) {
    if (prices[inDay] < prices[outDay]) {
      res = Math.max(prices[outDay++] - prices[inDay], res);
    } else {
      inDay++;
      outDay = inDay + 1;
    }
  }
  return res;
};
