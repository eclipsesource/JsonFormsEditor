var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var SociocortexHookService = (function () {
                function SociocortexHookService(importService, $mdDialog, socioCortexConnector, $q) {
                    this.$mdDialog = $mdDialog;
                    this.socioCortexConnector = socioCortexConnector;
                    this.$q = $q;
                    // sociocortex integration disabled by default
                    //importService.registerImportHook(this);
                }
                SociocortexHookService.prototype.getTitle = function () {
                    return "SocioCortex";
                };
                SociocortexHookService.prototype.getIconFont = function () {
                    return "cloud_download";
                };
                SociocortexHookService.prototype.openDialog = function (wizard) {
                    wizard.addSteps([new dataschemaimport.SocioCortexLoginStepController(wizard, this.socioCortexConnector),
                        new dataschemaimport.SocioCortexWorkspaceStepController(wizard, this.socioCortexConnector, this.$q),
                        new dataschemaimport.SocioCortexEntityTypeStepController(wizard, this.socioCortexConnector, this.$q)]);
                    wizard.next();
                };
                SociocortexHookService.$inject = ['DataschemaImportService', '$mdDialog', 'SocioCortexConnector', '$q'];
                return SociocortexHookService;
            })();
            dataschemaimport.SociocortexHookService = SociocortexHookService;
            angular.module('app.dialogs.sociocortex').service('SociocortexHookService', SociocortexHookService);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
