/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const ans = []
  const queue = []

  for (let i = 0; i < nums.length; i++) {
    while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop()
    }

    queue.push(i)

    if (queue[0] <= i - k) {
      queue.shift()
    }

    if (i + 1 >= k) {
      ans.push(nums[queue[0]])
    }
  }

  return ans
}

const a = maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
console.log(a)
