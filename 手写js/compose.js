// task: 输出字符串的大写倒序字符串，我们把步骤分为以下四步

// 转大写字母
const toUpper = (str) => {
  return str.toUpperCase()
}

// 拆分字母
const splitWords = (str) => {
  return str.split('')
}

// 倒序数组
const reverseArr = (arr) => {
  return arr.reverse()
}

// 拼接字母输出字符串
const joinWords = (str) => {
  return str.join('')
}

let str = 'hello world'
// 1
str = toUpper(str)
// 2
str = splitWords(str)
// 3
str = reverseArr(str)
// 4
str = joinWords(str)

console.log('str: ', str)

// 使用compose函数将这个四个步骤连起来
// 思路：这些步骤函数是对同一target在不同阶段进行加工, 每一阶段需要返回当前步骤处理好的target供下一个阶段使用，并且顺序从右往左，先执行的放右边
// compose(fn1, fn2, fn3, fn4)(x) => fn1(fn2(fn3(fn4(x))))

function compose(...fnList) {
  return function () {
    // 借用reduceRight实现将每次函数执行返回的内容得到累加，传递给下一个步骤函数
    // [joinWords, reverseArr, splitWords, toUpper]
    return fnList.reduceRight((params, currFn) => {
      return currFn(params)
    }, ...arguments)
  }
}

console.log(
  'compose: ',
  compose(joinWords, reverseArr, splitWords, toUpper)('hello world')
)
