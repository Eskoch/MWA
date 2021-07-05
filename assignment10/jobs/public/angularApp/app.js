angular.module("meanJobs", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", { 
        templateUrl: "./angularApp/getAllJobs/jobList.html",
        controller: "getAllJobsController",
        controllerAs: "getAllCtrl",
        access: {restricted: false}
    }).when("/jobs/:jobId",{
        templateUrl: "./angularApp/getOneJob/job.html",
        controller: "getOneJobController",
        controllerAs: "getOneCtrl"
    });
}
