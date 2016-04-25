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
            var SocioCortexEntityTypeStepController = (function (_super) {
                __extends(SocioCortexEntityTypeStepController, _super);
                function SocioCortexEntityTypeStepController(wizard, sociocortexConnector, $q) {
                    _super.call(this, wizard);
                    this.sociocortexConnector = sociocortexConnector;
                    this.$q = $q;
                }
                SocioCortexEntityTypeStepController.prototype.getTitle = function (index) {
                    return index + 1 + ". EntityType";
                };
                SocioCortexEntityTypeStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexHookEntityTypeStep.html";
                };
                SocioCortexEntityTypeStepController.prototype.hasNavigation = function () {
                    return true;
                };
                SocioCortexEntityTypeStepController.prototype.submit = function () {
                    var _this = this;
                    return this.sociocortexConnector.selectEntityType(this.selectedEntityType).then(function () {
                        var deffered = _this.$q.defer();
                        var uiSchema = _this.sociocortexConnector.getViewModel();
                        var dataSchema = _this.sociocortexConnector.generateJSONFromAttributes();
                        var result = {
                            uiSchema: uiSchema,
                            dataSchema: dataSchema
                        };
                        deffered.resolve(result);
                        return deffered.promise;
                    });
                };
                SocioCortexEntityTypeStepController.prototype.shallSubmit = function () {
                    return true;
                };
                SocioCortexEntityTypeStepController.prototype.selectEntityType = function (entityType) {
                    this.selectedEntityType = entityType;
                    this.wizard.next();
                };
                return SocioCortexEntityTypeStepController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.SocioCortexEntityTypeStepController = SocioCortexEntityTypeStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=socioCortexHookEntityTypeStep.controller.js.map