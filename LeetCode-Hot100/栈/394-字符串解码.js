/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let stack = []

  for (const c of s) {
    if (c !== "]") {
      stack.push(c)
    } else {
      let text = ""
      while (stack.slice(-1)[0] !== "[") {
        text = stack.pop() + text
      }
      stack.pop() // pop [
      let times = ""
      while (!isNaN(stack.slice(-1)[0])) {
        times = stack.pop() + times
      }
      while (times--) {
        stack.push(text)
      }
    }
  }

  return stack.join("")
}
