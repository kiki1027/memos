function fetchWithAutoRetry(fetcher, maxRetryCount) {
  return new Promise((resolve, reject) => {
    let retryCount = 0
    const fetcherFn = () =>
      fetcher().then(
        (val) => {
          resolve(val)
        },
        (err) => {
          if (maxRetryCount > retryCount) {
            retryCount++
            console.log('refetch')
            fetcherFn()
          } else {
            reject(err)
          }
        }
      )

    fetcherFn()
  })
}

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, 300)
  })
}

fetchWithAutoRetry(fetchData, 3)
