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
            var UploadHookController = (function (_super) {
                __extends(UploadHookController, _super);
                function UploadHookController(wizard, FileUploader, $q) {
                    var _this = this;
                    _super.call(this, wizard);
                    this.$q = $q;
                    this.dataFileName = "Select a file for the data schema";
                    this.uiFileName = "Select a file for the UI schema (optional)";
                    this.uploaderData = new FileUploader();
                    this.uploaderUI = new FileUploader();
                    this.uploaderData.onAfterAddingFile = function (file) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            _this.dataJson = JSON.parse(reader.result);
                        };
                        _this.dataFileName = file._file.name;
                        reader.readAsText(file._file);
                    };
                    this.uploaderUI.onAfterAddingFile = function (file) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            _this.uiJson = JSON.parse(reader.result);
                        };
                        _this.uiFileName = file._file.name;
                        reader.readAsText(file._file);
                    };
                }
                UploadHookController.prototype.getTitle = function (index) {
                    return index + 1 + ". Upload";
                };
                UploadHookController.prototype.getDescription = function () {
                    return "Please upload your schemas";
                };
                UploadHookController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/uploadHook/uploadStep.html";
                };
                UploadHookController.prototype.hasNavigation = function () {
                    return true;
                };
                UploadHookController.prototype.submit = function () {
                    var deferred = this.$q.defer();
                    var result = {
                        dataSchema: this.dataJson,
                        uiSchema: this.uiJson
                    };
                    deferred.resolve(result);
                    if (!result.dataSchema) {
                        this.wizard.showNotification("Select at least a valid file for the Data Schema!");
                    }
                    else {
                        return deferred.promise;
                    }
                };
                UploadHookController.prototype.shallSubmit = function () {
                    return true;
                };
                UploadHookController.$inject = ['$mdDialog', 'FileUploader', 'ToolboxService'];
                return UploadHookController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.UploadHookController = UploadHookController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
