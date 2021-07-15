angular.module('meanGames').directive('gamesNavigation', gamesNavigation)

function gamesNavigation() {
    return {
        restrict: "E",
        templateUrl: 'angularApp/navigationDirective/navigation.html'
    };
}