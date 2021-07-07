// const promise1 = new Promise((resolve, reject) => resolve());
// const promise2 = new Promise((resolve, reject) => reject());
console.log("App start")
const insertPromise = new Promise((resolve, reject) => {
    let number = Math.random();
    setTimeout(function() {
        if(number > 0.5) {
            resolve("Promise1 " + number);
        } else {
            reject("Promise 1 failed");
        }
    }, 3000);
});
const insertPromise2 = new Promise((resolve, reject) => {
    let number = Math.random() + 0.5;
    setTimeout(function() {
        if(number > 0.5) {
            resolve("Promise2 " + number);
        } else {
            reject("Promise 2 failed");
        }
    }, 3000);
});
const insertPromise3 = new Promise((resolve, reject) => {
    let number = Math.random() - 0.5;
    setTimeout(function() {
        if(number > 0.5) {
            resolve("Promise3 " + number);
        } else {
            reject("Promise 3 failed");
        }
    }, 3000);
});

const handleError1 = function(err) {
    console.log("Error in insert promise ", err);
}
const printConfirmation = function(number) {
    console.log("Insert promise done " + number);
}
const getBalance = function() {
    console.log("Second call back done ");
}
const afterPrintConfirmation = function() {
    setTimeout(getBalance, 2000)
}

// insertPromise.then(printConfirmation).then(afterPrintConfirmation).catch(handleError1);

// Promise.all([insertPromise, insertPromise2, insertPromise3])
//         .then(printConfirmation)
//         .catch(handleError1);
Promise.race([insertPromise, insertPromise2, insertPromise3])
        .then(printConfirmation)
        .catch(handleError1);

function mySyncFun() {
    console.log("Starting SyncFun");
    const result1 = insertPromise;
    console.log(result1);
    const result2 = insertPromise2;
    console.log(result2);
    const result3 = insertPromise3;
    console.log(result3);
    console.log("End SyncFun");
}        
// async function mySyncFun() {
//     console.log("Starting SyncFun");
//     const result1 = await insertPromise;
//     console.log(result1);
//     const result2 = await insertPromise2;
//     console.log(result2);
//     const result3 = await insertPromise3;
//     console.log(result3);
//     console.log("End SyncFun");
// }        

mySyncFun();

console.log("App end")