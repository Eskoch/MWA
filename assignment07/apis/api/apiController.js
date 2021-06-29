angular.module("myProperApp").controller("apiController", apiController);

function apiController(apiFactory) {
    const vm = this;
    apiFactory.getApi().then(function(response) {
        vm.apis = response;
    });
}