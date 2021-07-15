angular.module("meanGames").controller("getOneGameController", getOneGameController);
function getOneGameController($routeParams, gamesFactory, $location, AuthFactory) {
    this.showEditForm = false;
    this.gameId = $routeParams.gameId;
    gamesFactory.getOneGame(this.gameId).then(response => this.game = response);

    // check login status
    this.isLoggedIn = function() {
        return AuthFactory.auth;
    };

    this.deleteGameFromInside = function() {
        console.log("from delete function" + this.gameId);
        gamesFactory.deleteGame(this.gameId).then(response => this.game = response);
        $location.path("/games");
    };

    this.updateGame = function() {
        console.log("From update game function" + this.game_id);
        
        const updatedGame = {
            title: this.gameTitle,
            price: this.gamePrice,
            rate: this.gameRating,
            year: this.gameYear,
            rating: this.gameRating,
            minPlayers: this.gameMinPlayers,
            maxPlayers: this.gameMaxPlayers,
            minAge: this.gameMinAge,
            designers: this.gameDesigner,
        };
        console.log(updatedGame);
        if(this.gameForm.$valid) {
            gamesFactory.updateGame(this.gameId, updatedGame)
                        .then(response => console.log("Game Updated Successfully!"))
                        .catch(error => console.log(error));
            $location.path("/");
        };
    }

    this.editGame = function() {
        this.showEditForm = !this.showEditForm;
    };

    this.backToHome = function() {
        $location.path("/games");
    };
}