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
            var GithubHookRepoStepController = (function (_super) {
                __extends(GithubHookRepoStepController, _super);
                function GithubHookRepoStepController(wizard, githubConnector, $q) {
                    _super.call(this, wizard);
                    this.githubConnector = githubConnector;
                    this.$q = $q;
                    this.someRepoIsSelected = false;
                }
                GithubHookRepoStepController.prototype.isAllowedToContinue = function () {
                    return (this.selectedRepo && this.selectedBranch);
                };
                GithubHookRepoStepController.prototype.getRepos = function () {
                    return this.githubConnector.getRepoList();
                };
                GithubHookRepoStepController.prototype.getTitle = function (index) {
                    return index + 1 + ". Repository";
                };
                GithubHookRepoStepController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/githubHook/githubHookRepoStep.html";
                };
                GithubHookRepoStepController.prototype.getDescription = function () {
                    return "Select the repository and branch containing your schemas";
                };
                GithubHookRepoStepController.prototype.hasNavigation = function () {
                    return true;
                };
                GithubHookRepoStepController.prototype.submit = function () {
                    var _this = this;
                    return this.githubConnector.getFilesFromBranch(this.selectedRepo.name, this.selectedBranch.name).then(function (res) {
                        _this.selectedRepo = undefined;
                        _this.selectedBranch = undefined;
                    });
                };
                GithubHookRepoStepController.prototype.shallSubmit = function () {
                    return true;
                };
                GithubHookRepoStepController.prototype.selectRepo = function (repo) {
                    this.someRepoIsSelected = true;
                    this.selectedRepo = repo;
                    this.reloadBranches();
                };
                GithubHookRepoStepController.prototype.reloadBranches = function () {
                    var _this = this;
                    this.branches = [];
                    this.githubConnector.getBranchList(this.selectedRepo.name).then(function (result) {
                        _this.branches = JSON.parse(result.data);
                    }, function (error) {
                        console.log(error);
                        throw new Error('unable to load branches');
                    });
                };
                GithubHookRepoStepController.prototype.getBranches = function () {
                    return this.branches;
                };
                GithubHookRepoStepController.prototype.selectBranch = function (branch) {
                    this.selectedBranch = branch;
                };
                return GithubHookRepoStepController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.GithubHookRepoStepController = GithubHookRepoStepController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=githubHookRepoStep.controller.js.map