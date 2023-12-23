// 前序遍历：根左右
/**
 * 迭代法
 * @param {TreeNode} root
 */
function preorderIterator(root) {
  let ans = []
  let stack = [] // First In Last Out
  let node = root // 当前节点

  while (node) {
    ans.push(node.val)
    if (node.right) {
      stack.push(node.right)
    }
    if (node.left) {
      stack.push(node.left)
    }
    node = stack.pop()
  }

  return ans
}

/**
 * 递归法
 * @param {TreeNode} root
 */
function perorderRecursion(root) {
  // 结束递归的条件
  if (!root) {
    return []
  }

  // [1].concat([], []) ===> [1]
  return [root.val].concat(
    perorderRecursion(root.left),
    perorderRecursion(root.right)
  )
}

// 中序遍历：左根右
/**
 * 迭代法
 * @param {TreeNode} root
 */
function inorderIterator(root) {
  let ans = []
  // 根节点先入栈
  let stack = [] // First In Last Out
  let node = root // 当前节点

  // 如果栈内有节点或者存在当前节点
  while (stack.length || node) {
    while (node) {
      // all left-child nodes are pushed into stack
      stack.push(node)
      node = node.left
    }
    // 出栈
    node = stack.pop()
    ans.push(node.val)
    // 遍历右树，若不存在右节点，则上面👆🏻while不会走，再继续出栈
    node = node.right
  }

  return ans
}

/**
 * 递归法
 * @param {TreeNode} root
 */
function inorderRecursion(root) {
  let ans = []

  const inorder = (root) => {
    if (!root) return
    // 如果当前root存在root.left就会一直执行，这里的作用是沿着root.left一直向下遍历
    inorder(root.left)
    // 当前root不存在root.left则会执行到这句
    ans.push(root.val)
    inorder(root.right)
  }

  inorder(root)

  return ans
}

// 后序遍历：左右根
const postorder = (root) => {
  if (!root) return []

  let ans = []
  let stack = [root]
  let curr = null

  //   1
  //  / \
  // 2   3
  while (stack.length) {
    curr = stack.pop()
    ans.unshift(curr.val)
    if (curr.left) stack.push(curr.left)
    if (curr.right) stack.push(curr.right)
  }
}
