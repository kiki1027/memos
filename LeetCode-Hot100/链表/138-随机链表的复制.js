/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (head === null) return head

  // 原链表 be like：1->2->3->4
  // 普通遍历是向后一个结点，这里自增步数为2，是因为每次loop会插入一个新结点(拷贝结点)，所以要向后多走一步
  // 更新后链表 be like：1->cp1->2->cp2->3->cp3->4->cp4
  for (let node = head; node !== null; node = node.next.next) {
    // 原来的下一个结点
    const next = node.next
    // 待插入的新结点
    const cpNode = new Node(node.val, next)
    // 插入新结点（将当前原结点连接上拷贝结点）
    node.next = cpNode
    // 注意：为什么这里没有复制random呢，因为新结点的random结点还没有被创建，
    // 所以只能先将拷贝结点全部创建完毕，然后再去设置random
  }

  // 这次遍历已经创建完所有拷贝结点了，我们再做一次遍历，将random设置到对应的拷贝结点上
  for (let node = head; node !== null; node = node.next.next) {
    // 将第一次遍历插入的拷贝结点的random指向**原结点random**的下一个结点，
    // 即**原结点random**对应的拷贝结点，这样拷贝结点的random指向的结点也是拷贝结点（符合题意）
    node.next.random = node.random !== null ? node.random.next : null
  }

  // 上两个遍历已经完成了所有拷贝结点及其random的设置，现在我们做最后一步，
  // 就是将拷贝结点与原结点拆分，输出最终的拷贝结点链表
  // 新建一个新的链表头，用来指向拷贝链表，表头为第一个拷贝结点
  let headNew = head.next

  // 拆分链表的方法，就是改变结点next指向，即打断结点的连接状态
  // 这里每轮loop后，node向后移动一位（node = node.next）以继续下一个结点，
  // 每一轮会改变当前原结点和拷贝结点的next指向，当前原结点指向下一个原结点，当前拷贝结点指向下一个拷贝结点
  for (let node = head; node !== null; node = node.next) {
    const cpNode = node.next // 当前结点的拷贝结点
    node.next = node.next.next // 当前原结点->下一个原结点
    // cpNode.next 为下一个原结点结点
    cpNode.next = cpNode.next !== null ? cpNode.next.next : null // 当前结点的拷贝结点->下一个原结点的拷贝结点
  }

  return headNew
}
