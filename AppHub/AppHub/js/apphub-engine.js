var app = angular.module("apphub-engine", ['engine']);
app.service("$apphub-engine", function ($http,$engine) {
    this.getAllObjects = function (onsuccess,onerror) {
        $engine.execute("/ApphubEngine/getAllObjects", {}, onsuccess, onerror)
    }
})