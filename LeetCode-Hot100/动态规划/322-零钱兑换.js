/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  /**
   * coins = [474, 83, 404, 3]
   * amount = 264
   */
  let amounts = new Array(amount + 1).fill(+Infinity);
  amounts[0] = 0;
  coins.sort((a, b) => a - b);

  /**
   * 时间复杂度 O(amount * len(coins))
   * 空间复杂度 O(amount) <数组长度>
   */
  for (let money = 1; money <= amount; money++) {
    for (const coin of coins) {
      if (money < coin) {
        break;
      }
      amounts[money] = Math.min(amounts[money], 1 + amounts[money - coin]);
    }
  }

  return amounts[amount] === +Infinity + 1 ? -1 : amounts[amount];
};
