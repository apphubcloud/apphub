var app = angular.module("directive-factory", ["service-factory"]);
app.directive("appHeader", function ($server) {
    return {
        scope:{
            name: "=",
            tabs: "="
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
                    $element.find('.fieldContainer').html($compile('<app-input-reference placeholder="placeholder" value="value" search="getReferenceData(keyword,onsuccess)"></app-input-reference>')($scope));
                    break;
            }
            $scope.getReferenceData = function (keyword, onsuccess) {
                $scope.data = [{ "label": "option1", "value": "option1" }, { "label": "option2", "value": "option2" }, { "label": "option3", "value": "option3" }, { "label": "option4", "value": "option4" }];
                setTimeout(function () {
                    var filteredData = $scope.data.filter(function (d) {
                        return d.label.toLowerCase().includes(keyword.toLowerCase());
                    })
                    onsuccess(filteredData);
                },5000)
                
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
            options: '=',
            change: '&'
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
app.directive("appDatepicker", function ($server) {
    return {
        scope: {
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-datepicker.html",
        controller: ["$scope", function ($scope) {
            $scope.$on('getPicker', function (event, args) {
                $scope.getPicker();
            });
            $scope.initPicker = function () {
                $scope.years = [];
                for (var i = 1950; i <= 2050; i++) {
                    $scope.years.push(i);
                }
                $scope.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
            }
            $scope.getPicker = function () {
                $scope.currentDate = $scope.parseDateValue();
                $scope.getCalenderData();
            }
            $scope.setMonth = function (m) {
                $scope.currentDate.setMonth(m);
                $scope.getCalenderData();
            }
            $scope.setYear = function (y) {
                $scope.currentDate.setYear(y);
                $scope.getCalenderData();
            }
            $scope.setDate = function (dt) {
                $scope.dateValue = $scope.getDoubles(dt.getFullYear()) + "-" + $scope.getDoubles(dt.getMonth() + 1) + "-" + $scope.getDoubles(dt.getDate());
                $scope.dateString = dt.toLocaleDateString();
                $scope.$emit('setDate', {"dateValue":$scope.dateValue,"dateString":$scope.dateString});
            }
            $scope.getCalenderData = function () {
                $scope.today = new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate());
                if ($scope.currentDate == undefined) {
                    $scope.currentDate = angular.copy($scope.today);
                }
                $scope.currentYear = $scope.currentDate.getFullYear();
                $scope.currentMonth = $scope.currentDate.getMonth() + 1;
                $scope.datePointer = new Date($scope.currentDate.getFullYear() + "-" + ($scope.currentDate.getMonth() + 1) + "-01");
                $scope.datePointer.setDate($scope.datePointer.getDate() - $scope.datePointer.getDay());
                $scope.data = [];
                $scope.week = [];
                while ($scope.datePointer.getMonth() != $scope.currentDate.getMonth()) {
                    $scope.week.push({ "label": $scope.datePointer.getDate(), "disabled": true });
                    $scope.datePointer.setDate($scope.datePointer.getDate() + 1);
                }
                while ($scope.datePointer.getMonth() == $scope.currentDate.getMonth()) {
                    $scope.week.push({ "label": $scope.datePointer.getDate(), "value": angular.copy($scope.datePointer), "today": $scope.datePointer.toLocaleDateString() == $scope.today.toLocaleDateString(), "selected": $scope.parseDateValue() ? $scope.datePointer.toLocaleDateString() == $scope.parseDateValue().toLocaleDateString() : false });
                    $scope.datePointer.setDate($scope.datePointer.getDate() + 1);
                    if ($scope.week.length == 7) {
                        $scope.data.push(angular.copy($scope.week));
                        $scope.week = [];
                    }
                }
                while ($scope.week.length < 7) {
                    $scope.week.push({ "label": $scope.datePointer.getDate(), "disabled": true });
                    $scope.datePointer.setDate($scope.datePointer.getDate() + 1);
                }
                $scope.data.push(angular.copy($scope.week));
            }
            $scope.parseDateValue = function () {
                if ($scope.dateValue) {
                    return new Date($scope.dateValue);
                } else {
                    return undefined;
                }
            }
            $scope.setToday = function () {
                $scope.setDate(new Date());
            }
            $scope.initPicker();
            $scope.getDoubles = function (no) {
                if (no < 10) {
                    return "0" + no;
                } else {
                    return no + "";
                }
            }
        }]
    };
});
app.directive("appTimepicker", function ($server) {
    return {
        scope: {
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-timepicker.html",
        controller: ["$scope", function ($scope) {
            $scope.$on('getPicker', function (event, args) {
                $scope.getPicker();
            });
            $scope.getPicker = function () {
                if ($scope.timeValue) {
                    $scope.hour = $scope.getDoubles(parseInt($scope.value.split(":")[0]));
                    $scope.min = $scope.getDoubles(parseInt($scope.value.split(":")[1]));
                    $scope.am = $scope.value.split(" ")[1];
                } else {
                    $scope.hour = $scope.getDoubles(12);
                    $scope.min = $scope.getDoubles(0);;
                    $scope.am = "AM";
                }
                $scope.setTime();
            }
            $scope.plusHour = function () {
                if (parseInt($scope.hour) == 12) {
                    $scope.hour = $scope.getDoubles(1);
                } else {
                    $scope.hour = $scope.getDoubles(parseInt($scope.hour) + 1);
                }
                $scope.setTime();
            }
            $scope.minusHour = function () {
                if (parseInt($scope.hour) == 1) {
                    $scope.hour = $scope.getDoubles(12);
                } else {
                    $scope.hour = $scope.getDoubles(parseInt($scope.hour) - 1);
                }
                $scope.setTime();
            }
            $scope.plusMinute = function () {
                if (parseInt($scope.min) == 59) {
                    $scope.min = $scope.getDoubles(0);
                } else {
                    $scope.min = $scope.getDoubles(parseInt($scope.min) + 1);
                }
                $scope.setTime();
            }
            $scope.minusMinute = function () {
                if (parseInt($scope.min) == 0) {
                    $scope.min = $scope.getDoubles(59);
                } else {
                    $scope.min = $scope.getDoubles(parseInt($scope.min) - 1);
                }
                $scope.setTime();
            }
            $scope.changeAM = function () {
                if ($scope.am == "AM") {
                    $scope.am = "PM";
                } else {
                    $scope.am = "AM";
                }
                $scope.setTime();
            }
            $scope.setTime = function () {
                $scope.timeValue = $scope.hour + ":" + $scope.min + " " + $scope.am;
                $scope.timeString = $scope.hour + ":" + $scope.min + " " + $scope.am;
                $scope.$emit('setTime', { "timeValue": $scope.timeValue, "timeString": $scope.timeString });
            }
            $scope.getDoubles = function (no) {
                if (no < 10) {
                    return "0" + no;
                } else {
                    return no + "";
                }
            }
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
            $scope.$on('setDate', function (event, args) {
                $scope.value = args.dateValue;
                $scope.dateString = args.dateString;
                $scope.show = false;
            });
            $scope.getPicker = function () {
                $scope.show = true;
                $scope.$broadcast('getPicker');
            }
            $(document).click(function (evt) {
                if ($element.find(evt.target).length == 0) {
                    $scope.show = false;
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                }
            })
        }]
    };
});
app.directive("appInputTime", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-time.html",
        controller: ["$scope", "$element", function ($scope, $element) {
            $scope.$on('setTime', function (event, args) {
                $scope.value = args.timeValue;
                $scope.timeString = args.timeString;
            });
            $scope.getPicker = function () {
                $scope.show = true;
                $scope.$broadcast('getPicker');
            }
            $(document).click(function (evt) {
                if ($element.find(evt.target).length == 0) {
                    $scope.show = false;
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                }
            })
        }]
    };
});
app.directive("appInputDatetime", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-datetime.html",
        controller: ["$scope", "$element", function ($scope, $element) {
            $scope.$on('setDate', function (event, args) {
                $scope.dateValue = args.dateValue;
                $scope.dateString = args.dateString;
                $scope.show = false;
                $scope.setDateTime();
            });
            $scope.$on('setTime', function (event, args) {
                $scope.timeValue = args.timeValue;
                $scope.timeString = args.timeString;
                $scope.setDateTime();
            });
            $scope.setDateTime = function () {
                if ($scope.dateValue) {
                    $scope.value = $scope.dateValue + " " + $scope.timeValue;
                    $scope.dateTimeString = $scope.dateString + " " + $scope.timeString;
                }
            }
            $scope.getPicker = function () {
                $scope.show = true;
                $scope.$broadcast('getPicker');
            }
            $(document).click(function (evt) {
                if ($element.find(evt.target).length == 0) {
                    $scope.show = false;
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                }
            })
        }]
    };
});
app.directive("appInputReference", function ($server) {
    return {
        scope: {
            placeholder: '=',
            value: '=',
            search:'&'
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-input-reference.html",
        controller: ["$scope", "$element", function ($scope, $element) {
            $scope.searchKeyword = function (keyword) {
                $scope.show = true;
                if (keyword.length > 0) {
                    $scope.searching = true;
                    $scope.search({
                        "keyword": keyword, "onsuccess": function (options) {
                            $scope.searching = false;
                            $scope.options = options;
                            $scope.mapOptions = {};
                            options.forEach(function (option) {
                                $scope.mapOptions[option.label] = option;
                            })
                            if (!$scope.$$phase && !$scope.$root.$$phase) {
                                $scope.$apply();
                            }
                        }
                    })
                }
            }
            $scope.selectOption = function (option) {
                $scope.value = option.value;
                $scope.keyword = option.label;
                $scope.show = false;
            }
            $(document).click(function (evt) {
                if ($element.find(evt.target).length == 0) {
                    $scope.removeBinding();
                }
            })
            $scope.removeBinding = function () {
                $scope.show = false;
                setTimeout(function () {
                    if (!$scope.mapOptions.hasOwnProperty($scope.keyword)) {
                        $scope.keyword = '';
                        if (!$scope.$$phase && !$scope.$root.$$phase) {
                            $scope.$apply();
                        }
                    }
                },1000)
               
            }
        }]
    };
});
app.directive("appButton", function ($server) {
    return {
        replace: true,
        scope: {
            label: '@',
            type: '@',
            click: '&',
            disabled: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-button.html"
    };
});
app.directive("appButtonGroup", function ($server) {
    return {
        transclude: true,
        replace: true,
        scope: {
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-button-group.html"
    };
});
app.directive("appTable", function ($server) {
    return {
        scope: {
            data: '=',
            columns: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-table.html"
    };
});
app.directive("appDataTable", function ($server) {
    return {
        scope: {
            data: '=',
            columns: '=',
            actions: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-data-table.html",
        controller: ["$scope", function ($scope) {
            $scope.pageSizes = [5, 10, 20, 50, 100];
            $scope.pageSize = 5;
            $scope.currentPage = 1;
            $scope.setTableData = function () {
                $scope.filteredData = $scope.getFilteredData();
                $scope.pages = [];
                for (var i = 1; i <= Math.ceil($scope.filteredData.length / $scope.pageSize) ;i++){
                    $scope.pages.push(i);
                }
                $scope.offset = (($scope.currentPage * $scope.pageSize) - $scope.pageSize);
                $scope.pagedData = $scope.filteredData.slice($scope.offset, ($scope.offset + $scope.pageSize));
            }
            $scope.getFilteredData = function () {
                if ($scope.keyword && $scope.keyword != '') {
                    var filteredData = $scope.data.filter(function (record) {
                        for (var i = 0; i < $scope.columns.length; i++) {
                            if (record[$scope.columns[i].name] && (record[$scope.columns[i].name] + '').toLowerCase().includes($scope.keyword.toLowerCase())) {
                                return true;
                            }
                        }
                    })
                    return filteredData;
                } else {
                    return $scope.data;
                }
            }
            $scope.search = function () {
                $scope.currentPage = 1;
                $scope.setTableData();
            }
            $scope.pageSizeChange = function () {
                $scope.currentPage = 1;
                $scope.setTableData();
            }
            $scope.first = function () {
                $scope.currentPage = 1;
                $scope.setTableData();
            }
            $scope.prev = function () {
                $scope.currentPage = $scope.currentPage - 1;
                $scope.setTableData();
            }
            $scope.next = function () {
                $scope.currentPage = $scope.currentPage + 1;
                $scope.setTableData();
            }
            $scope.last = function () {
                $scope.currentPage = $scope.pages.length;
                $scope.setTableData();
            }
            $scope.setTableData();
        }]
    };
});
app.directive("appTabs", function ($server) {
    return {
        transclude: true,
        scope: {
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-tabs.html",
        controllerAs: 'tabs',
        controller: ["$scope", function ($scope) {
            $scope.tabs = [];
            $scope.selectTab = function selectTab(index) {
                for (var i = 0; i < $scope.tabs.length; i++) {
                    $scope.tabs[i].active = false;
                }
                $scope.tabs[index].active = true;
            };
            $scope.$on('addTab', function (event, args) {
                $scope.tabs.push(args.tab);
            });
            $scope.$watchCollection("tabs", function () {
                if ($scope.tabs.length > 0) {
                    $scope.selectTab(0);
                }
            })
        }]
    };
});
app.directive("appTab", function ($server) {
    return {
        transclude: true,
        scope: {
            label:'@'
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-tab.html",
        controller:["$scope", function ($scope) {
            $scope.tab = {
                label: $scope.label,
                active: false
            };
            $scope.$emit('addTab', { "tab": $scope.tab });
        }]
    };
});
app.directive("appIcon", function ($server) {
    return {
        scope: {
            icon: '@',
            size: '@',
            title: '@',
            class: '@'
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-icon.html",
        controller: ["$scope","$element", function ($scope,$element) {
            $scope.iconFamily = $scope.icon.split(":")[0];
            $scope.iconName = $scope.icon.split(":")[1].split('_').join('-');
            $element.find("use").attr("xlink:href", "Content/slds/assets/icons/" + $scope.iconFamily + "-sprite/svg/symbols.svg#" + $scope.icon.split(":")[1]);
        }]
    };
});
app.directive("appPageHeader", function ($server) {
    return {
        scope: {
            pageName: '@',
            description: '@',
            icon: '@'
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-page-header.html"
    };
});
app.directive("appNavigation", function ($server) {
    return {
        scope: {
            items: '=',
            selectedItem: '='
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-navigation.html",
        controller: ["$scope", function ($scope) {
            $scope.selectItem = function (index) {
                $scope.selectedIndex = index;
                $scope.selectedItem = $scope.items[index];
            }
        }]
    };
});
app.directive("appSpinner", function ($server) {
    return {
        templateUrl: $server.getPath() + "/Engine/templates/app-spinner.html"
    };
});
app.directive("appToaster", function ($server) {
    return {
        scope:{
            type: '@',
            messege:'@'
        },
        templateUrl: $server.getPath() + "/Engine/templates/app-toaster.html",
        controller: ["$scope","$element", function ($scope,$element) {
            $scope.removeTime;
            $scope.init = function () {
                switch ($scope.type) {
                    case 'info':
                        $scope.removeTime = 5000;
                        break;
                    case 'success':
                        $scope.removeTime = 5000;
                        break;
                    case 'warning':
                        $scope.removeTime = 10000;
                        break;
                }
                if ($scope.removeTime) {
                    setTimeout(function () {
                        $scope.removeToaster();
                    },$scope.removeTime);
                }
            }
            $scope.removeToaster = function () {
                $element.remove();
            }
            $scope.init();
        }]
    };
});