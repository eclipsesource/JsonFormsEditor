var app;
(function (app) {
    var preview;
    (function (preview) {
        var PreviewController = (function () {
            function PreviewController(previewService, configService) {
                this.previewService = previewService;
                this.configService = configService;
                this.data = {};
            }
            PreviewController.prototype.shouldShowNewTabButton = function () {
                var split = window.location.href.split('?');
                if (!split) {
                    return true;
                }
                var queries = _.last(split);
                if (!queries) {
                    return true;
                }
                if (~queries.indexOf('newTab')) {
                    return false;
                }
                return true;
            };
            PreviewController.prototype.openInNewTab = function () {
                this.previewService.openInNewTab();
            };
            PreviewController.$inject = ['PreviewService'];
            return PreviewController;
        })();
        angular.module('app.preview').controller('PreviewController', PreviewController);
    })(preview = app.preview || (app.preview = {}));
})(app || (app = {}));
