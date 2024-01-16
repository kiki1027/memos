/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;

  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  for (let i = 0; i < m + 1; i++) {
    dp[i][n] = m - i;
  }

  for (let j = 0; j < n + 1; j++) {
    dp[m][j] = n - j;
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.min(
          dp[i + 1][j] + 1,
          dp[i][j + 1] + 1,
          dp[i + 1][j + 1] + 2
        );
      }
    }
  }

  return dp[0][0];
};

console.log(minDistance("leetcode", "etco"));
