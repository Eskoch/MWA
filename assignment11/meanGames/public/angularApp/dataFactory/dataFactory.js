angular.module("meanGames").factory("gamesFactory", gamesFactory);
function gamesFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: addOneGame,
        deleteGame: deleteGame,
        searchGame: searchGame,
        updateGame: updateGame
    };
    function getAllGames(off, lat, lng, rad) {
        return $http.get("/api/games?offset="+off+"&lat="+lat+"&lng="+lng+"&rad="+rad).then(complete).catch(failed);
    };
    function getOneGame(gameId) {
        return $http.get("/api/games/"+gameId).then(complete).catch(failed)
    };
    function addOneGame(game) {
        return $http.post("/api/games/", game).then(complete).catch(failed);
    };
    function deleteGame(gameId) {
        return $http.delete("/api/games/"+gameId).then(complete).catch(failed);
    };
    function searchGame(key) {
        return $http.get("/api/games/search/"+key).then(complete).catch(failed);
    };
    function updateGame(gameId, updatedGame) {
        return $http.put("/api/games/"+gameId, updatedGame).then(complete).catch(failed);
    };

    function complete(response) {
        return response.data;
    };
    function failed(error) {
        return error.statusText;
    };
}