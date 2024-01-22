/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  /**
   * 找字典序大一点点的下一个排列
   * 123456
   * 132456
   */
  let i = nums.length - 1;

  while (i - 1 >= 0 && nums[i - 1] >= nums[i]) {
    /**
     * 从后往前找到第一个降序的位置
     * 降序：前一位比后一位小
     */
    i--;
  }
  if (i === 0) {
    /**
     * 不存在降序，证明全升序
     * 下一个排列即重置为最初的字典序->翻转
     */
    reverse(nums, 0, nums.length - 1);
  } else {
    /**
     * 从后往前找到第一个降序位置，
     * 找到其后面位置中比他大一点点的位置，
     * 后面的位置一定是从大到小的（因为我们一开始是从后往前找第一个降序）
     * 找到这个位置j和降序位置i交换后，再将j之后的元素进行翻转，
     * i之后翻转的原因是因为原来i+1...end是从大到小，
     * 我们的目标是找到下一个只大一点点的排列，
     * 只大一点点意味着我们后面的数字字典序越小越好，那我们翻转一下，
     * 就可以将从大到小翻转成从小到大，这样字典序就自然成为最小的，
     */
    i--;
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {
      /**
       * 从后往前是从小到大的，
       * 所以倒着找到第一个比nums[i]大的位置
       */
      j--;
    }
    swap(nums, i, j);
    reverse(nums, i + 1, nums.length - 1);
  }

  return nums;
};

function swap(arr, i, j) {
  let t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

function reverse(arr, start, end) {
  let i = start;
  let j = end;
  while (i < j) {
    swap(arr, i++, j--);
  }
}
