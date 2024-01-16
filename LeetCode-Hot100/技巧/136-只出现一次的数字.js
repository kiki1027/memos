/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  /**
   * ❗️❗️: 当看到题目说【不需要额外空间】时，就可以往位运算上想
   *
   * 借用【异或】运算
   * a^b a异或b 是将a的二进制和b的二进制每一位进行异或
   * 异或的原则是 同一位上数字相同则为0 不同则为0
   * ex.
   * (6) 110   (7) 111    (7)  111
   * (2) 010   (7) 111    (0)  000
   * -------   -------    --------
   * (4) 100   (1) 000    (7)  111
   *
   * 位运算都符合交换律，即 a^b^c=a^c^b=c^a^b=...
   * 任何数和本身做异或=0
   * 任何数和0做异或=它本身
   */
  let singleNum = 0;
  for (const n of nums) {
    /**
     * 借用位运算的交换律
     * 4^1^2^1^2 => 1^1^2^2^4 => 0^0^4 => 0^4
     */
    singleNum ^= n;
  }

  return singleNum;
};

console.log(singleNumber([4, 1, 2, 1, 2]));
