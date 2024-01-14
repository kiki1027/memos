/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s || s.length < 2) return s;
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    /**
     * 如果回文字符串为racecar这种格式 奇数 回文中心点为e
     * 即中心点初始right=left
     */
    let len1 = expandFromMiddle(s, i, i);
    /**
     * 如果回文字符串为abba这种格式 偶数 回文中心点为bb
     * 即中心点初始right=left+1
     */
    let len2 = expandFromMiddle(s, i, i + 1);

    /**
     * 当前得出的最长回文串长度是以i为中心的回文字符串
     * i=3 len=3 start=2 end=4 ---> start=3-(3-1)/2 end=3+3/2
     * i=3 len=4 start=2 end=5 ---> start=3-(4-1)/2 end=3+4/2
     */
    let len = Math.max(len1, len2);
    if (len > end - start + 1) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  /**
   * 复杂度分析
   * space complexity -> 未用到任何复杂类型 O(1)
   * time complexity -> 首先基础遍历 O(n) * 每个遍历内有两个非嵌套循环 O(2n) 忽略系数 -> O(n*n)
   */
  return s.slice(start, end + 1);
};

/**
 * 以某个字符串为中心，判断两侧是否符合回文字符串条件
 * @param {string} s
 * @param {number} left
 * @param {number} right
 * @returns 返回最长回文字符串长度
 */
function expandFromMiddle(s, left, right) {
  if (!s || left > right) return 0;

  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  /**
   * left多减了1 ---> 长度多增了一位
   * right多加了1 ---> 长度多增了一位
   * 原长度计算公式为：len = right - left + 1
   * 这里对应去除多增的位数 len = right - left + 1 - 2 = right - left - 1
   */
  return right - left - 1;
}
