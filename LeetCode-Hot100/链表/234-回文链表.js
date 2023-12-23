/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (head === null) return true
  const firstHalf = endOfHalf(head)
  const secondHalf = reverseList(firstHalf.next)

  let res = true
  let p1 = head
  let p2 = secondHalf
  while (res && p2) {
    if (p1.val !== p2.val) res = false
    p1 = p1.next
    p2 = p2.next
  }

  firstHalf.next = reverseList(secondHalf)

  return res
}

function endOfHalf(head) {
  let fast = head
  let slow = head

  while (fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next
    slow = slow.next
  }

  return slow
}

function reverseList(head) {
  let prev = null
  let curr = head

  while (curr && prev !== curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }

  return prev
}
