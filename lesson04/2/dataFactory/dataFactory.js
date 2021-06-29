angular.module("myProperApp").factory("apiFactory", apiFactory);
function apiFactory($http) {
    return {
        getApi: getApi,
        getTenJokes: getTenJokes,
        getOneJoke: getOneJoke
    };
    function getApi() {
        return $http.get("https://api.publicapis.org/entries?category=book&https=true")
        .then(complete).catch(failed);
    };
    function getTenJokes() {
        return $http.get("https://official-joke-api.appspot.com/jokes/ten")
        .then(returnJokes).catch(failed);
    };
    function getOneJoke(jokeType) {
        return $http.get("https://official-joke-api.appspot.com/jokes/"+jokeType+"/random")
        .then(returnJokes).catch(failed)
    };

    function returnJokes(response) {
        return response.data;
    };
    function complete(response) {
        return response.data.entries;
    };
    function failed(error) {
        return error.statusText;
    };
}