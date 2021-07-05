angular.module("meanHam").controller("hamsController", hamsController);
function hamsController($routeParams, hamFactory, $location) {
    this.modeId = $routeParams.modeId;
    hamFactory.getAllModes().then(response => this.hams = response);
    hamFactory.getOneMode(this.modeId).then(response => this.ham = response);

    this.deleteMode = function(id) {
        console.log("from delete function" + id);
        hamFactory.deleteMode(id).then(response => this.ham = response);
        $location.path("/");
    };

    this.deleteModeFromInside = function() {
        console.log("from delete function" + this.modeId);
        hamFactory.deleteMode(this.modeId).then(response => this.ham = response);
        $location.path("/");
    };
    
    this.addMode = function() {
        const newHamData = {
            name: this.newHamName,
            // type: this.newHamType,
            // contests: this.newHamContests
        };
        if(this.hamForm.$valid) {
            console.log(newHamData);
            hamFactory.addOneMode(newHamData)
                        .then(response => console.log("ham Saved Successfully! " + newHamData))
                        .catch(error => console.log(error));
        }
    };
}