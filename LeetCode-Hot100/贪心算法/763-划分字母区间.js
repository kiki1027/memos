/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  let map = {};
  let res = [];

  /**
   * map存储 字母和出现lastIndex的键值对
   */
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = i;
  }

  let size = 0;
  let end = 0;

  /**
   * 从头遍历字符串，找到当前字符对应出现的最大下标
   * 用它更新end，当达到已遍历字符串中最大下标end位置时
   * 将字符串截断，推入结果集，重置size
   */
  for (let i = 0; i < s.length; i++) {
    size++;
    if (end < map[s[i]]) {
      end = map[s[i]];
    }
    if (end === i) {
      res.push(size);
      size = 0;
    }
  }

  return res;
};
