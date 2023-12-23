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
var sortList = function (head) {
  return mergeSort(head)
}

function middleNode(head) {
  // 找分割中点：用快慢指针，快指针是慢指针的两倍，快指针到达末尾的时候，慢指针就是中点
  let fast = head
  let slow = head

  while (fast !== null && fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next
    slow = slow.next
  }

  return slow
}

function mergeList(p1, p2) {
  if (!p1) return p2
  if (!p2) return p1

  let root = new ListNode()
  let curr = root

  while (p1 && p2) {
    if (p1.val <= p2.val) {
      curr.next = p1
      p1 = p1.next
    } else {
      curr.next = p2
      p2 = p2.next
    }

    curr = curr.next
  }

  curr.next = p1 || p2

  return root.next
}

function mergeSort(head) {
  // 停止递归的条件：已经没有能分割的结点了
  if (!head || !head.next) {
    return head
  }

  // 将链表分割成左右两部分，依次排序后，再合并
  // 一直分割到不能再分割后，进行排序+合并
  // 分割方式：找到中间结点，以中间点截断链表，分成两部分
  let middle = middleNode(head)
  let left = head
  // 创建一个指向中点后一个结点的指针
  let temp = middle.next
  // 将链表原来的连接打断
  middle.next = null
  let right = temp

  // left：表示当前不可拆分的左链表头，right：同理，右链表头
  left = mergeSort(left) // 递归的特点：只有当执行遇到停止条件时，这里才会有返回值
  right = mergeSort(right)

  return mergeList(left, right)
}
