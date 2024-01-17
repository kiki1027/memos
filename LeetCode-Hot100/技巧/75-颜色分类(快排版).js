/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  /**
   * 题目要求：
   * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
   *
   * 题目本质是需要实现什么？
   * 即不使用sort方法将一组数按小到大排序
   *
   * 立马可以想到是不是可以用快排？
   * 说下快排的核心 —— 分区
   * 每次定一个临时基准值(可以是中间点)，
   * 利用双指针，一头一尾，与临时基准值比较，
   * 头指针一定要比中间点小，i++
   * 尾指针一定要比中间点大，j--
   * 出现不满足的情况，将头尾指针值交换后，i++,j--
   * 每一轮结束相当于是确定了基准值的位置。
   * 我们把上面这个过程称为「分区」- partition
   * 分区的目标就是得到基准位的下标 pivot，
   * 使得数组分成 [小于基准值的，基准值，大于基准值的] 三部分
   *
   * 分区完成后，相当于我们只确定了基准值的位置，我们借用基准值，
   * 将数组分为两部分再进行快排，直到所有元素都确定了位置
   */
  function partition(arr, left, right) {
    let i = left;
    let j = right;
    /**
     * 临时基准值为中间的数
     */
    let tempPivot = arr[Math.floor((left + right) / 2)];

    /**
     * ❗️❗️：这里注意需要等号(i<=j)，因为i===j时正好是走到中间位置了，
     * 但当前的中间位置可能是交换过某次i、j的值，
     * 所以需要和【最初】的临时基准tempPivot进行比较的，
     * 不然相当于少比了一个数
     */
    while (i <= j) {
      while (arr[i] < tempPivot) {
        i++;
      }
      while (arr[j] > tempPivot) {
        j--;
      }
      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }

    return i;
  }

  function swap(arr, i, j) {
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }

  function quickSort(arr, start, end) {
    if (start >= end) return arr;
    /**
     * 用分区得到基准位的下标
     */
    const pivot = partition(arr, start, end);
    /**
     * 用中间位的下标再对左区、右区进行快排
     * 这里每次都把数组拆分成了两部分 复杂度 logn
     * 每次partition会遍历一次每个元素 复杂度 n
     * quickSort总复杂度 O(n*logn)
     */
    quickSort(arr, start, pivot - 1);
    quickSort(arr, pivot, end);

    return arr;
  }

  return quickSort(nums, 0, nums.length - 1);
};

console.log(sortColors([1, 0, 2, 1, 1, 2]));
