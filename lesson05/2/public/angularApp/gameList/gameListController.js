angular.module("meanGames").controller("gamesController", gamesController);
function gamesController($routeParams, gamesFactory) {
    this.title = "Mean Games App";
    this.gameId = $routeParams.gameId;
    gamesFactory.getAllGames().then(response => this.games = response);
    gamesFactory.getOneGame(this.gameId).then(response => this.game = response);

    this.addGame = function() {
        const newGameData = {
            title: this.newGameTitle,
            price: this.newGamePrice,
            rate: this.newGameRating,
            year: this.newGameYear,
            rating: this.newGameRating,
            minPlayers: this.newGameMinPlayers,
            maxPlayers: this.newGameMaxPlayers,
            minAge: this.newGameMinAge,
            designers: this.newGameDesigner
        };
        if(this.gameForm.$valid) {
            gamesFactory.addOneGame(newGameData)
                        .then(response => console.log("Game Saved Successfully!"))
                        .catch(error => console.log(error));
        }
    };
    
}