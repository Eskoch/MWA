angular.module("meanLaureates").controller("getOneLaureateController", getOneLaureateController);
function getOneLaureateController($routeParams, laureatesFactory, $location) {
    this.laureateId = $routeParams.laureateId;
    laureatesFactory.getOneLaureate(this.laureateId).then(response => this.laureate = response);

    this.deleteLaureateFromInside = function() {
        console.log("from delete function" + this.laureateId);
        laureatesFactory.deleteLaureate(this.laureateId).then(response => this.laureate = response);
        $location.path("/");
    };

    this.editLaureate = function() {
        console.log("from edit laureate function " + this.laureate_id);
        
        const updatedLaureate = {
            firstname: this.firstname, 
            surname: this.surname,
            affiliation: this.affiliation, 
            category: this.category, 
            bornCountry: this.bornCountry, 
            motivation: this.motivation, 
            gender: this.gender
        };
        console.log(updatedLaureate);
        if(this.laureateForm.$valid) {
            laureatesFactory.updateLaureate(this.laureateId, updatedLaureate)
                        .then(response => console.log("Laureate Updated Successfully!"))
                        .catch(error => console.log(error));
            $location.path("/");
        };
    }

    this.backToHome = function() {
        $location.path("/");
    };
}