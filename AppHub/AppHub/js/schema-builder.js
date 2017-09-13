var app = angular.module("schema-builder", ["apphub-engine","service-factory"]);
app.controller("schema-builder-controller", ["$scope","$apphub-engine","$utils", function ($scope,$engine,$utils) {
    $scope.objects = [{"label":"New","icon":"utility:open_folder"}];
    $scope.init = function () {
        $utils.showProcessing();
        $engine.getAllObjects(function (response) {
            $scope.objects.concat(response);
            $utils.hideProcessing();
        }, function (error) {
            $utils.showError(error);
            $utils.hideProcessing();
        })
    }
    $scope.init();
}])