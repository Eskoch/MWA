angular.module("meanGames", ["ngRoute"]).config(config).run(run);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/getAllGames/gameList.html",
        controller: "getAllGamesController",
        controllerAs: "getAllCtrl",
        access: {restricted: false}
    }).when("/games/:gameId",{
        templateUrl: "./angularApp/getOneGame/game.html",
        controller: "getOneGameController",
        controllerAs: "getOneCtrl"
    });
}

// function run($rootScope, $location, AuthFactory) {
//     $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
//         if(nextRoute.access != undifined && nextRoute.access.restricted 
//             && !AuthFactory.auth) {
//             event.preventDefault();
//             $location.path("/");
//         }
//     })
// };