/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let width = matrix[0].length
  let height = matrix.length

  // 一维数组的左右指针
  let left = 0
  let right = width * height - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    // 一维数组下标转二维下标
    // 二维y等于第几行，一行为width个数字，第mid个就是在mid整除单行的个数
    // 二维x等于第几列，上面的y就等于已经有了(y-1)*width个数字，x等于整除后还不够的个数，即取模求余
    let curr = matrix[Math.floor(mid / width)][mid % width]
    if (target === curr) {
      return true
    } else if (target < curr) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return false
}
