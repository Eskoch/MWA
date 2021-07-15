angular.module('meanHam').directive('hamsNavigation', hamsNavigation)

function hamsNavigation() {
    return {
        restrict: "E",
        templateUrl: 'angularApp/navigationDirective/navigation.html'
    };
}