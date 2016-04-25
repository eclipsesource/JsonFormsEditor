var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var GithubHookService = (function () {
                function GithubHookService($mdDialog, importService, githubConnector, $q) {
                    this.$mdDialog = $mdDialog;
                    this.githubConnector = githubConnector;
                    this.$q = $q;
                    importService.registerImportHook(this);
                }
                GithubHookService.prototype.getTitle = function () {
                    return "Github";
                };
                GithubHookService.prototype.getIconFont = function () {
                    return "cloud_download";
                };
                GithubHookService.prototype.openDialog = function (wizard) {
                    wizard.addSteps([new dataschemaimport.GithubHookLoginStepController(wizard, this.githubConnector), new dataschemaimport.GithubHookRepoStepController(wizard, this.githubConnector, this.$q), new dataschemaimport.GithubHookFileStepController(wizard, this.githubConnector), new dataschemaimport.GithubHookUISchemaStepController(wizard, this.githubConnector, this.$q)]);
                    wizard.next();
                };
                GithubHookService.$inject = ['$mdDialog', 'DataschemaImportService', 'GithubConnector', '$q'];
                return GithubHookService;
            })();
            dataschemaimport.GithubHookService = GithubHookService;
            angular.module('app.dialogs.github').service('GithubHookService', GithubHookService);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=githubHook.service.js.map