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
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 节点的左子树只包含 小于 当前节点的数。
  // 节点的右子树只包含 大于 当前节点的数。
  // 由于上述要求，必须自底向上判断
  // 因为 all左子树节点 < 根节点 < all右子树节点，这一特性刚好符合中序遍历的顺序
  // 中序遍历：左根右，每个子树的根都应该小于上一级的根

  let stack = []
  let node = root
  let inorder = -Infinity

  while (stack.length || node) {
    while (node) {
      // 含根节点及所有左侧节点入栈
      stack.push(node)
      node = node.left
    }
    // 根节点+左子树 均遍历完毕，此时 node 不存在，我们需要从栈顶取出一个节点
    node = stack.pop()
    if (node.val <= inorder) {
      return false
    }
    inorder = node.val
    // 继续遍历下一个 (下一个节点应该是最后一个左子节点的右节点)
    node = node.right
  }

  return true
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 每次函数调用会传入新的上限，下限
  function validBST(root, lower, upper) {
    // 已没有剩余可遍历节点，返回true
    if (!root) return true

    // 符合要求，继续检查左右子树
    if (root.val < upper && root.val > lower) {
      // 左子树上限为根节点
      let isLeftValid = validBST(root.left, lower, root.val)
      // 右子树下限为根节点
      let isRightValid = validBST(root.right, root.val, upper)

      return isLeftValid && isRightValid
    }

    return false
  }

  return validBST(root, -Infinity, +Infinity)
}
