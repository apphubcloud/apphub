var app = angular.module("service-factory", []);
app.service("$server", function () {
    this.getPath = function () {
        return location.origin;
    }
})