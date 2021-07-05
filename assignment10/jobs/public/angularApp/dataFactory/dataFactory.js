angular.module("meanJobs").factory("jobsFactory", jobsFactory);
function jobsFactory($http) {
    return {
        getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        addOneJob: addOneJob,
        deleteJob: deleteJob,
        searchJob: searchJob,
        updateJob: updateJob
    };
    function getAllJobs(off) {
        return $http.get("/api/jobs?offset="+off).then(complete).catch(failed);
    };
    function getOneJob(jobId) {
        return $http.get("/api/jobs/"+jobId).then(complete).catch(failed)
    };
    function addOneJob(job) {
        return $http.post("/api/jobs/", job).then(complete).catch(failed);
    };
    function deleteJob(jobId) {
        return $http.delete("/api/jobs/"+jobId).then(complete).catch(failed);
    };
    function searchJob(key) {
        console.log("serching " + key);
        return $http.get("/api/jobs/search/"+key).then(complete).catch(failed);
    };
    function updateJob(jobId, updatedJob) {
        return $http.put("/api/jobs/"+jobId, updatedJob).then(complete).catch(failed);
    };

    function complete(response) {
        return response.data;
    };
    function failed(error) {
        return error.statusText;
    };
}