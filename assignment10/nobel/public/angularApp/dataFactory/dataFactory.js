angular.module("meanLaureates").factory("laureatesFactory", laureatesFactory);
function laureatesFactory($http) {
    return {
        getAllLaureates: getAllLaureates,
        getOneLaureate: getOneLaureate,
        addOneLaureate: addOneLaureate,
        deleteLaureate: deleteLaureate,
        searchLaureate: searchLaureate,
        updateLaureate: updateLaureate
    };
    function getAllLaureates(off) {
        return $http.get("/api/laureates?offset="+off).then(complete).catch(failed);
    };
    function getOneLaureate(laureateId) {
        return $http.get("/api/laureates/"+laureateId).then(complete).catch(failed)
    };
    function addOneLaureate(laureate) {
        return $http.post("/api/laureates/", laureate).then(complete).catch(failed);
    };
    function deleteLaureate(laureateId) {
        return $http.delete("/api/laureates/"+laureateId).then(complete).catch(failed);
    };
    function searchLaureate(key) {
        return $http.get("/api/laureates/search/"+key).then(complete).catch(failed);
    };
    function updateLaureate(laureateId, updatedLaureate) {
        return $http.put("/api/laureates/"+laureateId, updatedLaureate).then(complete).catch(failed);
    };

    function complete(response) {
        return response.data;
    };
    function failed(error) {
        return error.statusText;
    };
}