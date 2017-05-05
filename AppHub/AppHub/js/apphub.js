var app = angular.module("apphub", ["ngRoute", "directive-factory", "service-factory", "dashboard"]);
var router = null;
app.config(function ($routeProvider) {
    router = $routeProvider;
});
app.run(function ($rootScope, $server) {
    router
    .when("/", {
        templateUrl: $server.getPath() + "/AppHub/templates/dashboard.html",
        controller: "dashboard-controller"
    })
});
app.controller("apphub-controller", ["$scope", function ($scope) {
    $scope.applicationName = "AppHub";
}])