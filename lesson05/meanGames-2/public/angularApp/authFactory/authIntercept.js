angular.module("meanGames").factory("authoIntercepter", authoIntercepter) 

function authoIntercepter($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push("authoIntercepter");
    return {
        request: request 
    }

    function request(config, $window) {
        config.headers = config.headers || {};
        if($window.sessionStorage.token) {
            config.headers.Authorization = "Bearer " + $window.sessionStorage.token;
        }
        return config;
    };
    // function response(response) {
    //     if(response.status === 200 && $window.sessionStorage.token 
    //         && !authFactory.auth) {

    //         }
    // }
}