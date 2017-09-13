var app = angular.module("service-factory", []);
app.service("$server", function () {
    this.getPath = function () {
        return location.origin;
    }
})
app.service("$utils", ["$rootScope", "$compile", function ($scope, $compile) {
    this.showProcessing = function () {
        $('body').append($compile("<app-spinner></app-spinner>")($scope));
    }
    this.hideProcessing = function () {
        $('app-spinner').remove();
    }
    this.showInfo = function (messege) {
        $('body').append($compile('<app-toaster type="info" messege="' + messege + '"></app-toaster>')($scope));
    }
    this.showSuccess = function (messege) {
        $('body').append($compile('<app-toaster type="success" messege="' + messege + '"></app-toaster>')($scope));
    }
    this.showError = function (messege) {
        $('body').append($compile('<app-toaster type="error" messege="' + messege + '"></app-toaster>')($scope));
    }
    this.showWarning = function (messege) {
        $('body').append($compile('<app-toaster type="warning" messege="' + messege + '"></app-toaster>')($scope));
    }
}])