angular.module("meanHam").controller("RegisterController", RegisterController);

function RegisterController(UsersDataFactory) {
    this.register = function () {
        if(!this.username || !this.password || !this.passwordRepeat || !this.name) {
            this.err = "Fill all the fields"
        } else {
            if(this.password !== this.passwordRepeat) {
                this.err = "Username and password don't match"
            } else {
                const newUser = {
                    username: this.username,
                    password: this.password,
                    name: this.name
                }
                UsersDataFactory.register(newUser).then(function(result) {
                    console.log("registration successfull ");
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