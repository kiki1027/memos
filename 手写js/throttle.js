/**
 * 一段时间内，多次发生只关注第一次（后续的忽略）
 * 1. 事件第一次触发后，设置一个定时器
 * 2. 定时器存在（还在指定时间内）则不能执行事件
 * 3. 定时器到时后清空
 */
function throttle(func, delay) {
  let timer = null
  return function () {
    if (!timer) {
      func.apply(this, arguments)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}
