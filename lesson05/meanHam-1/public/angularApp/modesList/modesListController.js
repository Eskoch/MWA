angular.module("meanHam").controller("hamsController", hamsController);
function hamsController($routeParams, hamFactory) {
    this.modeId = $routeParams.modeId;
    hamFactory.getAllModes().then(response => this.hams = response);
    hamFactory.getOneMode(this.modeId).then(response => this.ham = response);
}