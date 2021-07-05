angular.module("meanZips", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/getAllZips/zipList.html",
        controller: "getAllZipsController",
        controllerAs: "getAllCtrl"
    }).when("/zips/:zipId",{
        templateUrl: "./angularApp/getOneZip/zip.html",
        controller: "getOneZipController",
        controllerAs: "getOneCtrl"
    });
}
