var app;
(function (app) {
    var header;
    (function (header) {
        var ExportDialogController = app.dialogs.ExportDialogController;
        var DataschemaImportController = app.dialogs.dataschemaimport.DataschemaImportController;
        var HeaderViewController = (function () {
            function HeaderViewController(treeService, dataschemaService, socioCortexConnector, $mdDialog, undoService, configService) {
                this.treeService = treeService;
                this.dataschemaService = dataschemaService;
                this.socioCortexConnector = socioCortexConnector;
                this.$mdDialog = $mdDialog;
                this.undoService = undoService;
                this.configService = configService;
            }
            HeaderViewController.prototype.showExportDialog = function () {
                var uiSchema = this.treeService.exportUISchemaAsJSON();
                var dataSchema = this.dataschemaService.exportDataSchemaAsString();
                var options = {
                    parent: angular.element(document.body),
                    templateUrl: 'app/src/components/dialogs/export/exportDialog.html',
                    clickOutsideToClose: true,
                    controller: ExportDialogController,
                    controllerAs: 'dialog',
                    locals: {
                        uiSchema: uiSchema,
                        dataSchema: dataSchema
                    }
                };
                this.$mdDialog.show(options);
            };
            HeaderViewController.prototype.saveToSocioCortex = function () {
                var _this = this;
                var uiSchema = this.treeService.exportUISchemaAsJSON();
                this.socioCortexConnector.saveViewModel(uiSchema).then(function () {
                    _this.$mdDialog.show(_this.$mdDialog.alert()
                        .parent(angular.element(document.body))
                        .clickOutsideToClose(true)
                        .title('Saved to SocioCortex')
                        .textContent('The UI Schema has been successfully saved into SocioCortex')
                        .ok('OK'));
                }).catch(function (error) {
                    _this.$mdDialog.show(_this.$mdDialog.alert()
                        .parent(angular.element(document.body))
                        .clickOutsideToClose(true)
                        .title('Cannot save to SocioCortex')
                        .textContent('The UI Schema cannot be saved into SocioCortex. Error says: ' + error.statusText)
                        .ok('Close'));
                });
            };
            HeaderViewController.prototype.showImportDialog = function () {
                var options = {
                    parent: angular.element(document.body),
                    templateUrl: 'app/src/components/dialogs/dataschemaImport/dataschemaImport.html',
                    controller: DataschemaImportController,
                    controllerAs: 'dialog',
                    clickOutsideToClose: true
                };
                this.$mdDialog.show(options);
            };
            HeaderViewController.$inject = ['TreeService', 'DataschemaService', 'SocioCortexConnector', '$mdDialog', 'UndoService', 'ConfigService'];
            return HeaderViewController;
        })();
        angular.module('app.header').controller('HeaderViewController', HeaderViewController);
    })(header = app.header || (app.header = {}));
})(app || (app = {}));
//# sourceMappingURL=header.controller.js.map