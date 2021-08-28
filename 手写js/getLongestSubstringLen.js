// 求字符串最长不重复子串长度
// 比如："abcbacbb" 最长不重复子串长度为3
// "bbbbbb" 最长不重复子串长度为1

function getLongestSubstringLen(str) {
  let result = 0
  let substring = ''
  const _str = str && str.toString()
  const length = _str.length || 0
  for (let i = 0; i < length; i++) {
    if (!substring.includes(_str[i])) {
      substring += _str[i]
    } else {
      substring = _str[i]
    }
    if (result < substring.length) {
      result = substring.length
    }
  }
  return result
}

console.log(getLongestSubstringLen('ababcdecde'))
