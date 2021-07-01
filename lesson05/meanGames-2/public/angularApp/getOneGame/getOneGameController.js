angular.module("meanGames").controller("getOneGameController", getOneGameController);
function getOneGameController($routeParams, gamesFactory, $location) {
    this.gameId = $routeParams.gameId;
    gamesFactory.getOneGame(this.gameId).then(response => this.game = response);

    this.deleteGameFromInside = function() {
        console.log("from delete function" + this.gameId);
        gamesFactory.deleteGame(this.gameId).then(response => this.game = response);
        $location.path("/");
    };
}