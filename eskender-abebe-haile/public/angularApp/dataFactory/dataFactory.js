angular.module("meanZips").factory("zipsFactory", zipsFactory);
function zipsFactory($http) {
    return {
        getAllZips: getAllZips,
        getOneZip: getOneZip,
        addOneZip: addOneZip,
        deleteZip: deleteZip,
        searchZip: searchZip,
        updateZip: updateZip,
        searchByLocation: searchByLocation
    };   
    function getAllZips(off) {
        return $http.get("/api/zips?offset="+off).then(complete).catch(failed);
    };
    function searchByLocation(lat, lng, rad) {
        console.log(lat, lng, rad);
        return $http.get("/api/zips?lat="+lat+"&lng="+lng+"&rad="+rad).then(complete).catch(failed);
    };
    function getOneZip(zipId) {
        return $http.get("/api/zips/"+zipId).then(complete).catch(failed)
    };
    function addOneZip(zip) {
        return $http.post("/api/zips/", zip).then(complete).catch(failed);
    };
    function deleteZip(zipId) {
        return $http.delete("/api/zips/"+zipId).then(complete).catch(failed);
    };
    function searchZip(key) {
        return $http.get("/api/zips/search/"+key).then(complete).catch(failed);
    };
    function updateZip(zipId, updatedZip) {
        return $http.put("/api/zips/"+zipId, updatedZip).then(complete).catch(failed);
    };

    function complete(response) {
        return response.data;
    };
    function failed(error) {
        return error.statusText;
    };
}