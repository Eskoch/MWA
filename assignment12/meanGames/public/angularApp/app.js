angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "./angularApp/welcome/welcome.html",
        access: {restricted: false}
    }).when("/games", { 
        templateUrl: "./angularApp/getAllGames/gameList.html",
        controller: "getAllGamesController",
        controllerAs: "getAllCtrl",
        access: {restricted: false}
    }).when("/games/:gameId",{
        templateUrl: "./angularApp/getOneGame/game.html",
        controller: "getOneGameController",
        controllerAs: "getOneCtrl",
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

function run($rootScope, $location, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute) {
        if(nextRoute.access != undifined 
            && nextRoute.access.restricted 
            && !AuthFactory.auth) {
            event.preventDefault();
            $location.path("/");
        }
    })
};