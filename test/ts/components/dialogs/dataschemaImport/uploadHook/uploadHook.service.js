var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var dataschemaimport;
        (function (dataschemaimport) {
            var UploadHookService = (function () {
                function UploadHookService(importService, FileUploader, $q) {
                    this.FileUploader = FileUploader;
                    this.$q = $q;
                    importService.registerImportHook(this);
                }
                UploadHookService.prototype.getTitle = function () {
                    return "Upload";
                };
                UploadHookService.prototype.getIconFont = function () {
                    return "file_upload";
                };
                UploadHookService.prototype.openDialog = function (wizard) {
                    wizard.addSteps([new dataschemaimport.UploadHookController(wizard, this.FileUploader, this.$q)]);
                    wizard.next();
                };
                UploadHookService.$inject = ['DataschemaImportService', 'FileUploader', '$q'];
                return UploadHookService;
            })();
            dataschemaimport.UploadHookService = UploadHookService;
            angular.module('app.dialogs.upload').service('UploadHookService', UploadHookService);
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=uploadHook.service.js.map