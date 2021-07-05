angular.module("meanGames").controller("getAllGamesController", getAllGamesController);
function getAllGamesController($routeParams, gamesFactory, $location) {
    this.gameId = $routeParams.gameId;
    gamesFactory.getAllGames(this.offset).then(response => this.games = response);   
    
    this.deleteGame = function(id) {
        console.log("from delete function" + id);
        gamesFactory.deleteGame(id).then(response => this.game = response);
        $location.path("/");
    };

    this.searchGame = function() {
        console.log("from search function" + this.key);
        gamesFactory.searchGame(this.key).then(response => this.games = response);
        this.key = "";
        $location.path("/");
    };
    this.offset = $routeParams.offset ? $routeParams.offset : 0;
    this.nextPage = function() {
        this.offset += 10;
        console.log("next page loading...");
        gamesFactory.getAllGames(this.offset).then(response => this.games = response);
    };
    this.previousPage = function() {
        this.offset -= 10;
        console.log("next page loading...");
        gamesFactory.getAllGames(this.offset).then(response => this.games = response);
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
        };
    };
};