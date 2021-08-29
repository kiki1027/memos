function myRace(promiseList) {
  return new Promise((resolve, reject) => {
    if (promiseList.length === 0) {
      resolve()
    }
    promiseList.forEach((promise) => {
      Promise.resolve(promise).then(
        (val) => {
          resolve(val)
        },
        (err) => {
          reject(err)
        }
      )
    })
  })
}
