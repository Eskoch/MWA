angular.module("myProperApp").factory("apiFactory", apiFactory);
function apiFactory($http) {
    return {
        getApi: getApi
    };
    function getApi() {
        return $http.get("https://api.publicapis.org/entries?category=book&https=true")
        .then(complete).catch(failed);
    };
    function complete(response) {
        return response.data.entries;
    }
    function failed(error) {
        return error.statusText;
    };
}