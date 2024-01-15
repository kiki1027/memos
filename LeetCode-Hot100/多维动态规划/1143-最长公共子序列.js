/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;
  let dp = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (text2[j] === text1[i]) {
        /**
         * 当前字符相等，则属于公共字符，那最长公共字符数就取决于
         * 以各自的后一位字符(i+1,j+1)为起始的字符串的最长公共字符 + 当前的1位字符
         */
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        /**
         * 当前字符不相等，则不属于公共字符，那最长公共字符数就取决于
         * 各自的后一位字符(i+1, j+1)为起始的字符串与另一字符串的最长公共字符中更大的那个
         * text1=a[c]e text2=a[b]ce
         * i=1 j=1
         * dp[1][1] => text1在i=1之后的字符串找 即 text1=e text2=bce, text2在j=1之后的字符串找 即 text1=ce text2=ce
         */
        dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][0];
};

console.log(longestCommonSubsequence("ace", "abce"));
