class Counter {
  constructor(runEveryFiveTimes) {
    this.counter = 0;
    this.callback = runEveryFiveTimes;
  }
  increase() {
    this.counter++;
    if (this.callback && this.counter % 5 === 0) {
      this.callback(this.counter);
      return;
    }
    console.log(this.counter);
  }
}

const printCounter = new Counter(printSomething);
const alertCounter = new Counter(alertSomething);
function printSomething(num) {
  console.log('yo!', num);
}
function alertSomething(num) {
  alert('alert!', num);
}
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
alertCounter.increase();
