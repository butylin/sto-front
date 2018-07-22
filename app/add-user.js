/**
 * Created by serg on 17-Jul-18.
 */
var app = angular.module('add-user-app', []);
app.controller('add-user', function ($scope, $http) {
    $scope.addUser = function () {
        //alert($scope.user);
        var user = $scope.user;
        var response =  $http.post('http://localhost:8080/add', user);
        response.success(function(data, status, headers, config) {
            $scope.msg = data;
        });
        response.error(function(data, status, headers, config) {
            $scope.msg = data;
        });
    }
});
