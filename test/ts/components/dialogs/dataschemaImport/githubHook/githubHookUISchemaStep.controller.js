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
            var GithubHookUISchemaStepController = (function (_super) {
                __extends(GithubHookUISchemaStepController, _super);
                function GithubHookUISchemaStepController(wizard, githubConnector, $q) {
                    _super.call(this, wizard);
                    this.githubConnector = githubConnector;
                    this.$q = $q;
                    this.fileSelectorID = 1;
                    this.gonnaSkip = false;
                    this.wiz = wizard;
                }
                GithubHookUISchemaStepController.prototype.isAllowedToContinue = function () {
                    if (this.gonnaSkip || this.selectedFile) {
                        return true;
                    }
                    return false;
                };
                GithubHookUISchemaStepController.prototype.getTitle = function (index) {
                    return index + 1 + ". UI";
                };
                GithubHookUISchemaStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookUISchemaStep.html";
                };
                GithubHookUISchemaStepController.prototype.hasNavigation = function () {
                    return true;
                };
                GithubHookUISchemaStepController.prototype.shallSubmit = function () {
                    return false;
                };
                GithubHookUISchemaStepController.prototype.hasParentFolder = function () {
                    return this.githubConnector.hasParentFolder();
                };
                GithubHookUISchemaStepController.prototype.getDescription = function () {
                    return "Select the UI Schema (JSON File). This step is optional";
                };
                GithubHookUISchemaStepController.prototype.goToParentFolder = function () {
                    this.githubConnector.goToParentFolder();
                };
                GithubHookUISchemaStepController.prototype.submit = function () {
                    var _this = this;
                    if (this.gonnaSkip) {
                        var result = {
                            dataSchema: this.githubConnector.getFileLoader(0).loadedFileContents
                        };
                        return this.$q.when(result);
                    }
                    return this.githubConnector.loadFile(this.selectedFile, this.fileSelectorID).then(function (res) {
                        return {
                            dataSchema: _this.githubConnector.getFileLoader(0).loadedFileContents,
                            uiSchema: res
                        };
                    }, function (error) {
                        _this.wiz.showNotification("Invalid file selected, try with a json file.");
                    });
                };
                GithubHookUISchemaStepController.prototype.getFiles = function () {
                    return this.githubConnector.getFileLevel().getFiles();
                };
                GithubHookUISchemaStepController.prototype.selectFile = function (file) {
                    if (file.getType() === 'tree') {
                        //The file selected was a folder, go into it
                        this.githubConnector.goIntoFolder(file);
                    }
                    else {
                        this.selectedFile = file;
                    }
                };
                GithubHookUISchemaStepController.prototype.canSkip = function () {
                    return true;
                };
                GithubHookUISchemaStepController.prototype.skip = function () {
                    this.gonnaSkip = true;
                    this.wizard.next();
                };
                return GithubHookUISchemaStepController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.GithubHookUISchemaStepController = GithubHookUISchemaStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=githubHookUISchemaStep.controller.js.map