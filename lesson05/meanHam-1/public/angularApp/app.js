angular.module("meanHam", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/modesList/modesList.html",
        controller: "hamsController",
        controllerAs: "gc"
    }).when("/hams/:modeId",{
        templateUrl: "./angularApp/modesList/mode.html",
        controller: "hamsController",
        controllerAs: "gc"
    })
}