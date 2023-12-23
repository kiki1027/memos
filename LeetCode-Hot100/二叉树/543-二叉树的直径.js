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
var diameterOfBinaryTree = function (root) {
  // 当前节点的最长路径 = 当前节点左树能达到的最长深度 + 当前节点右树能达到的最长深度
  // 重复的子问题：找最长深度
  let max = 0

  // getMaxDepth函数作用：得到某个节点的最大深度
  // 这个函数通过**自底向上**累加深度得到**单边**的最大值，再将左树右树最大值进行比较

  // 自底向上的意思：执行过程会一直向下找，直到找到最后一层叶子节点后返回 `1+Math.max(0,0)` 给它的上一层
  // 上一层得到结果之后再计算它的结果 `1+Math.max(1,xx)`，再返回上一层... 一直返回到进入的第一层为止，得到最后的累加结果

  // 因为我们的最长路径可以是某个节点的任何路径，左右两边的深度之和一定**大于等于**单边的深度，这才是我们需要的最长路径
  // 所以我们需要在其内部去判断我们的主逻辑，出了函数之后 只能得到深度更大的某一边
  function getMaxDepth(root) {
    if (!root) return 0

    let left = getMaxDepth(root.left)
    let right = getMaxDepth(root.right)

    // 处理主要逻辑
    let curNodeMaxLength = left + right
    max = Math.max(curNodeMaxLength, max)

    // 返回深度（注意：递归的特点，这个返回只会在上面👆🏻left,right有值后才会走到这一步，这也就是如何从最后一层一直向上逐层累加的。
    // 从最后一层开始left,right有值后，逐层向上返回，每一层left,right更新后，再向上返回）
    return 1 + Math.max(left, right)
  }

  getMaxDepth(root)

  return max
}

// 关键：当前节点的最长路径 = 当前节点左树能达到的最长深度 + 当前节点右树能达到的最长深度

// 重复的子问题：找某个节点的最大深度

// 思路

// 创建找某个节点的最大深度的函数getMaxDepth
// getMaxDepth函数通过自底向上累加深度得到单边的最大值，再将左树右树最大值进行比较，取最大值
// 因为我们的最长路径可以是某个节点的任何路径，而左右两边的深度之和一定大于等于单边的深度，这就是我们需要的最长路径
// 按照第3点，我们的主逻辑就需要写在getMaxDepth函数内部，当我们得到左边深度和右边深度后，将二者相加做处理
// Q&A

// 自底向上的意思就是函数会一直向下执行，直到到达最后一层后，会按照向下的路径原路返回到最上一层进入的位置，而返回的内容由我们写在函数内部的逻辑决定
