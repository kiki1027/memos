/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let res = 0;
  // 当下可以到达的最远位置，初始为0表示当前只有第一个位置是可以到达的
  let farthest = 0;
  let nextFarthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    /**
     * 在没到farthest位置前，一直更新最远位置「下一步可到达的最远位置」
     */
    nextFarthest = Math.max(nextFarthest, i + nums[i]);

    // 如果我们已经遍历到了已知的可到的最远位置，则需要重置当前最远位置为新找到的nextFarthest, 并次数加一，证明还要跳一步
    if (i === farthest) {
      farthest = nextFarthest;
      res++;
    }
  }

  return res;
};
