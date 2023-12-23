/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 定义两个指针
  let p1 = head
  let p2 = head
  // 💡 为什么需要两个指针？因为题目是倒数**第n个**，定义两个差距为n的指针
  // 💡 如何让两个指针有差距？就是一个指针先走，一个指针后走
  // 当走的更远的指针到达**末尾**后，那么另一个与它差距为n的指针就是**被删除的结点**

  for (let i = 0; i < n; i++) {
    if (p2.next) {
      p2 = p2.next
    } else {
      // 如果在**先走**的期间，指针已经到达末尾，说明链表结点数和n相等，被删除结点是第一个结点，那么直接返回head.next就行
      return head.next
    }
  }

  // 按照题意我们的任务是删除节点，即我们需要被删除节点的前驱和后继来完成这个操作，
  // 所以我们其实不关心被删除节点。那按照上述注释，我们两个指针同时开始遍历后，
  // 慢走的指针就是被删除节点，现在我们需要获取他的前驱节点，那么相当于慢指针要比原来少走一步，
  // 慢指针走的步数是依赖快指针的，显然我们就需要让快指针多走一步，它早一步到达尾部，就等于慢指针少走一步
  p2 = p2.next

  while (p2) {
    p1 = p1.next
    p2 = p2.next
  }

  p1.next = p1.next.next

  return head
}
