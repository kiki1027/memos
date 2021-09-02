/**
 * 修改this指向
 */ /**
 * 手动实现call
 * xxx.fn() => fn中的this会指向xxx
 */
Function.prototype.myBind = function (ctx, ...params) {
  // 当前调用的函数
  const callFn = this
  const context = ctx ? Object(ctx) : window
  const args = params || []
  return function (...secondParams) {
    // 手动传入的this指向
    return callFn.apply(context, [...args, ...secondParams])
  }
}

const Person = {
  name: 'Peter',
  Hello: function (afterMsg) {
    console.log('my name is ' + this.name + afterMsg)
  },
}

Person.Hello.bind({ name: 'Alice' }, [' and you ?'])()
Person.Hello.myBind({ name: 'Alice' }, [' and you ?'])()
