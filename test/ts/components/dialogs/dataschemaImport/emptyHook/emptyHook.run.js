var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var Runner = (function () {
                function Runner(emptyHookService) {
                }
                Runner.$inject = ['EmptyHookService'];
                return Runner;
            })();
            angular.module('app.dialogs.empty').run(Runner);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
