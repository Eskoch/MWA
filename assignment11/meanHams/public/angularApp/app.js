angular.module("meanHam", ["ngRoute", "angular-jwt"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/modesList/modesList.html",
        controller: "hamsController",
        controllerAs: "gc"
    }).when("/hams/:modeId",{
        templateUrl: "./angularApp/modesList/mode.html",
        controller: "hamsController",
        controllerAs: "gc"
    }).when("/register", {
        templateUrl:"angularApp/register/register.html",
        controller:"RegisterController",
        controllerAs:"vm",
        access: {restricted: false}
    }).when("/profile", {
        templateUrl:"angularApp/profile/profile.html",
        access: {restricted: true}
    }).otherwise({
        redirectTo: "/"
    })
}

function run($rootScope,  $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if(nextRoute.access !== undefined && 
            nextRoute.access.restricted && 
            !AuthFactory.auth && !$window.sessionStorage.token) { 
            event.preventDefault();
            $location.path("/");
        }
    })
}