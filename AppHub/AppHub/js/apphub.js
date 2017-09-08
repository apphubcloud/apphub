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
    $scope.tabs = [];
    $scope.tabs.push({ "name": "home", "label": "Home", "path": "/" });
    $scope.tabs.push({ "name": "myApps", "label": "My Apps", "path": "/#MyApps" });
    $scope.tabs.push({ "name": "subscriptions", "label": "Subscriptions", "path": "/#Subscriptions" });
    $scope.tabs.push({ "name": "support", "label": "Support", "path": "/#Support" });
    $scope.tabs.push({ "name": "appMarket", "label": "App Market", "path": "/#AppMarket" });
}])