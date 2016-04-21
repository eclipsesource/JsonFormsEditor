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
            var AbstractWizardStep = app.dialogs.AbstractWizardStep;
            var ChooseUploadStepController = (function (_super) {
                __extends(ChooseUploadStepController, _super);
                function ChooseUploadStepController() {
                    _super.apply(this, arguments);
                }
                ChooseUploadStepController.prototype.hasNavigation = function () {
                    return false;
                };
                ChooseUploadStepController.prototype.getTitle = function (index, stepNumber) {
                    if (stepNumber === 0) {
                        return "Welcome to the JSON Forms Editor!";
                    }
                    return index + 1 + ". Welcome";
                };
                ChooseUploadStepController.prototype.getDescription = function () {
                    return "Please select and option to continue";
                };
                ChooseUploadStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/chooseUploadStep/chooseUploadStep.html";
                };
                ChooseUploadStepController.prototype.shallSubmit = function () {
                    return false;
                };
                ChooseUploadStepController.prototype.submit = function () {
                    return undefined;
                };
                return ChooseUploadStepController;
            })(AbstractWizardStep);
            dataschemaimport.ChooseUploadStepController = ChooseUploadStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
