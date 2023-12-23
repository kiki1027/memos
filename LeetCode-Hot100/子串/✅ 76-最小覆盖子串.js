/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = {}
  let win = {}
  let target = 0
  let val = 0
  let l = 0
  let r = 0
  let minL = 0
  let minR = -1

  for (const char of t) {
    if (need[char] === undefined) {
      need[char] = 0
    }
    need[char]++
  }
  target = Object.keys(need).length

  if (t.length > s.length) return ""

  while (r < s.length) {
    const c = s[r]
    win[c] = (win[c] || 0) + 1

    if (c in need && need[c] === win[c]) {
      val++
    }

    while (val === target) {
      if (minR === -1 || minR - minL > r - l) {
        minL = l
        minR = r
      }

      win[s[l]]--

      // ✅ 如果 s[l] 在 win 中的数量小于 need 中的, 证明已经不满足字母出现总和了，需要对应减少
      if (s[l] in need && win[s[l]] < need[s[l]]) {
        val--
      }

      l++
    }

    r++
  }

  return minR >= 0 ? s.substring(minL, minR + 1) : ""
}

console.log(minWindow("bba", "ba"))

/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
 */
