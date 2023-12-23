/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  /**
   * 首先明确中位数如何计算
   * 1. 当总共偶数个数字时（假设为4），中位数为第[len/2]个元素,第[len/2+1]元素之和除以2
   * 2. 当总共奇数个数字时（假设为5），中位数为第[(len+1)/2]个元素
   */
  let size = nums1.length + nums2.length
  /**
   * 我们已经得出我们需要的中位数是第几个之后，相当于要求一个数组(两个数组合并+升序排列)的第n个元素
   * 对此，我们单独写一个函数，求两个数组升序合并情况下的第n个元素
   */
  if (size % 2 === 1) {
    // 奇数
    return getKthElement(nums1, nums2, (size + 1) / 2)
  }

  // 偶数
  return (
    (getKthElement(nums1, nums2, size / 2) +
      getKthElement(nums1, nums2, size / 2 + 1)) /
    2
  )
}

function getKthElement(nums1, nums2, k) {
  let len1 = nums1.length
  let len2 = nums2.length
  let count = k
  let index1 = 0
  let index2 = 0

  while (true) {
    if (index1 === len1) {
      /**
       * 返回值逻辑+边界1：
       * nums1已无剩余元素，剩余元素用nums2补齐
       * 下标需要-1
       */
      return nums2[index2 + count - 1]
    }
    if (index2 === len2) {
      /**
       * 返回值逻辑+边界2：
       * nums2已无剩余元素，剩余元素用nums1补齐
       * 下标需要-1
       */
      return nums1[index1 + count - 1]
    }
    /**
     * 返回值逻辑：仅剩一个位置
     * 当我们占位到只剩最后一个位置时，
     * 我们只要取此时两个数组首位元素中较小的那个，
     * 就是我们要找的第k小的元素了
     *
     * 没有到1个的时候，继续执行我们的主逻辑=更新剩余count，比较+占位
     */
    if (count === 1) {
      return Math.min(nums1[index1], nums2[index2])
    }

    /**
     * 注意上面的边界及返回值逻辑，我们写在了每轮循环的最开头，这是不在循环外写重复的逻辑，
     * 循环会一直持续运行，直到遇到返回的逻辑，不这样的话大循环开始前需要写边界情况，
     * 每轮循环后需要写边界+返回值情况
     */

    /**
     * 因为两个数组我们并不知道他们之间数值大小的排序，我们只知道他们各自是按照升序排列的
     * 目标是求前k个元素，我们就按照某个规律找到第k-1个元素后，第k个自然就出来了
     * 我们采用折半占位，每次找到两组中更小的k/2个元素，先将其排除，再往后找剩余小的元素
     */
    // 因为折半总数不能超过原数量，所以我们向下取整兼容奇数偶数两种情况。下标-1
    let newIndex1 = index1 + parseInt(count / 2) - 1
    let newIndex2 = index2 + parseInt(count / 2) - 1
    // 需要处理如果数组剩余长度不够的情况
    newIndex1 = Math.min(newIndex1, nums1.length - 1)
    newIndex2 = Math.min(newIndex2, nums2.length - 1)
    /**
     * 我们将两个数组的第k/2个元素进行比较，若p2>p1，
     * 则表示最终的前k个元素中，一定包含数组1的前k/2个元素。
     * 数组1的前k/2个元素（可能不足）即可占位
     */
    let p1 = nums1[newIndex1]
    let p2 = nums2[newIndex2]
    if (p2 > p1) {
      /**
       * newIndex1可能不足长度，为了得到准确的占位数量，我们求前后两个坐标的差值
       * 注意nums1[newIndex1]是包含的
       * 0 -> 3 ===> 一共4个数字 ===> afterIndex - beforeIndex + 1
       */
      count -= newIndex1 - index1 + 1
      // nums1[newIndex1]是包含的, next_index1 是它的下一位
      index1 = newIndex1 + 1
    } else {
      // 同上
      count -= newIndex2 - index2 + 1
      index2 = newIndex2 + 1
    }
  }
}
