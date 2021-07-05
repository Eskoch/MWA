angular.module("meanJobs").controller("getAllJobsController", getAllJobsController);
function getAllJobsController($routeParams, jobsFactory, $location) {
    this.jobId = $routeParams.jobId;
    // Get all jobs
    console.log("getAllJobsController");
    jobsFactory.getAllJobs().then(response => this.jobs = response);   
    // Delete Job
    this.deleteJob = function(id) {
        console.log("from delete function" + id);
        jobsFactory.deleteJob(id).then(response => this.job = response);
        $location.path("/");
    };
    // Search Job
    this.searchJob = function() {
        console.log("from search function" + this.key);
        jobsFactory.searchJob(this.key).then(response => this.jobs = response);
        this.key = "";
        $location.path("/");
    };
    this.offset = $routeParams.offset ? $routeParams.offset : 0;
    this.nextPage = function() {
        this.offset += 10;
        console.log("next page loading...");
        jobsFactory.getAllJobs(this.offset).then(response => this.jobs = response);
    };
    this.previousPage = function() {
        this.offset -= 10;
        console.log("next page loading...");
        jobsFactory.getAllJobs(this.offset).then(response => this.jobs = response);
    };
    // Add Job
    this.addJob = function() {
        const newJobData = {
            title: this.newJobTitle,
            salary: this.newJobSalary,
            location: this.newJobLocation,
            description: this.newJobDescription,
            experience: this.newJobExperience,
            skills: this.newJobMinSkills,
            postDate: this.newJobMaxPostDate,
        };
        if(this.jobForm.$valid) {
            jobsFactory.addOneJob(newJobData)
                        .then(response => console.log("Job Saved Successfully!"))
                        .catch(error => console.log(error));
        };
    };
};