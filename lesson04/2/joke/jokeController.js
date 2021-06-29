angular.module("myProperApp").controller("jokeTypeController", jokeTypeController);
function jokeTypeController($routeParams, apiFactory) {
    const vm = this;
    const jokeType = $routeParams.jokeType;
    vm.jokeT = jokeType;
    
    apiFactory.getTenJokes().then(response => vm.jokes = response);
    apiFactory.getOneJoke(jokeType).then(response => vm.joke = response[0]);
}