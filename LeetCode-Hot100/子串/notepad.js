/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let ans = ""
  let need = {}
  let target = 0

  for (const char of t) {
    if (need[char] === undefined) {
      need[char] = 0
    }
    need[char]++
  }
  target = Object.keys(need).length

  for (let i = 0; i < s.length; i++) {
    let val = 0
    let win = {}
    let temp = ""
    let j = i

    while (j < s.length && val !== target) {
      win[s[j]] = (win[s[j]] || 0) + 1
      if (s[j] in need && need[s[j]] === win[s[j]]) {
        val++
      }
      temp += s[j]
      j++
    }

    if (val === target && (!ans.length || ans.length > temp.length)) {
      ans = temp
    }
  }

  return ans
}

console.log(minWindow("aa", "aa"))

/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
 */
