/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let m = word1.length;
  let n = word2.length;
  /**
   * m+1为行
   * n+1为列
   */
  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  /**
   * 初始化 base case
   * word2为空字符时，word1的操作数(删除)和word1位数有关
   */
  for (let i = m; i >= 0; i--) {
    dp[i][n] = m - i;
  }

  /**
   * 初始化 base case
   * word1为空字符时，word1的操作数(新增)和word2位数有关
   */
  for (let j = n; j >= 0; j--) {
    dp[m][j] = n - j;
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      /**
       * 当前字符相等，则表示这一位不需要任何操作，
       * 操作数等于各自向后一位(i+1,j+1)的操作数
       */
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i + 1][j + 1];
      } else {
        /**
         * 当前字符不相等，则表示这一位需要做删除/新增/替换操作
         * 注意，我们做操作的字符串是word1，即下标i所指的字符串
         * 当前位的总操作数 = 过去的总操作数 + 当前位操作数1
         * 在过去的操作数中选择更小的那个操作数
         * 1. 如果当前位i做删除操作，j不变，i+1
         * 过去的总操作数 = dp[i+1][j]
         * 2. 如果当前位i做新增操作，i不变，j+1
         * 过去的总操作数 = dp[i][j+1]
         * 3. 如果当前位i做替换操作，i+1，j+1
         * 过去的总操作数 = dp[i+1][j+1]
         */
        dp[i][j] = Math.min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1]) + 1;
      }
    }
  }

  return dp[0][0];
};

console.log(minDistance("abd", "acd"));
