/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  let ans = []

  if (!digits) return ans

  const dict = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  }

  function choose(path, numIndex) {
    if (path.length === digits.length) {
      ans.push(path)
      return
    }

    const chars = dict[digits[numIndex]]
    for (const c of chars) {
      choose(path + c, numIndex + 1)
    }
  }

  choose([], 0)

  return ans
}
