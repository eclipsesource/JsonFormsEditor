var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var Runner = (function () {
                function Runner(sociocortexHook) {
                }
                Runner.$inject = ['SociocortexHookService'];
                return Runner;
            })();
            angular.module('app.dialogs.sociocortex').run(Runner);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
