/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  /**
   * 反向倒减
   * 判断当前位置+当前最大可走步数是否可以达到目标下标
   * if reachable: 更新目标为当前位置
   * else: 再往前找是否有可以到达当前目标的位置
   *
   * True: if goal reach 0
   */
  let goal = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }

  return goal === 0;
};
