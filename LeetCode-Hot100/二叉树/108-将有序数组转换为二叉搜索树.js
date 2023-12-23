/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function buildBST(nums, start, end) {
    if (start > end) return null

    let center = Math.floor((start + end) / 2)
    let root = new TreeNode(nums[center])
    root.left = buildBST(nums, start, center - 1)
    root.right = buildBST(nums, center + 1, end)

    return root
  }

  return buildBST(nums, 0, nums.length - 1)
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  let size = nums.length
  if (!size) return null

  let center = parseInt(size / 2)

  return new TreeNode(
    nums[center],
    sortedArrayToBST(nums.slice(0, center)),
    sortedArrayToBST(nums.slice(center + 1))
  )
}
