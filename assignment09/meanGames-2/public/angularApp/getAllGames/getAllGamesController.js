angular.module("meanGames").controller("getAllGamesController", getAllGamesController);
function getAllGamesController($routeParams, gamesFactory, $location) {
    this.gameId = $routeParams.gameId;
    gamesFactory.getAllGames().then(response => this.games = response);   
    
    this.deleteGame = function(id) {
        console.log("from delete function" + id);
        gamesFactory.deleteGame(id).then(response => this.game = response);
        $location.path("/");
    };
    
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