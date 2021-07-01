angular.module("meanHam").factory("hamFactory", hamFactory);
function hamFactory($http) {
    return {
        getAllModes: getAllModes,
        getOneMode: getOneMode,
        addOneMode: addOneMode,
        deleteMode: deleteMode
    };
    function getAllModes() {
        return $http.get("/api/hams").then(complete).catch(failed);
    };
    function getOneMode(modeId) {
        return $http.get("/api/hams/"+modeId).then(complete).catch(failed)
    };
    function addOneMode(ham) {
        return $http.post("/api/hams/", ham).then(complete).catch(failed)
    };
    function deleteMode(modeId) {
        return $http.delete("/api/hams/"+modeId).then(complete).catch(failed)
    };

    function complete(response) {
        return response.data;
    };
    function failed(error) {
        return error.statusText;
    };
}