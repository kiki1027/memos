/**
 * 动态规划
 * 时间复杂度 O(n*n) 两层循环
 * 空间复杂度 O(n)
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  /**
   * nums = [10,9,2,5,3,7,101,18]
   */
  /**
   * 用来存截止到当前位的最大递增长度
   */
  let maxLen = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    // let curMax = dp[i];
    /**
     * 每一位找之前位里比它小的值
     */
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        maxLen[i] = Math.max(maxLen[i], maxLen[j] + 1);
      }
    }
  }

  return Math.max(...maxLen);
};

/**
 * 二分查找
 * 时间复杂度 O(nlogn) 一层循环*二分查找logn
 * 空间复杂度 O(n)
 * @param {number[]} nums
 * @returns
 */
var lengthOfLIS2 = function (nums) {
  /**
   * nums = [10,9,2,5,3,7,101,18]
   */
  /**
   * 用来存放每个新起的栈顶
   * 栈的存放规则为从大到小
   * 每新起一个意味着当前数字比上一个栈顶大，即符合条件的递增
   * 未新起栈顶则证明当前数字不符合连续递增的条件，需要将该数字追加进某一个栈，替换栈顶
   * 这样栈顶列表就是一个递增的列表（栈顶是某个栈最小的数字）
   * 栈顶列表的长度即为最大长度
   */
  let top = [];
  for (const n of nums) {
    if (top[top.length - 1] < n) {
      // 新起栈顶
      top.push(n);
    } else {
      // 当前数字小于最后一个栈顶，需要找到它属于哪个栈顶
      let left = 0;
      let right = top.length - 1;
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (top[mid] > n) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      top[left] = n;
    }
  }

  return top.length;
};

console.log(lengthOfLIS([4, 10, 4, 3, 8, 9]));
