/**
 * 展平数组
 */
// utils
function isArray(array) {
  return array && Array.isArray(array)
}

function flatten(array) {
  if (!isArray(array)) {
    return new TypeError('array is not an array')
  }

  let result = []

  function func(arr) {
    for (let i in arr) {
      if (isArray(arr[i])) {
        // 数组
        func(arr[i])
      } else {
        result.push(arr[i])
      }
    }
    return result
  }

  return func(array)
}

console.log(flatten([2, 3, [3, 4, 5, [1, 1, 1]]]))
