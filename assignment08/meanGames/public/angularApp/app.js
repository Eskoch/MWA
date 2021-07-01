angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/gameList/gameList.html",
        controller: "gamesController",
        controllerAs: "gc"
    }).when("/games/:gameId",{
        templateUrl: "./angularApp/gameList/game.html",
        controller: "gamesController",
        controllerAs: "gc"
    })
}