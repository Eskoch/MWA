function fibonacci(number){
    if(number < 0) number *= -1;
    const fib = function(number) {
        if(number <= 2) {
            return 1;
        } else {
            return fib(number - 1) + fib(number - 2);
        }
    };
    return fib(number);
}

console.log("Fibonacci of 45 is " + fibonacci(45));
console.log("Fibonacci of 45 is " + fibonacci(25));
console.log("Fibonacci of 45 is " + fibonacci(17));
console.log("Fibonacci of 45 is " + fibonacci(-17));