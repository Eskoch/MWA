angular.module("meanJobs").controller("getOneJobController", getOneJobController);
function getOneJobController($routeParams, jobsFactory, $location) {
    this.jobId = $routeParams.jobId;
    jobsFactory.getOneJob(this.jobId).then(response => this.job = response);

    this.deleteJobFromInside = function() {
        console.log("from delete function" + this.jobId);
        jobsFactory.deleteJob(this.jobId).then(response => this.job = response);
        $location.path("/");
    };

    this.editJob = function() {
        console.log("from edit job function" + this.job_id);
        
        const updatedJob = {
            title: this.title,
            salary: this.salary,
            location: this.location,
            description: this.description,
            experience: this.experience,
            skills: this.skills,
            postDate: this.postDate
        };
        console.log(updatedJob);
        if(this.jobForm.$valid) {
            jobsFactory.updateJob(this.jobId, updatedJob)
                        .then(response => console.log("Job Updated Successfully!"))
                        .catch(error => console.log(error));
            $location.path("/");
        };
    }

    this.backToHome = function() {
        $location.path("/");
    };
}