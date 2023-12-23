/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * recursion 递归
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return root
  return isSame(root.left, root.right)
}

function isSame(root1, root2) {
  if (!root1 || !root2) return root1 === root2

  // 两个节点值相等，且节点A左树等于节点B右树，节点A右树等于节点B左树
  return (
    root1.val === root2.val &&
    isSame(root1.left, root2.right) &&
    isSame(root1.right, root2.left)
  )
}

/**
 * BFS 从上往下 逐层比较
 * @param {TreeNode} root
 * @returns
 */
var isSymmetric = function (root) {
  if (!root) return true

  // 用于控制逐层遍历
  let queue = [root]

  while (queue.length) {
    let size = queue.length
    let nextLevelVal = []
    while (size--) {
      const cur = queue.shift()
      // 收集当前层所有子节点的值，用于比较是否对称
      nextLevelVal.push(cur.left ? cur.left.val : null)
      nextLevelVal.push(cur.right ? cur.right.val : null)
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }
    // 当前层节点均已出栈，当前栈内为下一层节点
    // 如果是对称的话，应该每一层都是对称的，用翻转字符串的方式进行判断是否对称
    const str = nextLevelVal.join(",")
    const str_reverse = nextLevelVal.reverse().join(",")
    if (str_reverse !== str) return false
  }

  return true
}
