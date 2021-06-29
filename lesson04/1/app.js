angular.module("myProperApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "./main/main.html",
        controller: "mainController",
        controllerAs: "mainCtrl"
    }).when("/about", {
        templateUrl: "./about/about.html",
        controller: "aboutController",
        controllerAs: "aboutCtrl"
    }).when("/joke", {
        templateUrl: "./joke/joke.html",
        controller: "jokeController",
        controllerAs: "jokeCtrl"
    }).otherwise({
        redirectTo: "/"
    });
}