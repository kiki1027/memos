/**
 * 深拷贝
 * 1. 判断拷贝对象类型，若是简单类型直接复制
 * 2. 若是引用类型，则需要遍历key，递归拷贝
 * 3. 若是数组则拷贝数组
 */

// utils
function checkType(target) {
  // '[Object Array]'
  return Object.prototype.toString.call(target).slice(8, -1)
}

function cloneDeep(target) {
  // 基本类型直接返回
  let result

  switch (checkType(target)) {
    case 'Object': {
      result = {}
    }
    case 'Array': {
      result = []
    }
    default:
      result = target
  }

  for (let i in target) {
    const val = target[i]
    const valType = checkType(val)
    if (valType === 'Object' || valType === 'Array') {
      result[i] = cloneDeep(val)
    } else {
      result[i] = val
    }
  }

  return result
}

console.log(
  cloneDeep([
    1,
    '11',
    [1, 2, 3],
    { a: '1', b: { c: { a: 'object111' } } },
    function () {},
  ])
)
