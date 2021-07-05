angular.module("meanLaureates").controller("getAllLaureatesController", getAllLaureatesController);
function getAllLaureatesController($routeParams, laureatesFactory, $location) {
    console.log("getAllLaureatesController");
    this.laureateId = $routeParams.laureateId;
    // Get all laureates
    laureatesFactory.getAllLaureates(this.offset).then(response => this.laureates = response);   
    // Delete Laureate
    this.deleteLaureate = function(id) {
        console.log("from delete function" + id);
        laureatesFactory.deleteLaureate(id).then(response => this.laureate = response);
        $location.path("/");
    };
    // Search Laureate
    this.searchLaureate = function() {
        console.log("from search function" + this.key);
        laureatesFactory.searchLaureate(this.key).then(response => this.laureates = response);
        this.key = "";
        $location.path("/");
    };
    this.offset = $routeParams.offset ? $routeParams.offset : 0;
    this.nextPage = function() {
        this.offset += 10;
        console.log("next page loading...");
        laureatesFactory.getAllLaureates(this.offset).then(response => this.laureates = response);
    };
    this.previousPage = function() {
        this.offset -= 10;
        console.log("next page loading...");
        laureatesFactory.getAllLaureates(this.offset).then(response => this.laureates = response);
    };
    // Add Laureate
    this.addLaureate = function() {
        const newLaureateData = {
            firstname: req.body.firstname, 
            surname: req.body.surname,
            affiliation: req.body.affiliation, 
            category: req.body.category, 
            bornCountry: req.body.bornCountry, 
            motivation: req.body.motivation, 
            gender: req.body.gender 
        };
        if(this.laureateForm.$valid) {
            laureatesFactory.addOneLaureate(newLaureateData)
                        .then(response => console.log("Laureate Saved Successfully!"))
                        .catch(error => console.log(error));
        };
    };
};