/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let ans = []
  let left = 0
  let right = 0
  let need = {} // 需要的字母数
  let win = {} // 当前窗口有的字母数
  let target = 0 // p中的不重复字母数量
  let cur = 0 // 当前窗口满足条件的字母数量

  for (const char of p) {
    if (need[char] === undefined) {
      target++
      need[char] = win[char] = 0
    }
    need[char]++
  }

  //   for (let i = 0; i < s.length; i++) {
  //     const char = s[i]
  //     const j = i - p.length

  //     if (char in need && ++win[char] === need[char]) {
  //       cur++
  //     }

  //     if (s[j] in need && win[s[j]]-- === need[s[j]]) {
  //       cur--
  //     }

  //     if (cur === target) {
  //       ans.push(j + 1)
  //     }
  //   }

  while (right < s.length) {
    let char = s[right]
    right++
    if (char in need) {
      win[char]++

      if (win[char] === need[char]) {
        cur++
      }
    }

    while (p.length <= right - left) {
      if (cur === target) {
        ans.push(left)
      }

      if (win[s[left]]-- === need[s[left]]) {
        cur--
      }
      left++
    }
  }

  console.log("ans: ", ans)
  return ans
}

findAnagrams("cbaebabacd", "abc")
