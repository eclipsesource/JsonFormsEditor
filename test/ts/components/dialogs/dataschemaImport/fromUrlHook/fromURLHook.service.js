var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var FromUrlHookService = (function () {
                function FromUrlHookService(importService, $http) {
                    this.$http = $http;
                    importService.registerImportHook(this);
                }
                FromUrlHookService.prototype.getTitle = function () {
                    return "URL";
                };
                FromUrlHookService.prototype.getIconFont = function () {
                    return "language";
                };
                FromUrlHookService.prototype.openDialog = function (wizard) {
                    wizard.addSteps([new dataschemaimport.FromUrlHookController(wizard, this.$http)]);
                    wizard.next();
                };
                FromUrlHookService.$inject = ['DataschemaImportService', '$http'];
                return FromUrlHookService;
            })();
            dataschemaimport.FromUrlHookService = FromUrlHookService;
            angular.module('app.dialogs.url').service('FromUrlHookService', FromUrlHookService);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
