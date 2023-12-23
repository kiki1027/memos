/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let map = {
    "}": "{",
    ")": "(",
    "]": "[",
  }
  let stack = []

  for (const c of s) {
    if (c in map) {
      if (stack.length && stack[stack.length - 1] === map[c]) {
        stack.pop()
        continue
      } else {
        return false
      }
    }
    stack.push(c)
  }

  return stack.length === 0
}
