/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  /**
   * s = "catsandog"
   * wordDict = ["cats", "dog", "sand", "and", "cat"]
   */
  let cache = new Array(s.length + 1).fill(false);
  // 最后一位默认true
  cache[s.length] = true;

  for (let i = s.length; i >= 0; i--) {
    for (const w of wordDict) {
      // 1. 当前下标(算一位)+当前单词字符长度<s的长度 【符合范围】
      // 2. 当前下标开始，含当前下标往后 w.length长度个字符 等于 w 【匹配成功】
      if (s.slice(i, i + w.length) === w) {
        // 比如i=4，w.length=4，dp[4]=dp[8] 只有后面的为true 这里才会也为true => 这样才能全都匹配到
        cache[i] = cache[i + w.length];
      }
      // 一旦出现可以匹配的就不用再找
      if (cache[i]) {
        break;
      }
    }
  }

  return cache[0];
};

wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);
