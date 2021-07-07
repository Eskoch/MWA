angular.module("meanGames").controller("getAllGamesController", getAllGamesController);
function getAllGamesController($routeParams, gamesFactory, $location, AuthFactory) {
    // check login status
    this.isLoggedIn = function() {
        return AuthFactory.auth;
    };
    this.gameId = $routeParams.gameId;
    // Get all games
    gamesFactory.getAllGames(this.offset).then(response => this.games = response);   
    // Delete Game
    this.deleteGame = function(id) {
        console.log("from delete function" + id);
        gamesFactory.deleteGame(id).then(response => this.game = response);
        $location.path("/");
    };
    // Search Game
    this.searchGame = function() {
        console.log("from search function" + this.key);
        gamesFactory.searchGame(this.key).then(response => this.games = response);
        $location.path("/games");
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
    // Add Game
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