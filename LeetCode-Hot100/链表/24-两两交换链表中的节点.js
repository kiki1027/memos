/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let dummyNode = new ListNode(0)
  dummyNode.next = head
  let temp = dummyNode

  while (temp.next && temp.next.next) {
    // null->1->2->3
    const p1 = temp.next // 1,2,3
    const p2 = temp.next.next // 2,3

    temp.next = p2 // null->2
    p1.next = p2.next // 1->3
    p2.next = p1 // 2->1

    // null->2->1->3

    temp = p1
  }

  return dummyNode.next
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 空链表或者只有一个节点直接返回
  if (!head || !head.next) return head

  const nextHead = head.next
  // head(1) -> head.next(2) -> nextHead.next(3)
  head.next = swapPairs(nextHead.next) // head(1) -> nextHead.next(3)
  nextHead.next = head // nextHead(2) -> head(1)
  // 新的头总是被交换到头部的节点
  return nextHead
}
