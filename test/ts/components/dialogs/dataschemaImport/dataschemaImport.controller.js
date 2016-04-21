var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var DataschemaImportController = (function (_super) {
                __extends(DataschemaImportController, _super);
                function DataschemaImportController($mdDialog, importService, toolboxService, treeService, $scope, $mdToast, $rootScope) {
                    _super.call(this, $mdDialog, $rootScope);
                    this.importService = importService;
                    this.toolboxService = toolboxService;
                    this.treeService = treeService;
                    this.$scope = $scope;
                    this.$mdToast = $mdToast;
                    this.$rootScope = $rootScope;
                    this.addSteps([new dataschemaimport.ChooseUploadStepController(this)]);
                }
                DataschemaImportController.prototype.shallReset = function () {
                    return true;
                };
                DataschemaImportController.prototype.showNotification = function (text) {
                    var parent = document.querySelector('.data-schema-import-dialog');
                    var errorNotification = this.$mdToast.simple().textContent(text).position('bottom left').parent(parent).theme('error-toast');
                    this.$mdToast.show(errorNotification);
                    throw new Error(text);
                };
                DataschemaImportController.prototype.submit = function () {
                    var _this = this;
                    this.currentStep().submit().then(function (json) {
                        var dataSchema = json.dataSchema;
                        var uiSchema = json.uiSchema;
                        if (!dataSchema) {
                            throw new Error('DataSchema is undefined!');
                        }
                        _this.toolboxService.loadSchema(dataSchema);
                        if (uiSchema) {
                            _this.treeService.generateTreeFromExistingUISchema(uiSchema);
                        }
                        _this.hideDialog();
                    });
                };
                DataschemaImportController.$inject = ['$mdDialog', 'DataschemaImportService', 'ToolboxService', 'TreeService', '$scope', '$mdToast', '$rootScope'];
                return DataschemaImportController;
            })(dialogs.AbstractWizard);
            dataschemaimport.DataschemaImportController = DataschemaImportController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
