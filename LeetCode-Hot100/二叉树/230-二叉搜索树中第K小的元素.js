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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  if (!root) return null
  let stack = []
  let node = root
  // 先用中序遍历到最底层，然后计数k个
  while (node || stack.length) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    // 此时node是最左侧叶子结点
    node = stack.pop()
    if (--k === 0) {
      return node.val
    }
    node = node.right
  }
}
