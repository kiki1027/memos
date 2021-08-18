// Object.create() 支持创建一个对象，并接受一个参数作为该对象的原型对象
function myCreate(prototypeObj) {
  // 参数类型校验
  var isObject =
    typeof prototypeObj === "object" || typeof prototypeObj === "function";
  if (!isObject) {
    throw new TypeError(
      "Object prototype may only be an Object or null: " + prototypeObj
    );
  }
  // 过渡构造函数，用于实现原型继承
  var TempFunction = function () {};
  TempFunction.prototype = prototypeObj;
  // 返回生成的实例对象
  return new TempFunction();
}

// test case
function Parent() {
  this.name = "parentName";
}

// 在Parent的原型对象上创建一个getName方法，测试child是否可以继承到这个方法
Parent.prototype.getName = function () {
  console.log(this.name);
};

var parent = new Parent();
var child = myCreate(parent);
var child2 = Object.create(parent);
child.getName();
child2.getName();
