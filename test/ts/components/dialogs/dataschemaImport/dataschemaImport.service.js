var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var DataschemaImportService = (function () {
                function DataschemaImportService() {
                    this.hooks = [];
                }
                DataschemaImportService.prototype.registerImportHook = function (hook) {
                    this.hooks.push(hook);
                };
                DataschemaImportService.prototype.getHooks = function () {
                    return this.hooks;
                };
                return DataschemaImportService;
            })();
            dataschemaimport.DataschemaImportService = DataschemaImportService;
            angular.module('app.dialogs').service('DataschemaImportService', DataschemaImportService);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
