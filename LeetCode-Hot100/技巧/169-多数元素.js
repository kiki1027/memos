/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let vote = 0;
  let majorityNum = 0;

  /**
   * 摩尔投票法
   * 因为题目要求众数一定会出现「n/2」次或以上，
   * 这就意味着最差的情况另外n/2个数各自出现1次，
   * 众数的那个数至少会出现一次相邻的情况，
   * 这就可以利用摩尔投票法，每次出现不同的票就-1，相同的票+1，
   * 票数初始为0，每次出现票数为0的时候，就记录下当前的众数，
   * 一直遍历到最后，存储的众数则是结果
   * 因为众数出现的次数一定过半，且一定存在相邻或众数在末尾的情况，
   * 这就使得可能会出现的两种结果，
   * 1. 当我们遇到相邻的众数以后，不会再出现抵消票到 0 的情况了，
   * 2. 或者计票到最后一位是众数，计票为0
   */
  for (const n of nums) {
    if (vote === 0) {
      majorityNum = n;
      vote++;
    } else {
      vote = majorityNum === n ? vote + 1 : vote - 1;
    }
  }

  return majorityNum;
};

console.log(majorityElement([3, 2, 3, 1, 3]));
console.log(majorityElement([3, 1, 3, 3, 2, 2]));
