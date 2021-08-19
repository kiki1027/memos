// 接收一个对象参数，计算所占内存字节数Bytes

// 为了避免循环引用导致的计算异常，我们将计算过的引用类型的值存放在一个Set，
// 再次遇见就跳过计算
const calculatedObject = new WeakSet();
// WeakSet相较于Set而言，WeakSet中存储的值都是弱引用，
// 即垃圾回收机制不会认为这里存在需要被保留的引用，内存也就可以被释放

function sizeOfObject(object) {
  if (object === null) {
    return 0;
  }

  if (Array.isArray(object)) {
    // 遍历数组，累加字节数
    return object.map(bytesCalculator).reduce((p, c) => {
      return p + c;
    }, 0);
  }

  // 思路：对象的key和value分别计算占用字节数，最后累加
  let bytes = 0;

  for (let [key, value] of Object.entries(object)) {
    if (typeof value === "object" && value !== null) {
      if (calculatedObject.has(value)) {
        // 已计算过的 value，跳过
        continue;
      }
      calculatedObject.add(value);
    }

    bytes += bytesCalculator(key);
    bytes += bytesCalculator(value);
  }

  return bytes;
}

function bytesCalculator(object) {
  const objectType = typeof object;

  switch (objectType) {
    case "string": {
      // 一个字符 = 2个字节
      return object.length * 2;
    }
    case "boolean": {
      // 一个布尔值 = 4个字节
      return 4;
    }
    case "number": {
      // 一个数值型 = 8个字节
      return 8;
    }
    case "object": {
      return sizeOfObject(object);
    }
    default:
      return 0;
  }
}

// 循环引用的栗子
const temp1 = {};
const temp2 = {};
temp1.a = temp2;
temp2.a = temp1;

console.log("temp1", bytesCalculator(temp1));
console.log("temp2", bytesCalculator(temp2));

const testData = {
  a: 123, // key:2 + value:8 = 10bytes
  b: "ABCD", // key:2 + value:(4 * 2 = 8) = 10bytes => 20
  12: true, // key:4 + value:4 = 8bytes => 28
};

console.log("testData", bytesCalculator(testData));
