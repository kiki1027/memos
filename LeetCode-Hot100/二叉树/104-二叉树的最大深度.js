/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0

  let depth = 0
  // 每一层的遍历队列，默认是根节点那一层
  let queue = [root]

  while (queue.length) {
    // 当前层的节点数
    let num = queue.length
    // num = 当前层的节点数，只会循环num次，将这一层的节点全部操作完
    while (num--) {
      // 取出这一层的第一个节点
      const cur = queue.shift()
      // 这里后续的push都是下一层节点, num是遍历前获取的, 所以新插入节点并不会影响循环
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
    // 当前层操作完成，深度+1
    depth++
  }

  return depth
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0

  let left = maxDepth(root.left)
  let right = maxDepth(root.right)

  return 1 + Math.max(left, right)
}
