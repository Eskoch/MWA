angular.module("meanGames").controller("getOneGameController", getOneGameController);
function getOneGameController($routeParams, gamesFactory, $location) {
    this.gameId = $routeParams.gameId;
    gamesFactory.getOneGame(this.gameId).then(response => this.game = response);

    this.deleteGameFromInside = function() {
        console.log("from delete function" + this.gameId);
        gamesFactory.deleteGame(this.gameId).then(response => this.game = response);
        $location.path("/");
    };

    this.editGame = function() {
        console.log("from edit game function" + this.game_id);
        
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
            publisher: this.gamePublisher
        };
        console.log(updatedGame);
        if(this.gameForm.$valid) {
            gamesFactory.updateGame(this.gameId, updatedGame)
                        .then(response => console.log("Game Updated Successfully!"))
                        .catch(error => console.log(error));
            $location.path("/");
        };
    }

    this.backToHome = function() {
        $location.path("/");
    };
}