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
                if (response.data.success) {
                    onsuccess(response.data.data);
                } else {
                    onerror(response.data.messege);
                }
                onsuccess(response.data);
            } else {
                onerror(response.messege);
            }
        }, function error(response) {
            onerror(response.message);
        });
    }
})