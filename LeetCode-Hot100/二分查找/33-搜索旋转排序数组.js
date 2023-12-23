/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (!nums.length) return -1

  let left = 0
  let right = nums.length - 1

  while (left < right) {
    // 这里mid的取整规则，我们可以想象当只剩下两个元素，也就是[left,right]时
    // 假设我们将mid分给左区间，如果mid的取值规则是向下取整的话（即左右取左），只有两个元素时都会是第一个元素的下标，导致死循环，所以我们需要将取值规则换为向上取整（即左右取右）
    // 假设我们将mid分给右区间，如果mid的取值规则是向上取整（即左右取右），那么只有两个元素时去到的都是第二个元素的下标，导致死循环，所以我们将取值规则换为向下取整（即左右取左）
    // 注意，取整规则只会影响 当我们将mid包含进结果范围内时的情况，如果只是做一分为二的操作，那就任意规则都可
    let mid = Math.ceil((left + right) / 2)
    // 一个升序数组旋转后，旋转点左侧应保持升序，右侧是降序
    // 找升序部分条件
    // 1. nums[mid] < mid[right] mid...right 升序
    // 2. 与1相反 left...mid-1 升序
    if (nums[mid] < nums[right]) {
      // mid...right 一定是升序
      if (target >= nums[mid] && nums[right] >= target) {
        // target 在 mid...right 之间
        left = mid
      } else {
        // 与上面相反，target 不在 mid...right 之间，那么下一个 right 即 mid-1
        right = mid - 1
      }
    } else {
      // mid...right 不是升序，即 left...mid-1 一定是升序
      if (nums[left] <= target && target <= nums[mid - 1]) {
        // target 在 left...mid-1 之间
        right = mid - 1
      } else {
        // target 不在 left...mid-1 之间，即 在 mid...right 之间，下一个 left 为 mid
        left = mid
      }
    }
  }

  // 上述的过程是一直折半缩小target所在区间
  // 直到缩小到只剩target
  // 最后一个 left === right 跳出循环
  if (nums[left] === target) {
    return left
  }

  return -1
}
