/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  if (!s) return []
  let ans = []

  function dfs(path, start) {
    if (start === s.length) {
      // 这里要摆脱path引用，复制一份推入结果集
      ans.push(path.slice())
      return
    }

    // a[ab], aa[b], aab
    for (let i = start; i < s.length; i++) {
      // 当前字符串str截取从start开始含start 前i个
      if (!validatePalindrome(s, start, i)) {
        continue
      }
      path.push(s.slice(start, i + 1))
      // 剩余字符串继续往下截取，start更新
      dfs(path, i + 1)
      // 当前分支走完，依次出栈
      path.pop()
    }
  }

  dfs([], 0)

  return ans
}

function validatePalindrome(str, start, end) {
  while (start < end) {
    if (str[start] !== str[end]) {
      return false
    }
    start++
    end--
  }

  return true
}
