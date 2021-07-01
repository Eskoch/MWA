angular.module("meanGames").factory("gamesFactory", gamesFactory);
function gamesFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame
    };
    function getAllGames() {
        return $http.get("/api/games").then(complete).catch(failed);
    };
    function getOneGame(gameId) {
        return $http.get("/api/games/"+gameId).then(complete).catch(failed)
    };

    function complete(response) {
        return response.data;
    };
    function failed(error) {
        return error.statusText;
    };
}