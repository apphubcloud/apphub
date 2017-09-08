var app = angular.module("engine", []);
app.service("$engine", function ($http) {
    this.execute = function (api,arguments,onsuccess,onerror) {
        $http({
            method: "POST",
            url: api,
            data: arguments,
            headers: { "Content-Type": "application/json" },
            dataType: 'json',
        }).then(function success(response) {
            if (response.statusText == "OK") {
                onsuccess(response.data);
            } else {
                onerror(response.messege);
            }
        }, function error(response) {
            onerror(response.message);
        });
    },
    this.test = function (arguments,onsuccess,onerror) {
        this.execute("/Engine/Test", arguments, onsuccess, onerror)
    }
})