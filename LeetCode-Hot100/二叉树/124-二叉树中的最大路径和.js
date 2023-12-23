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
var maxPathSum = function (root) {
  if (!root) return 0
  let payload = { max: -Infinity }

  const rootMaxPathSum = nodeMaxPathSum(root, payload)

  return Math.max(rootMaxPathSum, payload.max)
}

const nodeMaxPathSum = (root, payload) => {
  if (!root) return 0

  let left = nodeMaxPathSum(root.left, payload)
  let right = nodeMaxPathSum(root.right, payload)

  // 全局的max，不受单边的限制，因为我们需要的是任意路径最大的那个，那么左右子树任一边路径和若小于0，我们可以直接舍弃
  payload.max = Math.max(
    payload.max,
    root.val + Math.max(left, 0) + Math.max(right, 0)
  )
  // 单个节点的最大路径因为还要回溯给父节点使用，所以只能选择其中更大的一边
  return root.val + Math.max(left, right, 0)
}
