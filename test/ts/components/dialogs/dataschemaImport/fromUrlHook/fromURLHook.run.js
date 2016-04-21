var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var Runner = (function () {
                function Runner(fromUrlHook) {
                }
                Runner.$inject = ['FromUrlHookService'];
                return Runner;
            })();
            angular.module('app.dialogs.url').run(Runner);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
