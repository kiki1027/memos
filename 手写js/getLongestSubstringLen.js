// 求字符串最长不重复子串长度
// 比如："abcbacbb" 最长不重复子串长度为3
// "bbbbbb" 最长不重复子串长度为1
function getLongestSubstringLen(str) {
  if (!str) {
    console.log('str is undefined')
    return
  }

  const _str = str.toString()
  let result = 0
  let substring = ''

  for (let i = 0; i < _str.length; i++) {
    // 不重复
    if (!substring.includes(_str[i])) {
      substring += _str[i]
    } else {
      // 重复
      // 若当前阶段substring比之前阶段匹配到的长
      // 则先将之前的substring存下来
      if (substring.length > result) {
        result = substring.length
      }
      // 重置substring为当前字符
      substring = _str[i]
    }
  }

  substring = null

  return result
}

console.log(getLongestSubstringLen('ababcdecde'))
console.log(getLongestSubstringLen(23456100304030500300))
