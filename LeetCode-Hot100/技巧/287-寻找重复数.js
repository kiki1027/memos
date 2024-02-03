/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  /**
   * 题目要求
   * 1. 时间复杂度O(n) 即无嵌套循环
   * 2. 空间复杂度O(1) 即不使用复杂类型
   * 3. 不修改原数组
   *
   * 题目给的条件
   * 1. 数字范围1-N
   * 2. 一共N+1个数 有一个数重复
   *
   * 因为题目要求的限制我们借用循环链表的概念
   * 判断当前链表是否存在循环时
   * 我们使用快慢指针 就能满足O(n)+O(1)的限制
   * 那么转换题意 查找重复数等于查找循环链表的入口
   *
   * 第一步，我们考虑如何将当前的数组转换成类似链表的结构关系
   * 因为当前的数据结构是数组，那么能让这些数字两两相连的方法就是
   * 借用下标找映射关系，我们优先给定链表头0，由链表头找下标0的数字
   * 再由这个数字找到对应下标上的下一个数字，
   * 这样两个数字之间就会产生映射关系，
   * 注意，这个映射关系是借助下标产生的，
   * 假设下标a的数字为b，下标b的数字为c，即 b与c存在了映射关系，
   * 1 2 3 4
   * 映射关系
   * 1. 0->1 (链表头0，与下标0的数字映射) 0 -> nums[0]
   * 2. 1->2 (数字1与下标1的数字映射) nums[0] -> nums[nums[0]]
   * 3. 2->3 (数字2与下标2的数字映射) nums[nums[0]] -> nums[nums[nums[0]]]
   * 4. 3->4 (数字3与下标3的数字映射) nums[nums[nums[0]]] -> nums[nums[nums[nums[0]]]]
   *
   * 第二步，我们考虑快慢指针如何在当前的映射关系里使用
   * 观察上面的映射关系，我们可以看出映射是通过嵌套nums表达的
   * nums[a] 近似于 a.next 的意思，nums[nums[a]] 近似于 a.next.next
   * 那么 slow = 0, fast = 0
   * slow移动一次：slow = slow.next ==> slow = nums[slow]
   * fast移动一次：fast = fast.next.next ==> fast = nums[nums[fast]]
   *
   * 第三步，回想一下我们如何判断
   */
  let slow = 0;
  let fast = 0;
  while (nums[slow] && nums[fast] && nums[nums[fast]]) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (fast === slow) {
      /**
       * 第一次相遇表示存在循环
       * 重置fast到起点，步长改为1
       * 此时同步走快慢指针，
       * 下一个相遇点即为入口
       *
       * 2 * slow = fast
       * slow = P + C - X
       * fast = P + C - X + C 快指针和慢指针第一次相遇时快指针一定比慢指针多走一轮C
       * 2P + 2C - 2X = P + 2C - X
       * P = X  ---> 因为P===X所以下一个相遇点就是入口
       *
       * 快慢指针在循环内，为什么会相遇？
       * 假设快慢指针间隔10个长度，快慢指针每走一次，
       * 快指针走一次间隔会-2，慢指针走一次间隔会+1，
       * 它们的间隔为 10-2+1 ==> 9，所以每走一次
       * 间隔就会缩短1，那么第10次他们必然会相遇
       *
       * 1,3,4,2,2
       * 0->1->3->2->4->2
       */
      fast = 0;
      while (nums[slow] && nums[fast]) {
        /**
         * 因为 P===X 下一个相遇点就是入口，
         * 我们重置快指针及步长设为1，
         * 然后同步移动快慢指针，
         * 第一个相遇点则是循环入口，
         * 即重复数字
         */
        fast = nums[fast];
        slow = nums[slow];
        if (slow === fast) {
          return slow;
        }
      }
    }
  }
  return -1;
};

console.log(findDuplicate([1, 3, 4, 2, 2]));
