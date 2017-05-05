var app = angular.module("directive-factory", ["service-factory"]);
app.directive("appHeader", function ($server) {
    return {
        scope:{
            appName:"="
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-header.html"
    };
});
app.directive("appFooter", function ($server) {
    return {
        templateUrl: $server.getPath() + "/Engine/templates/app-footer.html"
    };
});
app.directive("appFieldValidator", function ($server) {
    return {
        scope:{
            required: '=',
            type: '=',
            value: '=',
            valid: '=',
            dirty: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-field-validator.html",
        controller: ["$scope", function ($scope) {
            $scope.$watch('value', function () {
                if ($scope.value) {
                    $scope.dirty = true;
                }
                $scope.validate();
            })
            $scope.validate = function () {
                if ($scope.required && !$scope.validateRequired()) {
                    $scope.valid = false;
                    $scope.errorMessege = 'This field is required.'
                } else {
                    $scope.valid = true;
                    $scope.errorMessege = "";
                }
            }
            $scope.validateRequired = function () {
                if ($scope.value == "" || $scope.value == undefined) {
                    return false;
                } else {
                    return true;
                }
            }
        }]
    };
});
app.directive("appInputField", function ($server) {
    return {
        scope: {
            type: '@',
            label: '@',
            placeholder: '@',
            value: '=',
            required: '@',
            maxlength: '@',
            disabled: '@',
            readonly: '@'
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-field.html",
        controller: ["$scope", "$element", "$compile", function ($scope, $element, $compile) {
            switch ($scope.type) {
                case "string":
                    $element.find('.fieldContainer').html($compile('<app-input-text placeholder="placeholder" value="value"></app-input-text>')($scope));
                    break;
            }
        }]
    };
});
app.directive("appInputText", function ($server) {
    return {
        scope:{
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-text.html"
    };
});