var app = angular.module("dashboard", []);
app.controller("dashboard-controller", ["$scope", function ($scope) {
    $scope.msg = "Route"
    $scope.data = [{ "Id": "1", "Name": "Ajay" }, { "Id": "1", "Name": "Ajay" }, { "Id": "1", "Name": "Ajay" }, { "Id": "1", "Name": "Ajay" }];
    $scope.columns = [{ "name": "Id", "label": "Id" }, { "name": "Name", "label": "Name" }]
}])