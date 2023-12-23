/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let rows = grid.length
  let cols = grid[0].length
  let count = 0

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        // 当前块是岛屿，将其上下左右变成0，这样就不用重复计算岛屿数量了
        makeZero(grid, i, j)
        count++
      }
    }
  }

  return count
}

const makeZero = (grid, row, col) => {
  // 这个函数的作用是，将一个块四周相邻的为1的块都设置为0
  // 注意：如果相邻的1还有相邻的我们就继续设置下去，知道附近已没有1
  // 终止条件：1. row，col超出合法范围 2. 当前块不是1
  if (
    row < 0 ||
    row >= grid.length ||
    col < 0 ||
    col >= grid[0].length ||
    grid[row][col] !== "1"
  )
    return

  grid[row][col] = 0

  // 左
  makeZero(grid, row, col - 1)
  // 右
  makeZero(grid, row, col + 1)
  // 上
  makeZero(grid, row - 1, col)
  // 下
  makeZero(grid, row + 1, col)
}
