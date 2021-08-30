/**
 * 手写Promise.allSettled
 * 和Promise.all大致都差不多，但是返回值是一个组结果对象集（包括error）
 * @returns
 */
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'

function myAllSettled(promiseList) {
  return new Promise((resolve, reject) => {
    const resultList = []
    if (resultList.length > 0) {
      resultList.forEach((promise, i) => {
        Promise.resolve(promise)
          .then(
            (val) => {
              resultList[i] = { status: STATUS_FULFILLED, value: val }
            },
            (err) => {
              resultList[i] = { status: STATUS_REJECTED, reason: err }
            }
          )
          .finally(() => {
            if (resultList.length === promiseList.length) {
              return resolve(resultList)
            }
          })
      })
    }
  })
}
