/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (!head) {
    return head
  }

  // 翻转链表头
  let pHead = null
  let count = 0
  // 翻转后的终点
  let prevEnd = null
  // 快指针：每组尾结点
  let end = head
  // 慢指针：每组头结点
  let start = head

  while (end) {
    // 每轮走k步
    for (let i = 0; i < k; i++) {
      if (end) {
        end = end.next
        count++
      }
    }

    // 若走满k步，则开始交换，当前组起始结点为curr，终点为fast
    if (count % k === 0) {
      // temp 暂存每组的起点（原方向）
      let temp = start
      // reverseHead 翻转后的起点（原方向的终点）
      const reverseHead = reverseList(start, end)

      if (count === k) {
        pHead = reverseHead
      }
      // 下一组的起点重置到end
      start = end

      // 将上一次翻转后的终点指向当前组翻转后的起点(原方向的终点)
      if (prevEnd) {
        prevEnd.next = reverseHead
      }

      // 存储这次翻转后的终点（本组原方向起点）
      prevEnd = temp
    }
  }

  if (count % k) {
    // 有剩余结点 start为剩余结点的第一个结点
    prevEnd.next = start
  }

  return pHead
}

// 翻转链表
function reverseList(head, tail) {
  let prev = null
  let curr = head

  while (curr && curr !== tail) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }

  return prev
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  let dummyNode = new ListNode()
  dummyNode.next = head
  let prev = dummyNode
  let cur = head

  while (cur) {
    let end = prev
    // dummyNode/prev -> head -> head.next
    for (let i = 0; i < k; i++) {
      if (end.next) {
        end = end.next
      } else {
        // 不够k步，直接返回
        return dummyNode.next
      }
    }

    const next = end.next
    const [head, tail] = reverseList(cur, end)
    prev.next = head
    tail.next = next
    prev = tail
    cur = next
  }

  return dummyNode.next
}

function reverseList(head, tail) {
  let prev = null
  let cur = head

  while (prev !== tail) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
}
