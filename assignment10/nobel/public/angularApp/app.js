angular.module("meanLaureates", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/getAllLaureates/laureateList.html",
        controller: "getAllLaureatesController",
        controllerAs: "getAllCtrl"
    }).when("/laureates/:laureateId",{
        templateUrl: "./angularApp/getOneLaureate/laureate.html",
        controller: "getOneLaureateController",
        controllerAs: "getOneCtrl"
    });
}
