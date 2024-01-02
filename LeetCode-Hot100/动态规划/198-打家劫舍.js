/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  /**
   * [1,2,3,1] 假设有4个数字，求最大值就是
   * 第4位数 要与不要两种结果
   * 1. 要 => 前1,2位数的最大值+第4位数
   * 2. 不要 => 前3位数的最大值
   *
   * 即 每一位数的要与不要 结合前面位数的最大值 可以得出这一位的最大值
   */
  // 当要取当前位时：前面隔一位的最大值
  let gapMax = 0;
  // 当不取当前位时：前置位最大值
  let preMax = 0;

  for (const n of nums) {
    /**
     * 要当前位时，累计到当前位的最大值为：n+gapMax
     * 不要当前位时，累计到当前位的最大值为：preMax
     * curMax为累计到当前位的最大值
     */
    let curMax = Math.max(n + gapMax, preMax);
    // 下一个隔一位最大值 即当前位之前位的最大值 即preMax
    gapMax = preMax;
    // 下一个前置位最大值 即累计到当前位的最大值 即curMax
    preMax = curMax;
  }

  return preMax;
};

console.log(rob([2, 1, 1, 2]));
