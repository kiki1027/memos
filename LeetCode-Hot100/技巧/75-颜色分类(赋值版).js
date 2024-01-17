/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let nextZeroIndex = 0;
  let nextOneIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    /**
     * 默认修改当前数字为2
     */
    nums[i] = 2;
    /**
     * 在按照实际数字大小修改赋值，并记录0和1的数量
     * 如果当前数小于2，即 可能是 0 或 1，
     * 而因为最终结果是要按照0,1,2的顺序排列，
     * 那么有一个0，证明1的位置要往后+1
     * 所以1的下标和0的个数有关，即出现一个0，nextOneIndex就加一
     * 因为<1的一定<2，但<2的不一定<1，
     * 所以我们先赋值1，如符合条件再赋值0
     */
    if (cur < 2) {
      nums[nextOneIndex++] = 1;
    }
    /**
     * 如果当前数小于1，即是 0
     * 给 0 的数量++ --->
     */
    if (cur < 1) {
      nums[nextZeroIndex++] = 0;
    }
  }

  /**
   * 复杂度分析
   * 时间复杂度 time complexity：一次数组循环 O(n)
   * 空间复杂度 space complexity：未使用复杂类型存储 -> 常量级 O(1)
   */
  return nums;
};

console.log(sortColors([2, 0, 2, 1, 1, 0]));
