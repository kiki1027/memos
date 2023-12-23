/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let res = []
  const board = new Array(n)
  for (let i = 0; i < n; i++) {
    board[i] = new Array(n).fill(".")
  }
  let cols = []
  let posDiag = []
  let negDiag = []

  function backtrack(r) {
    // 结束条件
    if (r === n) {
      res.push(board.map((row) => row.join("")))
      return
    }
    for (let c = 0; c < n; c++) {
      if (
        cols.includes(c) ||
        posDiag.includes(r + c) ||
        negDiag.includes(r - c)
      ) {
        continue
      }
      cols.push(c)
      posDiag.push(r + c)
      negDiag.push(r - c)
      board[r][c] = "Q"

      backtrack(r + 1)

      cols.pop()
      posDiag.pop()
      negDiag.pop()
      board[r][c] = "."
    }
  }

  backtrack(0)
  return res
}
