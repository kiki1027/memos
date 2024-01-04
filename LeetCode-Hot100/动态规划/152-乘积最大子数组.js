/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let min = 1;
  let max = 1;
  let res = Math.max(...nums);

  for (const n of nums) {
    let tempMax = n * max;
    let tempMin = n * min;

    /**
     * 这样保证了每一位正负的情况，都能得出当前位及以前最大乘积、最小乘积
     */
    max = Math.max(n, tempMin, tempMax);
    min = Math.min(n, tempMin, tempMax);
    res = Math.max(res, max);
  }

  return res;
};
