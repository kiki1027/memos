 function myInstanceof(left, right) {
   if (typeof right !== 'function') {
     throw new Error('Type Error')
   }

   const baseTypes = ['undefined', 'null', 'number', 'string', 'Symbol', 'BigInt']
   if (!left || baseTypes.includes(typeof left)) {
     return false
   }

   let leftProto = left.__proto__
   while (leftProto) {
     if (leftProto === right.prototype) {
       return true
     }
     leftProto = leftProto.__proto__
   }
   return false
 }

 // Test case
 console.log('// Object')
 let obj = {
   a: 1,
   b: 2
 }
 console.log(obj instanceof Object)
 console.log(myInstanceof(obj, Object))

 console.log('// Date')
 obj = new Date()
 console.log(obj instanceof Object)
 console.log(myInstanceof(obj, Object))

 console.log('// Function')
 obj = function() {}
 console.log(obj instanceof Object)
 console.log(myInstanceof(obj, Object))

 console.log('// Array')
 obj = []
 console.log(obj instanceof Object)
 console.log(myInstanceof(obj, Object))

 console.log('// null')
 console.log(null instanceof Object)
 console.log(myInstanceof(null, Object))
