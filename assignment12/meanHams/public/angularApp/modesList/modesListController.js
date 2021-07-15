angular.module("meanHam").controller("hamsController", hamsController);
function hamsController($routeParams, hamFactory, $location, AuthFactory) {
    this.modeId = $routeParams.modeId;
    hamFactory.getAllModes().then(response => this.hams = response);
    hamFactory.getOneMode(this.modeId).then(response => this.ham = response);

    this.isLoggedIn = function() {
        return AuthFactory.auth;
    }

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

    // Search mode 
    this.searchHam = function() {
        console.log("From ham search function " + this.key);
        hamFactory.searchHam(this.key).then(response => this.hams = response);
        this.key = "";
        $location.path("/hams");
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