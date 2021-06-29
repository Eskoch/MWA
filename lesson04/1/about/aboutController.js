angular.module("myProperApp").controller("aboutController", aboutController);
function aboutController() {
    const vm = this;
    vm.about = "This is bio...";
}