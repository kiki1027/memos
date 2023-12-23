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
var inorderTraversal = function (root) {
  let stack = []
  let ans = []
  let cur = root

  // 中序遍历
  while (cur) {
    stack.push(cur)
    ans.push(cur)
    while (cur.left) {
      cur = cur.left
      ans.push(cur)
      stack.push(cur)
    }
    cur = stack.pop()
    cur = cur.right
  }

  return ans
}
