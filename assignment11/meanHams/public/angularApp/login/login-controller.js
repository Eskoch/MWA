angular.module("meanHam").controller("LoginController", LoginController);

function LoginController(UsersDataFactory, AuthFactory, $window, jwtHelper, $location) {
    this.isLoggedIn = function () {
        return AuthFactory.auth;
    };

    this.login = function () {
        if (this.username && this.password) {
            const user = {
                username: this.username,
                password: this.password
            }

            UsersDataFactory.login(user).then(function (result) {
                console.log("the user ", result);
                $window.sessionStorage.token = result.token;
                AuthFactory.auth = true;
                const token = $window.sessionStorage.token
                const decodedToken = jwtHelper.decodeToken(token);
                this.loggedinUser = decodedToken.name;
                this.username = "";
                this.password = "";
                $location.path("/")
            }).catch(function (error) {
                console.log("Error", error)
            })
        };
    };

    this.logout = function () {
        AuthFactory.auth = false;
        delete $window.sessionStorage.token;
        $location.path("/");
    };

    this.isActiveTab = function (url) {
        const currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }
}