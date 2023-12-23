/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let fresh = 0
  let queue = []
  let height = grid.length
  let width = grid[0].length

  // 先把所有一开始腐烂的橘子收集，推入队列
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j])
      } else if (grid[i][j] === 1) {
        fresh++
      }
    }
  }

  // 队列中是待传染的橘子，依次出列
  if (fresh === 0) return 0

  let level = 0
  let dx = [0, 1, 0, -1]
  let dy = [1, 0, -1, 0]
  while (queue.length) {
    let size = queue.length
    level++
    while (size--) {
      const [i, j] = queue.shift()
      for (let n = 0; n < 4; n++) {
        const x = dx[n] + i
        const y = dy[n] + j
        if (x < 0 || y < 0 || x === height || y === width || grid[x][y] !== 1)
          continue
        grid[x][y] = 2
        queue.push([x, y])
        fresh--
      }
    }
  }

  if (fresh) return -1

  // 一共level层，需要level-1到达最后一层
  return level - 1
}
