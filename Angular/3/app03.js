console.log("App start");

const delayMilliseconds = 20000;
const myCallback = function(number) {
    console.log("The number " + number  + " is odd");
}
const myFunction = function(number, myCallback) {
    console.log("This function my call ")
    if (number % 2) {
        myCallback(number);
    }
}
const randomNumber = Math.round(Math.random()*10);
myFunction(randomNumber, myCallback);
// const timeoutHolder = setTimeout(myCallback, delayMilliseconds);
// clearTimeout(timeoutHolder);
console.log("App End");

//chained callback => callback HELL
insertInAccount(amount, account, function(err, account) {
    // err checking 
    // else everthing good 
    getBalance(account, function(err, balance) {
        // error checking 
        // if everything is good return balance 
        if(balance > 200) {
            sendEmail(emailInfo, function(err) {
                if(!err) {
                    LogToFile("Email to Jack sent", function(err) {
                        if(err) {
                            console.log("Log to file error");
                        }
                    })
                }
            })
        }
        return balance;
    })
});

// better way to implement the above code and avoid the call back hell
afterLoggingToFile()
afterSendingEmail()
afterGettingBalance()
afterAccountUpdate()
OnInsertInAccount(amount, account, afterAccountUpdate)


mongoose.updateRecord(acount, amount, afterAccountUpdate);