angular.module("meanHam").factory("usersDataFactory", usersDataFactory);

function usersDataFactory($http) {
    return {
        login: getOneUser,
        register: addOneUser,
    }

    function getOneUser(user) {
        console.log(user)
        return $http.post("/api/users/login/", user)
            .then(complete)
            .catch(failed)
    }

    function addOneUser(user) {
        return $http.post("/api/users/", user)
            .then(complete)
            .catch(failed)
    }

    function complete(response) {
        console.log("From user factory " + response);
        return response.data;
    }

    function failed(error) {
        console.log("User factory error occured " + error);
        console.log(error);
        return error.status.statusText;
    }
}