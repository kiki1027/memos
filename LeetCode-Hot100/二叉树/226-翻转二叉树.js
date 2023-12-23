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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  // 重复的子问题：中序遍历+翻转输出
  // 递归终点：节点为空（即没有再能往下遍历的节点了）
  if (!root) return root

  let left = invertTree(root.left)
  let right = invertTree(root.right)

  ;[root.left, root.right] = [right, left]

  return root
}

var invertTree = function (root) {
  if (!root) return root

  let queue = [root]

  while (queue.length) {
    let size = queue.length
    while (size--) {
      const cur = queue.shift()
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
      ;[cur.left, cur.right] = [cur.right, cur.left]
    }
  }

  return root
}
