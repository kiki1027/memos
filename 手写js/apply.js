/**
 * 修改this指向
 */ /**
 * 手动实现call
 * xxx.fn() => fn中的this会指向xxx
 */
Function.prototype.myApply = function (ctx) {
  // 手动传入的this指向
  const context = new Object(ctx)
  // 当前调用的函数
  const callFn = this
  // 用一个临时属性将函数保存在context上
  const tempKey = Symbol('temp')
  context[tempKey] = callFn
  let args = []
  // 第一个参数是this指向，从第二个参数开始是arguments
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  // 调用代码
  context[tempKey](...args)
  delete context[tempKey]
}

const Person = {
  name: 'Peter',
  Hello: function (afterMsg) {
    console.log('my name is ' + this.name + afterMsg)
  },
}

Person.Hello.apply({ name: 'Alice' }, [' and you ?'])
Person.Hello.myApply({ name: 'Alice' }, [' and you ?'])
