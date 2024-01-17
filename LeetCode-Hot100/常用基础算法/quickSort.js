/**
 *
 * @param {number[]} array
 * @param {number} left
 * @param {number} right
 * @returns
 */
function quickSort(array, left, right) {
  if (left >= right) return array;
  const pivot = partition(array, left, right);
  quickSort(array, left, pivot - 1);
  quickSort(array, pivot, right);
  return array;
}

function partition(array, left, right) {
  let pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    console.log({ i, j, pivot });
    console.log(array);
    while (compare(array[i], pivot) === -1) {
      // i < pivot
      i++;
      console.log("i: ", i);
    }
    while (compare(array[j], pivot) === 1) {
      // j > pivot
      j--;
      console.log("j: ", j);
    }
    if (i <= j) {
      // 说明不满足上述条件
      console.log({ i, j, pivot });
      swap(array, i, j);
      console.log("array: ", array);
      i++;
      j--;
    }
  }

  return i;
}

function compare(a, b) {
  if (a === b) return 0;

  return a < b ? -1 : 1;
}

function swap(array, i, j) {
  if (i !== j) {
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
}

const a = [2, 0, 1];
console.log(quickSort(a, 0, 2));
