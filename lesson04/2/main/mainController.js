angular.module("myProperApp").controller("mainController", mainController);
function mainController($scope) {
    const vm = this;
    vm.name = "Eskoch";
    vm.number = 0;
    vm.students = [{name: "Jack", course:"MPP", gpa:3.0}, 
                        {name:"John", course:"MWA", gpa:2.5}, 
                        {name:"Jill", course:"SWE", gpa:3.3},
                        {name:"Jim", course:"MWA", gpa:2.8}];
    vm.increment = function(value) {
        vm.number = vm.number+value;
    };
    vm.decrement = function(value) {
        vm.number = vm.number-value;
    };
}