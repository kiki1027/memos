/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  // 存放每个位置最长有效括号数
  let dp = new Array(s.length).fill(0);

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ")") {
      /**
       * 当字符是右括号，有三种情况
       * 1. 前一位是左括号
       * 2. 前一位不是左括号，但有有效长度
       * 3. 非前两种
       *
       * 前两种属于有效情况，还需要判断与之相连的前面是否存在有效的长度
       * 存在的话需要累加
       */
      if (s[i - 1] === "(") {
        /**
         * matching case1
         * 前一位是匹配的左括号
         * 当前有效最大长度还需要检查上一个右括号位置(i-2)是否存在有效长度
         */
        dp[i] = dp[i - 2] > 0 ? dp[i - 2] + 2 : 2;
      } else if (dp[i - 1] > 0) {
        /**
         * matching case2
         * 前一位是有效长度，我们需要倒退相应的长度
         * 看是否存在前一个有效括号
         */
        if (s[i - dp[i - 1] - 1] === "(") {
          dp[i] = 2 + dp[i - 1];
          /**
           * 与最近的一个未匹配左括号匹配成功
           * 最近的未匹配左括号的前一个右括号(xxx-2)是否存在有效长度
           */
          if (i - dp[i - 1] - 2 > 0) {
            dp[i] += dp[i - dp[i - 1] - 2];
          }
        }
      }
    }
  }

  return Math.max(...dp, 0);
};

// console.log(longestValidParentheses(")()())"));
// console.log(longestValidParentheses("()(()"));
// console.log(longestValidParentheses("(()"));
// console.log(longestValidParentheses("()()"));
console.log(longestValidParentheses("()(())"));
