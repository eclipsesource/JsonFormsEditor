/**
 * Created by pancho111203 on 22/12/15.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var ConfigService = (function () {
            function ConfigService() {
                /**
                 * Used for filtering the control elements, to only show those, that are not used in the tree.
                 * @type {boolean}
                 */
                this.enableFilter = true;
                /**
                 * Used to express that this app is currently running in the preview-tab. Therefore some buttons must be hidden.
                 * @type {boolean}
                 */
                this.previewTab = false;
            }
            ConfigService.prototype.isPreviewTab = function () {
                return this.previewTab;
            };
            ConfigService.prototype.setIsPreviewTab = function () {
                this.previewTab = true;
            };
            return ConfigService;
        })();
        core.ConfigService = ConfigService;
        angular.module('app.core').service('ConfigService', ConfigService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=config.service.js.map