/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  /**
   * 假设n为10，借助计算目标和为1-9的最小平方和，
   * 得出10的最小平方和
   *
   * 为什么？因为 题目特性是「某几个数的平方之和」
   * 那么就有 10的最小平方和 = 9的最小平方和 + 1的平方
   * 或 10的最小平方和 = 6的最小平方和 + 2的平方
   * 或 10的最小平方和 = 1的最小平方和 + 3的平方
   *
   * 再有 9的最小平方和 = 8的最小平方和 + 1的平方
   * 9的最小平方和 = 5的最小平方和 + 2的平方
   * ...
   *
   * 某个数的最小平方和 可以依赖【比它小某个平方数】的值的最小平方和
   * 那么如果我们求和为12的最小平方和 就可以开辟一个数组
   * 长度为12+1=13，每个格子代表着一个和（0-12）
   * 每个格子的值存放当前和的最小平方和
   * list[0] = 0 表示 当和为0时，最小平方和个数为0
   *
   * 核心：遍历格子 + 递增平方和 + 某个和 - 某个平方和 = 某个之前的和
   */
  if (Number.isInteger(Math.sqrt(n))) return 1;

  // 初始化：无穷大
  let list = new Array(n + 1).fill(+Infinity);
  list[0] = 0;

  // 遍历目标和
  for (let target = 1; target <= n; target++) {
    // target为当前目标和
    // 从1开始一直递增平方，最小个数赋值
    for (let j = 1; j <= target; j++) {
      const square = j * j;
      if (target - square < 0) {
        // 超出范围
        break;
      }
      // 目标和target的最小平方和为 min(list[target], 当前算1个+目标和为<target-当前的>最小平方和)
      list[target] = Math.min(list[target], 1 + list[target - square]);
    }
  }

  return list[n];
};
