// utils
function isObject(v) {
  return v && typeof v === 'object'
}
function fullKey(...args) {
  return args.filter((n) => n).join('.')
}

// feature
function flattenDeepObj(target) {
  console.log('input:', target)
  function dig(pKey, value) {
    // 遍历键值对，用reduce实现object记忆功能
    return Object.entries(value).reduce(function (prev, [key, value]) {
      // 优先组装好返回值，保持多种条件同一输出
      let obj = { [fullKey(pKey, key)]: value }
      if (isObject(value)) {
        // 如果value是一个object继续往下挖
        obj = dig(fullKey(pKey, key), value)
      }
      // value不是object直接返回组装好的值
      return { ...prev, ...obj }
    }, {})
  }
  return dig(null, target)
}

console.log(
  'output:',
  flattenDeepObj({ a: 1, b: { b1: 1, b2: { b21: 1 } }, c: 1 })
)
