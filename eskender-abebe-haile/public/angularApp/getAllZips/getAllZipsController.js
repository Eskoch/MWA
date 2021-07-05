angular.module("meanZips").controller("getAllZipsController", getAllZipsController);
function getAllZipsController($routeParams, zipsFactory, $location) {
    this.zipId = $routeParams.zipId;
    // Get all zips
    zipsFactory.getAllZips(this.offset).then(response => this.zips = response);   
    // Delete Zip
    this.deleteZip = function(id) {
        console.log("from delete function" + id);
        zipsFactory.deleteZip(id).then(response => this.zip = response);
        $location.path("/");
    };
    // Search Zip by City
    this.searchZip = function() {
        console.log("From city search function" + this.key);
        zipsFactory.searchZip(this.key).then(response => this.zips = response);
        this.key = "";
        $location.path("/");
    };
    // Search by location
    this.lat = $routeParams.lat ? $routeParams.lat : 0;
    this.lng = $routeParams.lat ? $routeParams.lng : 0;
    this.rad = $routeParams.lat ? $routeParams.rad : 0;
    this.searchByLocation = function() {
        console.log("From location search function lat, " + this.lat + " lng, " + this.lng + " rad, " + this.rad);
        zipsFactory.searchByLocation(this.lat, this.lng, this.rad).then(response => this.zips = response);
    };

    // Pagination
    this.offset = $routeParams.offset ? $routeParams.offset : 0;
    this.nextPage = function() {
        this.offset += 10;
        console.log("next page loading...");
        zipsFactory.getAllZips(this.offset).then(response => this.zips = response);
    };
    this.previousPage = function() {
        this.offset -= 10;
        console.log("next page loading...");
        zipsFactory.getAllZips(this.offset).then(response => this.zips = response);
    };
    // Add Zip
    this.addZip = function() {
        const loc = this.loc.split(",");
        const newZipData = {
            city: this.city,
            zip: this.zip,
            pop: this.pop,
            state: this.state,
            loc: loc,
        };
        if(this.zipForm.$valid) {
            zipsFactory.addOneZip(newZipData)
                        .then(response => console.log("Zip Saved Successfully!"))
                        .catch(error => console.log(error));
        };
    };
};