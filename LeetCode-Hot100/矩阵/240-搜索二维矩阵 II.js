/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let r = 0
  let c = matrix[0].length - 1

  while (r < matrix.length && c >= 0) {
    if (matrix[r][c] < target) {
      r++
    } else if (matrix[r][c] > target) {
      c--
    } else return true
  }

  return false
}
