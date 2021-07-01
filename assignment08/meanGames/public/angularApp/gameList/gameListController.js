angular.module("meanGames").controller("gamesController", gamesController);
function gamesController($routeParams, gamesFactory) {
    this.title = "Mean Games App"
    this.gameId = $routeParams.gameId;
    gamesFactory.getAllGames().then(response => this.games = response);
    gamesFactory.getOneGame(this.gameId).then(response => this.game = response);
}