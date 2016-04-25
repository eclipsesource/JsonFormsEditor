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
            var GithubHookFileStepController = (function (_super) {
                __extends(GithubHookFileStepController, _super);
                function GithubHookFileStepController(wizard, githubConnector) {
                    _super.call(this, wizard);
                    this.githubConnector = githubConnector;
                    this.fileSelectorID = 0;
                    this.wiz = wizard;
                }
                GithubHookFileStepController.prototype.isAllowedToContinue = function () {
                    if (this.selectedFile) {
                        return true;
                    }
                    return false;
                };
                GithubHookFileStepController.prototype.getTitle = function (index) {
                    return index + 1 + ". Data";
                };
                GithubHookFileStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookFileStep.html";
                };
                GithubHookFileStepController.prototype.hasNavigation = function () {
                    return true;
                };
                GithubHookFileStepController.prototype.shallSubmit = function () {
                    return true;
                };
                GithubHookFileStepController.prototype.getDescription = function () {
                    return "Select the data-schema (JSON file)";
                };
                GithubHookFileStepController.prototype.hasParentFolder = function () {
                    return this.githubConnector.hasParentFolder();
                };
                GithubHookFileStepController.prototype.goToParentFolder = function () {
                    this.githubConnector.goToParentFolder();
                };
                GithubHookFileStepController.prototype.submit = function () {
                    var _this = this;
                    return this.githubConnector.loadFile(this.selectedFile, this.fileSelectorID).catch(function (error) {
                        _this.wiz.showNotification("Invalid file selected, try with a json file.");
                    });
                };
                GithubHookFileStepController.prototype.getFiles = function () {
                    return this.githubConnector.getFileLevel().getFiles();
                };
                GithubHookFileStepController.prototype.selectFile = function (file) {
                    if (file.getType() === 'tree') {
                        //The file selected was a folder, go into it
                        this.githubConnector.goIntoFolder(file);
                    }
                    else {
                        this.selectedFile = file;
                    }
                };
                return GithubHookFileStepController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.GithubHookFileStepController = GithubHookFileStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=githubHookFileStep.controller.js.map