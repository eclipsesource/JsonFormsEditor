var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var EmptyHookService = (function () {
                function EmptyHookService($mdDialog, importService) {
                    this.$mdDialog = $mdDialog;
                    importService.registerImportHook(this);
                }
                EmptyHookService.prototype.getTitle = function () {
                    return "Empty Dataschema";
                };
                EmptyHookService.prototype.getIconFont = function () {
                    return "crop_square";
                };
                EmptyHookService.prototype.openDialog = function (wizard) {
                    this.$mdDialog.hide();
                };
                EmptyHookService.$inject = ['$mdDialog', 'DataschemaImportService'];
                return EmptyHookService;
            })();
            dataschemaimport.EmptyHookService = EmptyHookService;
            angular.module('app.dialogs.empty').service('EmptyHookService', EmptyHookService);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=emptyHook.service.js.map