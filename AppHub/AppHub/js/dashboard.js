var app = angular.module("dashboard", ["engine"]);
app.controller("dashboard-controller", ["$scope","$engine", function ($scope,$engine) {
    $engine.test({ "testArgs": "Sweetu" }, function (reponse) {
        alert(response);
    }, function (error) {
        alert(error);
    })
}])