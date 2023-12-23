/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) return null
  let root = new TreeNode(postorder.pop())
  let leftCount = inorder.indexOf(root.val)

  inorder.splice(leftCount, 1)

  root.left = buildTree(
    inorder.splice(0, leftCount),
    postorder.splice(0, leftCount)
  )
  root.right = buildTree(inorder, postorder)

  return root
}
