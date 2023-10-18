// number, string, boolean, null, undefined

// object :: 얕은복사
let obj = {
  name: 'sese',
  age: 30,
};
let obj2 = obj;
obj2.age = 31;

console.log(Object.entries(obj));
console.log(Object.entries(obj2));
