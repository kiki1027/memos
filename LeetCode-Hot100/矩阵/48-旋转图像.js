/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate2 = function (matrix) {
  let r = 0
  let c = 0
  let n = matrix.length
  let dir = n > 1 ? "r" : "d"
  let borderu = 0
  let borderd = n - 1
  let borderl = 0
  let borderr = n - 1
  let i = 0
  let j = n - 1
  let ans = Array.from({ length: n }).map(() =>
    Array.from({ length: n }).fill(undefined)
  )

  for (let m = 0; m < n * n; m++) {
    const item = matrix[r][c]
    console.log({ i, j })
    ans[i][j] = item
    // console.log({ item, r, c, dir })

    if (dir === "r") {
      c++
      i++
      if (c === borderr) {
        borderu++
        dir = "d"
      }
    } else if (dir === "d") {
      r++
      j--
      if (r === borderd) {
        borderr--
        dir = "l"
      }
    } else if (dir === "l") {
      c--
      i--
      if (c === borderl) {
        borderd--
        dir = "u"
      }
    } else if (dir === "u") {
      r--
      j++
      if (r === borderu) {
        borderl++
        dir = "r"
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = ans[i][j]
    }
  }
}

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      // matrix[j][n-i-1] -> matrix[n-i-1][n-j-1] -> matrix[n-j-1][i] -> matrix[i][j]
      // 先将 matrix[i][j] 保存起来，则当前这个位置可以进行被覆盖的操作
      let tmp = matrix[i][j]
      matrix[i][j] = matrix[n - j - 1][i]
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]
      matrix[j][n - i - 1] = tmp
    }
  }
  console.log("matrix: ", matrix)
}

rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])
