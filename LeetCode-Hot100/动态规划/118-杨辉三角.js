/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let res = [[1]];
  /**
   * 每一行用0补齐头尾，为下一行计算做准备
   * 用移动左右指针计算出下一行每一位的值
   */
  let l = 0;
  let r = l + 1;

  /**
   * 若5行，则依赖0-4行的推算得出，i=[0, numRow-1]
   */
  for (let i = 0; i < numRows - 1; i++) {
    let prev = [0, ...res[i], 0];
    let line = [];

    /**
     * 左右指针的范围为原本个数+头尾0(2)
     * 原本个数 第0行 = 1，第1行 = 2，...
     * prev[0]+prev[1]===>next[0]
     * prev[1]+prev[2]===>next[1]
     * prev[2]+prev[3]===>next[2]
     * ...
     */
    while (l < r && r <= i + 2) {
      line.push(prev[l] + prev[r]);
      l++;
      r++;
    }

    res.push(line);
    l = 0;
    r = 1;
  }

  return res;
};

console.log(generate(5));
