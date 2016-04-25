var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var Runner = (function () {
                function Runner(githubHook) {
                }
                Runner.$inject = ['GithubHookService'];
                return Runner;
            })();
            angular.module('app.dialogs.github').run(Runner);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=githubHook.run.js.map