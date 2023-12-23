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
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return []
  // 层序遍历，每一层的最后一个
  let queue = [root]
  let ans = []

  while (queue.length) {
    let size = queue.length
    let node = null
    while (size--) {
      node = queue.shift()
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    // 退出循环后的node就是每层的最后一个节点
    ans.push(node.val)
  }

  return ans
}
