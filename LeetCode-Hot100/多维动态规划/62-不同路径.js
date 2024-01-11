/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let map = new Map();
  /**
   * 每个格子可行的路线数量等于其右边格子路线数量+下边格子路线数量
   * 即 res = R + D
   * 像这种依赖的关系，我们需要找出 base case
   * 也就是最基础的有值的那个场景，即当当前格子是终点时
   * 它默认就是终点（此时无需参考R、D） 路线数量base为1
   * 那么以终点为基础我们逐行逐列一直推导到起点，就是结果
   * 一共 m 行，n 列
   * 初始化终点 [-m+1, n-1] = 1
   */
  map.set([-m + 1, n - 1].join(","), 1);

  for (let r = -m + 1; r <= 0; r++) {
    for (let c = n - 1; c >= 0; c--) {
      if (!map.has([r, c].join(","))) {
        // 向右一格 c+1
        const right = map.get([r, c + 1].join(",")) || 0;
        // 向下一格 r-1
        const down = map.get([r - 1, c].join(",")) || 0;
        map.set([r, c].join(","), right + down);
      }
    }
  }

  return map.get("0,0");
};

console.log(uniquePaths(10, 10));
