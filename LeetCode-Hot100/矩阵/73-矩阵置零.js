/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  let rows = matrix.length
  let cols = matrix[0].length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 0) {
        markZero(matrix, i, j)
      }
    }
  }

  updateZero(matrix)
}

function markZero(matrix, row, col) {
  let rows = matrix.length
  let cols = matrix[0].length

  for (let i = 0; i < rows; i++) {
    matrix[i][col] = matrix[i][col] === 0 ? 0 : "zero"
  }

  for (let j = 0; j < cols; j++) {
    matrix[row][j] = matrix[row][j] === 0 ? 0 : "zero"
  }
}

function updateZero(matrix) {
  let rows = matrix.length
  let cols = matrix[0].length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "zero") {
        matrix[i][j] = 0
      }
    }
  }
}

setZeroes([
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
  [1, 0, 1, 0],
])
