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
            var FromUrlHookController = (function (_super) {
                __extends(FromUrlHookController, _super);
                function FromUrlHookController(wizard, $http) {
                    _super.call(this, wizard);
                    this.$http = $http;
                }
                FromUrlHookController.prototype.getTitle = function (index) {
                    return index + 1 + ". URL";
                };
                FromUrlHookController.prototype.getDescription = function () {
                    return "Insert the URL from where you want to load your data-schema";
                };
                FromUrlHookController.prototype.getTemplate = function () {
                    return "app/src/components/dialogs/dataschemaImport/fromUrlHook/fromUrlStep.html";
                };
                FromUrlHookController.prototype.hasNavigation = function () {
                    return true;
                };
                FromUrlHookController.prototype.shallSubmit = function () {
                    return true;
                };
                FromUrlHookController.prototype.submit = function () {
                    return this.$http.get(this.url).then(function (res) {
                        var result = {
                            dataSchema: res
                        };
                        return result;
                    });
                };
                return FromUrlHookController;
            })(dialogs.AbstractWizardStep);
            dataschemaimport.FromUrlHookController = FromUrlHookController;
        })(dataschemaimport = dialogs.dataschemaimport || (dialogs.dataschemaimport = {}));
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=fromUrlStep.controller.js.map