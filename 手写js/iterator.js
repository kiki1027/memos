/**
 * iterator 是 es6 为了统一不同集合数据结构有共同的访问机制而提出的迭代器接口
 * 内部使用 next 指针实现向后遍历
 */
function makeIterator(array) {
  let index = 0;
  return {
    next: function () {
      return index < array.length
        ? { value: array[index++], done: false }
        : { value: undefined, done: true };
    },
  };
}

var it = makeIterator([1, 2]);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
