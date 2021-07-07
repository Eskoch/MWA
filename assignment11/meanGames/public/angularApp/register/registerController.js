angular.module("meanGames").controller("registerController", registerController);

function registerController(usersDataFactory) {
    this.register = function () {
        if(!this.username || !this.password || !this.passwordRepeat || !this.name) {
            this.err = "Fill all the fields"
        } else {
            if(this.password !== this.passwordRepeat) {
                this.err = "Username and password do NOT match"
            } else {
                const newUser = {
                    username: this.username,
                    password: this.password,
                    name: this.name
                }
                usersDataFactory.register(newUser).then(function(result) {
                    console.log("Registration successfull ");
                    this.message = "Successfull registration";
                    this.err = "";
                }).catch(function(error) {
                    console.log("error", error);
                    this.err = error;
                })
            }
        }
        
    }
}