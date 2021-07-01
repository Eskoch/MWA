angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/getAllGames/gameList.html",
        controller: "getAllGamesController",
        controllerAs: "getAllCtrl"
    }).when("/games/:gameId",{
        templateUrl: "./angularApp/getOneGame/game.html",
        controller: "getOneGameController",
        controllerAs: "getOneCtrl"
    }).when("/games/addGame", {
        templateUrl: "./angularApp/getAllGames/gameList.html",
        controller: "getAllGamesController",
        controllerAs: "addCtrl"
    }).when("/games/deleteGame", {
        templateUrl: "./angularApp/getAllGames/gameList.html",
        controller: "getAllGamesController",
        controllerAs: "getAllCtrl"
    });
}