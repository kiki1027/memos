/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let grow = 0
  let head = new ListNode()
  let curr = head

  while (l1 !== null || l2 !== null || grow) {
    const n1 = l1 !== null ? l1.val : 0
    const n2 = l2 !== null ? l2.val : 0
    let n = n1 + n2 + grow
    grow = n >= 10 ? 1 : 0
    curr.next = new ListNode(n % 10)
    curr = curr.next

    if (l1 !== null) l1 = l1.next
    if (l2 !== null) l2 = l2.next
  }

  return head.next
}
