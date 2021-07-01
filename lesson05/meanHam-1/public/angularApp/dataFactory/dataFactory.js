angular.module("meanHam").factory("hamFactory", hamFactory);
function hamFactory($http) {
    return {
        getAllModes: getAllModes,
        getOneMode: getOneMode
    };
    function getAllModes() {
        return $http.get("/api/hams").then(complete).catch(failed);
    };
    function getOneMode(modeId) {
        return $http.get("/api/hams/"+modeId).then(complete).catch(failed)
    };

    function complete(response) {
        return response.data;
    };
    function failed(error) {
        return error.statusText;
    };
}