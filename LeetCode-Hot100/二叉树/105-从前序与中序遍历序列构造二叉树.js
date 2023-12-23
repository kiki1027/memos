/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null

  // 先序遍历可得到第一个节点是根节点
  const root = new TreeNode(preorder.shift())
  // 中序遍历可通过根节点将一颗树分为左右子树
  const mid = inorder.indexOf(root.val)
  inorder.splice(mid, 1)
  const leftInorder = inorder.splice(0, mid)
  const leftPreorder = preorder.splice(0, mid)

  let left = buildTree(leftPreorder, leftInorder)
  let right = buildTree(preorder, inorder)

  root.left = left
  root.right = right

  return root
}
