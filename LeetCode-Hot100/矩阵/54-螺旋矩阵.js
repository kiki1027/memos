/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let rows = matrix.length
  let cols = matrix[0].length

  if (!rows) return []

  let direction = cols > 1 ? "right" : "down"
  let ans = []
  let i = 0
  let j = 0
  let borderR = cols - 1
  let borderD = rows - 1
  let borderL = 0
  let borderU = 0

  for (let n = 0; n < rows * cols; n++) {
    ans.push(matrix[i][j])
    console.log({ n, i, j })

    if (direction === "right") {
      j++
      if (j === borderR) {
        borderU++
        direction = "down"
      }
    } else if (direction === "down") {
      i++
      if (i === borderD) {
        borderR--
        direction = "left"
      }
    } else if (direction === "left") {
      j--
      if (j === borderL) {
        borderD--
        direction = "up"
      }
    } else if (direction === "up") {
      i--
      if (i === borderU) {
        borderL++
        direction = "right"
      }
    }
  }

  console.log("ans: ", ans)
  return ans
}

spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
])
