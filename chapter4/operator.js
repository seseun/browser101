// false: 0, -0, '', null, undefined, NaN
// true: -1, 'hello', 'false'
let num; // undefined
let obj;
if (num) {
  console.log('true');
}
num && console.log(num);
console.log(obj?.name); // ?.는 crash를 막죠
