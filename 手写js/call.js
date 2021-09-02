/**
 * 手动实现call
 * xxx.fn() => fn中的this会指向xxx
 */
Function.prototype.myCall = function (ctx) {
  // 手动传入的this指向
  const context = new Object(ctx)
  // 当前调用的函数
  const callFn = this
  // 用一个临时属性将函数保存在context上
  const tempKey = Symbol('temp')
  context[tempKey] = callFn
  // 调用代码
  context[tempKey](arguments[1])
  delete context[tempKey]
}

const Person = {
  name: 'Peter',
  Hello: function (afterMsg) {
    console.log('my name is ' + this.name + afterMsg)
  },
}

Person.Hello.call({ name: 'Alice' }, ' and you ?')
Person.Hello.myCall({ name: 'Alice' }, ' and you ?')
