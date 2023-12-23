/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 找最近公共祖先
  // 终止条件: 越过叶子节点了 or 当前节点是p或q（这里因为我们求的是祖先，所以从上往下只要匹配到了就不用再往下搜索了）
  if (!root) return null
  if (root.val === q.val || root.val === p.val) return root

  // 函数有返回值的话相当于找到了p或者q
  // 在左子树里找p和q
  let left = lowestCommonAncestor(root.left, p, q)
  // 在右子树里找p和q
  let right = lowestCommonAncestor(root.right, p, q)
  // 都没找到，返回null
  if (!left && !right) return null
  // 右子树中不存在p和q，那么p和q都在左子树中，先找到的节点就是祖先
  if (left && !right) return left
  // 左子树中不存在p和q，那么p和q都在右子树中，先找到的节点就是祖先
  if (!left && right) return right

  // p和q分别在左右子树中，公共祖先即根节点
  return root
}
