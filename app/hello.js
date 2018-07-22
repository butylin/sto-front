angular.module('demo', [])
    .controller('Hello', function($scope, $http) {
        $http.get('http://localhost:8080/userlist').
        then(function(response) {
            $scope.userlist = response.data;
        });
    });