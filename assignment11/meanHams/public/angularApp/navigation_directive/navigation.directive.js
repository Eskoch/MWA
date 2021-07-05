angular.module('meanHam').directive('hamNavigation', hamNavigation)

function hamNavigation() {
    return {
        restrict: "E",
        templateUrl: 'angularApp/navigation_directive/navigation.html'
    };
}