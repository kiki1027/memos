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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  // map保存了走过的节点的(前缀和, 对应次数)
  let map = new Map()
  // 初态，对于根节点来说，走过的节点前缀和为0，次数1
  // 初态的作用是，当树的节点数量为1时，我们的逻辑也能顺利执行
  map.set(0, 1)
  return counter(root, 0, map, targetSum)
}

const counter = (root, sum, map, target) => {
  if (!root) return 0
  let count = 0
  // 当前前缀和
  sum += root.val

  // 如果之前出现过值为 当前前缀和-target 的前缀和A，则表示 当前前缀和-前缀和A=target 是成立的，而某两个前缀和相减得到的是某个路径上的节点值之和
  // 相当于路径上的节点值之和等于target出现的次数，正是题目要的次数，把它累加到count上
  // 因为我们用获取sum-target出现次数的方式等价于之前出现过的路径之和为target的次数，这里就有一个注意点，任何单独一个节点也可以是一条路径，那么单个值为target的节点对应的就是map.get(target - target)===map.get(0)
  // 所以我们需要初始化map=new Map(0,1)，这样单个节点满足条件的次数就不会算漏
  if (map.get(sum - target)) {
    count += map.get(sum - target)
  }

  // 将前缀和及次数更新到map中
  map.set(sum, (map.get(sum) || 0) + 1)

  // 同样的步骤，将左子树和右子树都走一遍
  count += counter(root.left, sum, map, target)
  count += counter(root.right, sum, map, target)
  // 递归，什么时候会执行到这里呢？
  // 当遍历到最后一个节点（没有left,right了）就会执行到这里
  // 每次从一个节点往回走时，需要将这个节点的前缀和次数-1，因为往回走了，这个前缀和已经被利用完毕
  map.set(sum, map.get(sum) - 1)

  return count
}
