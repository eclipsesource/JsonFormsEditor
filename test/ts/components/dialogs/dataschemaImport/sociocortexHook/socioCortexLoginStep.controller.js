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
            var SocioCortexLoginStepController = (function (_super) {
                __extends(SocioCortexLoginStepController, _super);
                function SocioCortexLoginStepController(wizard, sociocortexConnector) {
                    _super.call(this, wizard);
                    this.sociocortexConnector = sociocortexConnector;
                    this.serverURL = 'https://server.sociocortex.com/api/v1';
                    this.loginError = false;
                    this.loginErrorMessage = "Login error. Check that the entered values are correct and try again.";
                }
                SocioCortexLoginStepController.prototype.getTitle = function (index) {
                    return index + 1 + ". Login";
                };
                SocioCortexLoginStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexLoginStep.html";
                };
                SocioCortexLoginStepController.prototype.hasNavigation = function () {
                    return true;
                };
                SocioCortexLoginStepController.prototype.submit = function () {
                    var _this = this;
                    this.loginError = false;
                    var catchedError;
                    return this.sociocortexConnector.login(this.serverURL, this.username, this.password).catch(function (error) {
                        catchedError = error;
                        _this.loginError = true;
                    }).then(function () {
                        if (_this.loginError)
                            throw catchedError;
                    });
                };
                SocioCortexLoginStepController.prototype.shallSubmit = function () {
                    return true;
                };
                return SocioCortexLoginStepController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.SocioCortexLoginStepController = SocioCortexLoginStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
