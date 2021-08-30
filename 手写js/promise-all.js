/**
 * 手写 Promise.all
 * 1. 接收一组promise
 * 2. 并发执行
 * 3. 返回一个promise
 * 4. 遇到error后立即返回，reject promise
 * 5. 无error且全部执行完成后返回一组结果，resolve promise
 * @returns
 */
function myAll(promiseList) {
  return new Promise((resolve, reject) => {
    const resultList = []
    if (resultList.length > 0) {
      promiseList.forEach((promise) => {
        // 防止不是promise就用Promise.resolve包一层，保证一定可以.then
        Promise.resolve(promise).then(
          (val) => {
            // 保证promise结果和promiseList顺序一致
            resultList[i] = val
            // all fulfilled 返回
            if (promiseList.length === resultList.length) {
              resolve(resultList)
            }
          },
          (error) => {
            reject(error)
          }
        )
      })
    }
  })
}
