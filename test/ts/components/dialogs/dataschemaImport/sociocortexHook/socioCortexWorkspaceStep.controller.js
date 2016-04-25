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
            var SocioCortexWorkspaceStepController = (function (_super) {
                __extends(SocioCortexWorkspaceStepController, _super);
                function SocioCortexWorkspaceStepController(wizard, sociocortexConnector, $q) {
                    _super.call(this, wizard);
                    this.sociocortexConnector = sociocortexConnector;
                    this.$q = $q;
                }
                SocioCortexWorkspaceStepController.prototype.getTitle = function (index) {
                    return index + 1 + ". Workspace";
                };
                SocioCortexWorkspaceStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexWorkspaceStep.html";
                };
                SocioCortexWorkspaceStepController.prototype.hasNavigation = function () {
                    return true;
                };
                SocioCortexWorkspaceStepController.prototype.submit = function () {
                    return this.sociocortexConnector.selectWorkspace(this.selectedWorkspace);
                };
                SocioCortexWorkspaceStepController.prototype.shallSubmit = function () {
                    return true;
                };
                SocioCortexWorkspaceStepController.prototype.selectWorkspace = function (workspace) {
                    this.selectedWorkspace = workspace;
                    this.wizard.next();
                };
                return SocioCortexWorkspaceStepController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.SocioCortexWorkspaceStepController = SocioCortexWorkspaceStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=socioCortexWorkspaceStep.controller.js.map