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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (!root) return root

  flatten(root.left)
  flatten(root.right)

  let left = root.left
  let right = root.right

  root.left = null
  root.right = left

  // 如果左子树存在，则需要进行连接节点
  // 1. 原左子树连接到root.right
  // 2. 原右子树连接到最新的右子树的最后一个节点.right上(原左子树最右的节点)
  while (root.right) {
    root = root.right
  }
  root.right = right

  return root
}

var flatten = function (root) {
  if (!root) return

  let cur = root

  while (cur !== null) {
    // 当前节点存在左子节点，我们需要将左子树作为当前节点的新右子树上，
    // 且将原来的右子树追加为原来左子树中最右的子节点的右子树
    while (cur.left !== null) {
      // 暂存原来的右子树
      let right = cur.right
      // 原左子树中最右的子节点，初始化为左子树第一个节点
      let leftTail = cur.left
      // 将原来的左子树作为现在新的右子树
      cur.right = cur.left

      // 如果还存在右节点，则继续向下找
      while (leftTail.right) {
        leftTail = leftTail.right
      }

      // 原左子树中最右的叶子节点与原右子树连接
      leftTail.right = right
      // 当前节点的左子树置空
      cur.left = null
    }
    // 当前节点已完成左子树转入右子树的操作，将cur向后移一个（左子树：空，右子树：新树）
    cur = cur.right
  }
}
