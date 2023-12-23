/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let fast = head
  let slow = head

  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) {
      // 1:2 快速查找 遇到交点 那第一个交点一定在这个点或这个点之前
      // 将 fast 重新返回起点变为匀速，以同样的步长再走一遍，遇到的交点就是第一个交点
      fast = head

      while (slow !== fast) {
        slow = slow.next
        fast = fast.next
      }

      return slow
    }
  }

  return null
}
