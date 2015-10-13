var assiduNodeApp = angular.module('assiduNodeApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all persons and show them
    $http.get('http://localhost:8080/api/persons')
        .success(function(data) {
            $scope.persons = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createPerson = function() {
        $http.post('http://localhost:8080/api/persons', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.persons = data;
                console.log("createPerson in assidu-node.js - SUCCESS");
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a person after checking it
    $scope.deletePerson = function(id) {
        $http.delete('http://localhost:8080/api/persons/' + id)
            .success(function(data) {
                $scope.persons = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
