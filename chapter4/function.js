const num = 1;
const num2 = 2;

// 정의
// 함수도 object이고, ref값을 저장함
function add(a, b) {
  return a + b;
}

// 선언
const sum = add(num, num2);
console.log(sum);

// doSomething은 add의 ref값을 가져온다.
const doSomething = add;
const result = doSomething(2, 3);
const result2 = add(2, 3);
console.log(result);
console.log(result2);

function print(name) {
  console.log(name);
}

print('sese');

function divide(num1, num2) {
  return num1 / num2;
}
function surprise(callback) {
  const result = callback(2, 3); // divide(2, 3);
  console.log(result);
}
surprise(divide); // 함수의 ref를 전달한다!

// 이거징
function surprise2(callback) {
  const result = callback();
  console.log(result);
}

surprise2(() => add(1, 2));
