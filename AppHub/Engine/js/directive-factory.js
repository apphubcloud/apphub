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
            readonly: '@',
            options: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-field.html",
        controller: ["$scope", "$element", "$compile", function ($scope, $element, $compile) {
            switch ($scope.type) {
                case "string":
                    $element.find('.fieldContainer').html($compile('<app-input-text placeholder="placeholder" value="value"></app-input-text>')($scope));
                    break;
                case "textarea":
                    $element.find('.fieldContainer').html($compile('<app-input-textarea placeholder="placeholder" value="value"></app-input-textarea>')($scope));
                    break;
                case "picklist":
                    $element.find('.fieldContainer').html($compile('<app-input-select placeholder="placeholder" value="value" options="options"></app-input-select>')($scope));
                    break;
                case "multipicklist":
                    $element.find('.fieldContainer').html($compile('<app-input-multiselect placeholder="placeholder" value="value" options="options"></app-input-multiselect>')($scope));
                    break;
                case "date":
                    $element.find('.fieldContainer').html($compile('<app-input-date placeholder="placeholder" value="value"></app-input-date>')($scope));
                    break;
                case "time":
                    $element.find('.fieldContainer').html($compile('<app-input-time placeholder="placeholder" value="value"></app-input-time>')($scope));
                    break;
                case "datetime":
                    $element.find('.fieldContainer').html($compile('<app-input-datetime placeholder="placeholder" value="value"></app-input-datetime>')($scope));
                    break;
                case "reference":
                    $element.find('.fieldContainer').html($compile('<app-input-reference placeholder="placeholder" value="value" records="records"></app-input-reference>')($scope));
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
app.directive("appInputTextarea", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-textarea.html"
    };
});
app.directive("appInputSelect", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '=',
            options: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-select.html"
    };
});
app.directive("appInputMultiselect", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '=',
            options: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-multiselect.html",
        controller: ["$scope","$element", function ($scope, $element) {
            $scope.initOptions = function () {
                if ($scope.value) {
                    $scope.selectedOptions = $scope.value.split(";");
                    $scope.filteredOptions = angular.copy($scope.options);
                    angular.forEach($scope.selectedOptions, function (option) {
                        $scope.filteredOptions.splice($scope.filteredOptions.indexOf(option), 1);
                    })
                } else {
                    $scope.selectedOptions = [];
                    $scope.filteredOptions = angular.copy($scope.options);
                }
            }
            $scope.pushPill = function (pill) {
                $scope.selectedOptions.push(pill);
                $scope.filteredOptions.splice($scope.filteredOptions.indexOf(pill), 1);
                $scope.value = $scope.selectedOptions.join(";");
            }
            $scope.popPill = function (pill) {
                $scope.selectedOptions.splice($scope.selectedOptions.indexOf(pill), 1);
                $scope.filteredOptions.push(pill);
                $scope.value = $scope.selectedOptions.join(";");
            }
            $scope.getOptions = function () {
                $scope.show = true;
            }
            $(document).click(function (evt) {
                if ($element.find(evt.target).length==0) {
                    $scope.show = false;
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                }
            })
            $scope.initOptions();
        }]
    };
});
app.directive("appInputDate", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-date.html",
        controller: ["$scope", "$element", function ($scope, $element) {

        }]
    };
});
app.directive("appInputTime", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-time.html"
    };
});
app.directive("appInputDatetime", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-datetime.html"
    };
});
app.directive("appInputReference", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-reference.html"
    };
});