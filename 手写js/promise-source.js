const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isFunction = (fn) => typeof fn === 'function'

class MyPromise {
  // 一个promise实例可以被多次调用promise.then(),promise.then()...
  // 需要一个list存放当前promise实例注册的回调函数们，promise状态发生变化时，所有回调顺序执行
  fulfilledCallbacks = []
  rejectedCallbacks = []
  // promise有三个状态 初始状态pending 我们使用getter，setter的特性实现了status trigger触发器的效果，
  // 为避免set和get循环调用 所以需要借一个中转值存储status
  _status = PENDING

  // 构造函数调用方式 new Promise(function(resolve, reject) {...})
  constructor(executor) {
    // 术语之一 表示promise的执行结果
    this.value = undefined
    // 术语之一 表示promise的拒绝原因
    this.reason = undefined

    try {
      // new Promise(function(resolve, reject) {...})
      // executor是外部传入的方法，resolve和rejected作为普通函数简单调用
      // this会指向全局对象，故手动绑定this
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  // status setter: 充当状态trigger，执行绑定的回调函数们
  set status(status) {
    this._status = status

    switch (this.status) {
      case FULFILLED: {
        this.fulfilledCallbacks.forEach((callback) => {
          callback(this.value)
        })
        break
      }
      case REJECTED: {
        this.rejectedCallbacks.forEach((callback) => {
          callback(this.reason)
        })
        break
      }
      default:
        break
    }
  }

  // 状态 getter
  get status() {
    return this._status
  }

  // Promise的行为之一 改变状态为已完成
  // resolve(value) => PENDING -> FULFILLED
  resolve(value) {
    // 只有 PENDING 状态可以修改状态
    if (this.status === PENDING) {
      // 因为status setter中有用到value，所以先设置value在设置status
      this.value = value
      this.status = FULFILLED
    }
  }

  // Promise的行为之一 改变状态为已拒绝
  // reject(reason) => PENDING -> REJECTED
  reject(reason) {
    // 只有 PENDING 状态可以修改状态
    if (this.status === PENDING) {
      // 因为status setter中有用到reason，所以先设置reason在设置status
      this.reason = reason
      this.status = REJECTED
    }
  }

  // 解析promise，改变promise的状态触发下一个callback
  // 每一轮then方法返回的promise都要经过resolvePromise的解析改变状态，才能触发下一个callback
  resolvePromise(newPromise, callbackResult, resolve, reject) {
    // case1: newPromise和callbackResult不能是同一个对象
    // 程序设计严谨性 防止循环引用
    if (newPromise === callbackResult) {
      return reject(
        new TypeError('The promise and the return value are the same')
      )
    }

    if (callbackResult instanceof MyPromise) {
      // case2: callbackResult是一个promise
      // 回调函数返回的是一个promise，先将promise执行（即调用.then执行），如果是fulfilled，
      // 拿到它的value继续再和newPromise做解析，如果是rejected则调用reject
      // todo: 是否要加一个状态判断
      callbackResult.then((value) => {
        // 继续调用resolvePromise做解析
        this.resolvePromise(newPromise, value, resolve, reject)
      }, reject)
    } else if (
      typeof callbackResult === 'object' ||
      isFunction(callbackResult)
    ) {
      // case3: callbackResult是对象或者函数
      // 因为then方法应该返回一个promise，根据规范把拥有then方法的对象或者函数称之为promise
      // 那么callbackResult应该要有一个then方法，如果没有则reject newPromise

      // 边界情况 null也是object
      if (callbackResult === null) {
        return resolve(callbackResult)
      }

      try {
        let then = callbackResult.then
        // 如果then是一个可执行的东西
        if (isFunction(then)) {
          let called = false
          // 调用then方法传递callback执行结果，继续和newPromise做解析
          then.call(
            callbackResult,
            (value) => {
              // 继续调用resolvePromise做解析
              // 按照规范 onFulfilled 和 onRejected 都只能调用一次，
              // 回调函数的执行会改变当前promise的状态以触发下一个then方法的回调函数，所以不能重复调用。
              // 需要手动设置一个标记判断是否被调用过，非初次调用的话直接忽略（value也不会被传递）。
              if (called) return
              called = true
              this.resolvePromise(newPromise, value, resolve, reject)
            },
            (reason) => {
              if (called) return
              called = true
              reject(reason)
            }
          )
        } else {
          // 非可执行对象 直接传下去
          return resolve(callbackResult)
        }
      } catch (error) {
        return reject(error)
      }
    } else {
      // case4: 以上三种都不是
      // callbackResult直接传递给下一个then
      return resolve(callbackResult)
    }
  }

  // 立即注册，延迟回调
  then(onFulfilled, onRejected) {
    const parent = this

    // 参数过滤
    const onFulfilledFn = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => {
          // 如果onFulfilled不是一个函数，那么手动塞一个函数（原因：将上一个promise的value传递下去）
          return value
        }

    const onRejectedFn = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          // 如果onRejected不是一个函数，那么手动塞一个函数（原因：将上一个promise的reason throw出去）
          // throw的原因时因为当前onRejected不是个函数，直接用抛错处理
          throw reason
        }

    // then应该是一个promise（promise链继续thenable）
    // 为什么要手动返回一个新的promise呢？是因为这样无论then方法注册的回调函数执行结果是什么，
    // 都可以保证返回的是一个promise，并且是新的promise，
    // 根据回调函数执行结果对newPromise做对应的resolve/reject，触发下一个.then对应的callback（如果有下一个的话）
    // 既然我们手动返回了一个newPromise，那么这个newPromise改变状态的逻辑
    // 和then方法上callbacks的执行结果之间就存在一个关系，我们定义一个用于解析两者关系的函数，
    // 通过该函数定义newPromise的状态根据callback的执行结果是怎样流转的，从而进入下一个.then。
    const newPromise = new MyPromise((resolve, reject) => {
      const self = this
      // 这里使用箭头函数，就不用改this指向了
      // 重新包一个fulfilled函数，函数体内执行成功回调函数，再调用resolvePromise解析newPromise
      const _fulfilledFn = () => {
        queueMicrotask(() => {
          /* 微任务中将运行的代码 */
          try {
            // FULFILLED状态执行onFulfilled
            const returnValue = onFulfilledFn(parent.value)
            // 解析newPromise和onFulfilledFn执行结果
            this.resolvePromise(self, returnValue, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      // rejected函数和fulfilled函数做同样处理
      const _rejectedFn = () => {
        queueMicrotask(() => {
          /* 微任务中将运行的代码 */
          try {
            // REJECTED状态执行onRejected
            const returnValue = onRejectedFn(parent.reason)
            // 解析newPromise和onRejectedFn执行结果
            this.resolvePromise(self, returnValue, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      // 根据上一个promise状态，决定newPromise执行什么回调
      switch (parent.status) {
        case FULFILLED: {
          // 同步 resolve
          _fulfilledFn()
          break
        }
        case REJECTED: {
          // 同步 reject
          _rejectedFn()
          break
        }
        case PENDING: {
          // 异步任务 先收集注册的回调 监听状态变化批量顺序执行回调
          // 这样在当前promise状态变化时（trigger）才能一次性执行所有绑定的回调函数
          parent.fulfilledCallbacks.push(_fulfilledFn)
          parent.rejectedCallbacks.push(_rejectedFn)
          break
        }
        default:
          break
      }
    })

    return newPromise
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally) {
    return Promise.resolve(onFinally)
  }

  // 静态方法 创建一个新的resolved的promise
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }

    return new MyPromise(function (resolve, reject) {
      resolve(value)
    })
  }

  // 静态方法 创建一个新的rejected的promise
  static reject(reason) {
    return new MyPromise(function (resolve, reject) {
      reject(reason)
    })
  }

  // [race用法参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
  // race的使用场景：同时做了两个操作想知道哪个操作先做完
  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      if (!promiseList) {
        return reject(new TypeError('undefined is not iterable'))
      }

      if (promiseList.length === 0) {
        return resolve()
      }

      // promiseList中任何一个promise is settled(处理过了的)，则resolve/reject当前promise
      promiseList.forEach((promise) => {
        // Promise.resolve将非promise对象包装成promise返回，promise对象直接返回
        MyPromise.resolve(promise).then(
          (value) => {
            resolve(value)
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }

  // [all用法参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
  // all的使用场景：并发请求
  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      if (!promiseList) {
        return reject(new TypeError('undefined is not iterable'))
      }

      const taskLen = promiseList.length
      const resolvedValueList = []

      if (taskLen === 0) {
        return resolve([])
      }

      // 当settled promise个数和promiseList个数相等，证明全部执行完成
      for (let i = 0; i < promiseList.length; i++) {
        MyPromise.resolve(promiseList[i])
          .then((value) => {
            // push into resolvedValueList
            resolvedValueList[i] = value
          })
          .catch((e) => {
            // catch 第一个error message or rejected promise reason
            // 如果有遇到onRejected或者异常的promise，立即reject（每个promise的reject只会被执行一次，即使重复执行只有第一次生效）
            reject(e)
          })
      }

      if (resolvedValueList.length === taskLen) {
        return resolve(resolvedValueList)
      }
    })
  }

  // [allSettled用法参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
  static allSettled(promiseList) {
    return new MyPromise((resolve, reject) => {
      // 存储返回值List
      const returnValueList = []
      for (let i = 0; i < promiseList.length; i++) {
        MyPromise.resolve(promiseList[i])
          .then(
            (value) => {
              returnValueList[i] = { status: FULFILLED, value }
            },
            (reason) => {
              returnValueList[i] = { status: REJECTED, reason }
            }
          )
          .finally(() => {
            // 在promise结束时，都会被执行的回调
            if (returnValueList.length === promiseList.length) {
              resolve(returnValueList)
            }
          })
      }
    })
  }
}

export default MyPromise
