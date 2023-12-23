/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 数组为空，返回空链表
  if (!lists.length) return null
  // 数组长度为1，返回数组的第一个链表
  if (lists.length === 1) return lists[0]

  // 数组长度为2，直接合并
  if (lists.length === 2) {
    return mergeList(lists[0], lists[1])
  }

  let i = 0
  let j = lists.length - 1
  let newLists = []

  while (i < j) {
    newLists.push(mergeList(lists[i], lists[j]))
    i++
    j--
  }

  if (i === j) {
    newLists.push(lists[i])
  }

  return mergeKLists(newLists)
}

function mergeList(head1, head2) {
  let dummyHead = new ListNode(-1) // 虚拟头节点
  let ans = dummyHead // 给虚拟头节点一个指针，我们通过移动这个指针完成操作，这个虚拟头节点的后继节点便是我们最终的链表头

  while (head1 && head2) {
    // 从小到大，我们将当前节点连到更小的节点上
    // 连接节点：a.next = b
    if (head1.val < head2.val) {
      ans.next = head1
      head1 = head1.next
    } else {
      ans.next = head2
      head2 = head2.next
    }
    // 上一步是完成当前节点和后继节点的连接，每追加一个节点后，我们相应的将当前指针向后移动一个
    ans = ans.next
  }

  if (head1 || head2) {
    // 如果此时有未遍历完的节点，直接追加到末尾
    ans.next = head1 || head2
  }

  return dummyHead.next
}
