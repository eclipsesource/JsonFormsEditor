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
            var GithubHookLoginStepController = (function (_super) {
                __extends(GithubHookLoginStepController, _super);
                function GithubHookLoginStepController(wizard, githubConnector) {
                    _super.call(this, wizard);
                    this.githubConnector = githubConnector;
                }
                GithubHookLoginStepController.prototype.getTitle = function (index) {
                    return index + 1 + ". Github Login";
                };
                GithubHookLoginStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookLoginStep.html";
                };
                GithubHookLoginStepController.prototype.getDescription = function () {
                    return "Click below to log-in to Github";
                };
                GithubHookLoginStepController.prototype.hasNavigation = function () {
                    return true;
                };
                GithubHookLoginStepController.prototype.shallSubmit = function () {
                    return true;
                };
                GithubHookLoginStepController.prototype.submit = function () {
                    return this.githubConnector.showPopupGithub();
                };
                return GithubHookLoginStepController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.GithubHookLoginStepController = GithubHookLoginStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
