/**
 *  一段时间内多次触发，只认最后一次
 * 1. 设置一个定时器
 * 2. 如果再次触发，则清空+重置定时器
 * 3. 定时器到时后，触发事件
 */
function debounce(func, delay) {
  if (typeof func !== 'function') {
    return new TypeError('func is not a function !')
  }
  let timer = null
  return function () {
    // 借助闭包将定时器存下来
    clearTimeout(timer)
    timer = setTimeout(() => {
      // arguments是return的这个function接收的参数
      func.apply(this, arguments)
    }, delay)
  }
}

function foo(param) {
  console.log("I'm a " + param)
}

const timer = setInterval(() => {
  debounce(foo, 300)('fool')
}, 150)

setTimeout(() => {
  clearInterval(timer)
}, 300)
