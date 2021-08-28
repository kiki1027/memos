function Parent(name, age) {
  this.name = name;
  this.age = age;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};
Parent.prototype.updateName = function (name) {
  this.name = name;
};

function Child() {
  Parent.apply(this, Array.from(arguments));
}

Child.prototype = Parent.prototype;

Child.prototype.getName = function () {
  console.log(111);
};

var child = new Child("Mike", 18);
var child2 = new Child("Mike2", 18);
var parent = new Parent("Mike3");
// var child = new Child("Mike");
// var child2 = new Child("Alice");
child2.getName();
parent.getName();
console.log(child, child2);
