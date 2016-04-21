var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var Runner = (function () {
                function Runner(uploadHook) {
                }
                Runner.$inject = ['UploadHookService'];
                return Runner;
            })();
            angular.module('app.dialogs.upload').run(Runner);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
