var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var ExportDialogController = (function (_super) {
            __extends(ExportDialogController, _super);
            function ExportDialogController($scope, $mdDialog, uiSchema, dataSchema) {
                var _this = this;
                _super.call(this, $mdDialog);
                this.$mdDialog = $mdDialog;
                this.uiSchema = uiSchema;
                this.dataSchema = dataSchema;
                this.selectedIndex = 0;
                this.onChangeActiveTab();
                $scope.$watch(function () { return _this.selectedIndex; }, function (current, old) {
                    if (current != old)
                        _this.onChangeActiveTab();
                });
            }
            ExportDialogController.prototype.getActiveSchema = function () {
                switch (this.selectedIndex) {
                    case 1:
                        return this.dataSchema;
                    default:
                        return this.uiSchema;
                }
            };
            ExportDialogController.prototype.getActiveSchemaFileName = function () {
                switch (this.selectedIndex) {
                    case 1:
                        return "data_schema.json";
                    default:
                        return "ui_schema.json";
                }
            };
            ExportDialogController.prototype.onChangeActiveTab = function () {
                var schema = this.getActiveSchema();
                var blob = new Blob([schema], { type: 'text/plain' });
                this.url = window.URL.createObjectURL(blob);
                this.activeSchemaFileName = this.getActiveSchemaFileName();
            };
            ExportDialogController.prototype.downloadSchema = function () {
                document.getElementById("a").click();
            };
            ExportDialogController.prototype.hideExportDialog = function () {
                this.$mdDialog.hide();
            };
            ExportDialogController.$inject = ['$scope', '$mdDialog', 'uiSchema', 'dataSchema'];
            return ExportDialogController;
        })(dialogs.AbstractDialog);
        dialogs.ExportDialogController = ExportDialogController;
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=exportDialog.controller.js.map