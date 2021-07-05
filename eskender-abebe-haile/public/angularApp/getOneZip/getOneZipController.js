angular.module("meanZips").controller("getOneZipController", getOneZipController);
function getOneZipController($routeParams, zipsFactory, $location) {
    this.showEditForm = false;
    this.zipId = $routeParams.zipId;
    zipsFactory.getOneZip(this.zipId).then(response => this.zip = response);

    this.deleteZipFromInside = function() {
        console.log("from delete function" + this.zipId);
        zipsFactory.deleteZip(this.zipId).then(response => this.zip = response);
        $location.path("/");
    };

    this.updateZip = function() {
        console.log("From update zip function" + this.zip_id);
        
        const updatedZip = {
            city: this.city,
            zip: this.zip,
            pop: this.pop,
            state: this.state,
            loc: this.loc
        };
        console.log(updatedZip);
        if(this.zipForm.$valid) {
            zipsFactory.updateZip(this.zipId, updatedZip)
                        .then(response => console.log("Zip Updated Successfully!"))
                        .catch(error => console.log(error));
            $location.path("/");
        };
    }

    this.editZip = function() {
        this.showEditForm = !this.showEditForm;
    };

    this.backToHome = function() {
        $location.path("/");
    };
}