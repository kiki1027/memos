/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  /**
   * sum 物品重量总和
   * bagVol 背包容量 = sum的二分之一
   * goodsNum 物品个数
   * dp 背包记录表 纵轴物品重量nums[0]-nums[nums.length-1] 横轴背包容量0-bagVol
   *
   * !!重点：
   * 本题转换成背包问题就是在求，
   * 能否有装包方式使得可装载最大价值等于 物品重量总和的二分之一，
   * 即 ?? dp[i][j] === bagVol
   */
  const sum = nums.reduce((res, v) => res + v);
  /**
   * 边界情况：
   * 如果总和是奇数那么不可能存在等分
   */
  if (sum % 2) {
    return false;
  }
  const bagVol = sum / 2;
  const goodsNum = nums.length;
  let dp = new Array(goodsNum);

  for (let i = 0; i < goodsNum; i++) {
    /**
     * 初始化1 每一行都是数组
     */
    dp[i] = new Array(bagVol + 1).fill(0);
    for (let j = 0; j <= bagVol; j++) {
      /**
       * 初始化2 第一个物品在大于它自身重量的背包重量j情况下
       * 可装载的最大价值为第一个物品的价值
       */
      if (i === 0) {
        dp[i][j] = j > nums[i] ? 0 : nums[i];
      } else {
        // 当前背包装不下物品，那么当前dp[i][j]=上一个物品装同等背包重量的最大价值
        if (j < nums[i]) {
          dp[i][j] = dp[i - 1][j];
        } else {
          /**
           * 当前背包能装得下物品 我们就要选择装或不装
           * 不装，最大价值=第i-1件物品在同等背包重量j的情况下可装载的最大值
           * 装，最大价值=第i-1件物品在剩余的重量(背包重量-当前物品重量)下可装载的最大价值+当前物品价值
           */
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - nums[i]] + nums[i]);
        }
      }

      /**
       * 如果存在可装载最大价值等于我们的目标值 bagVol
       * 则证明存在装包方式可以让价值等于目标
       */
      if (dp[i][j] === bagVol) {
        return true;
      }
    }
  }

  return false;
};

canPartition([1, 5, 11, 5]);
