angular.module("meanHam", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "./angularApp/welcome/welcome.html",
        access: {restricted: false}
    }).when("/hams", { 
        templateUrl: "./angularApp/modesList/modesList.html",
        controller: "hamsController",
        controllerAs: "gc",
        access: {restricted: false}
    }).when("/hams/:modeId",{
        templateUrl: "./angularApp/modesList/mode.html",
        controller: "hamsController",
        controllerAs: "gc",
        access: {restricted: false}
    }).when("/register", {
        templateUrl: "angularApp/register/register.html",
        controller: "registerController",
        controllerAs: "uc",
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