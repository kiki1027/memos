/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  /**
   * 爬到第0级台阶有1种方案
   * 爬到第1级台阶有1种方案
   * 爬到第2级台阶有【第0级+2】or【第1级+1】 2
   * ...
   */
  let prev = 1;
  let cur = 1;
  // 从第2级台阶开始计算，一直到第n级台阶
  for (let i = 2; i <= n; i++) {
    const temp = cur; // temp=1,temp=2,temp=3,temp=5
    // 2th = 0th + 1th
    cur = prev + cur; // cur=1+1,cur=1+2,cur=2+3,cur=3+5
    prev = temp; // prev=1,prev=2,prev=3,prev=5
  }

  return cur;
};

console.log(climbStairs(5));
