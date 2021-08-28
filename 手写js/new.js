function newFunc() {
  // 1. 创建一个空对象
  let obj = {}
  // 2. 取出Constructor
  const Constructor = [].shift.call(arguments)
  // 3. 取出props
  const args = arguments
  // 4. 调用构造函数做初始化，并将this指向新创建的空对象
  Constructor.apply(obj, args)
  // 5. 新创建对象的内置原型指向构造函数原型对象
  obj.__proto__ = Constructor.prototype
  return obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}

// 检测是否继承成功，在Person原型上定义一个函数
Person.prototype.sayMyName = function () {
  console.log(this.name)
}

const person = newFunc(Person, 'test', 18)

// 测试是否继承成功
person.sayMyName()
