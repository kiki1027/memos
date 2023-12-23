/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let height = board.length
  let width = board[0].length
  let ans = false

  function find(row, col, count) {
    if (count === word.length) {
      ans = true
      return
    }
    // 超出边界
    if (
      0 > row ||
      row === height ||
      0 > col ||
      col === width ||
      !board[row][col]
    ) {
      return
    }
    /**
     * 如果当前字符满足要查找的字符，我们将其四个方向上的字符再进行下一步查找，
     * 为了防止当前字符的相邻字符又重新走回当前字符，导致混淆判断，
     * 所以我们将当前字符加上标记，证明它已经访问过
     */
    if (board[row][col] === word[count]) {
      count++
      const memo = board[row][col]
      // 走过的路标记一下，以免后续元素重复走
      board[row][col] = 0

      find(row - 1, col, count)
      find(row + 1, col, count)
      find(row, col - 1, count)
      find(row, col + 1, count)

      // 走到头了再重置回来，不影响后续逻辑
      board[row][col] = memo
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      /**
       * 判断ans: 避免多余的查找
       * 每次开启一轮查找的一定是先找到与word首字母匹配的字符
       */
      if (board[i][j] === word[0] && !ans) {
        find(i, j, 0)
      }
    }
  }

  return ans
}
