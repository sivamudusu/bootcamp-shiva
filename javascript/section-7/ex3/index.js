const { timeEnd } = require("console");

const fib = (n) => {
  if ((n == 0) | (n == 1)) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

console.time();
fib(10);
console.timeEnd();
