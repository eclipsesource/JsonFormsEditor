var app;
(function (app) {
    var preview;
    (function (preview) {
        var PreviewService = (function () {
            function PreviewService($state, treeService, dataschemaService) {
                this.$state = $state;
                this.treeService = treeService;
                this.dataschemaService = dataschemaService;
                this.schema = dataschemaService.getDataSchema();
                var stringifiedSchema = treeService.exportUISchemaAsJSON();
                if (stringifiedSchema) {
                    this.uiSchema = JSON.parse(stringifiedSchema);
                }
                this.treeService.registerObserver(this);
                this.dataschemaService.registerObserver(this);
            }
            PreviewService.prototype.update = function (update) {
                if (update.containsSchema()) {
                    this.schema = update.getSchema();
                }
                else if (update.containsUiSchema()) {
                    this.uiSchema = update.getUiSchema();
                }
                if (this.tab) {
                    this.tab.postMessage(update, '*');
                }
            };
            PreviewService.prototype.openInNewTab = function () {
                var _this = this;
                this.tab = window.open('#preview?newTab');
                this.tab.addEventListener('load', function () {
                    _this.tab.postMessage(new preview.PreviewUpdateEvent(_this.schema, _this.uiSchema), '*');
                }, false);
                this.$state.go('edit');
            };
            PreviewService.$inject = ['$state', 'TreeService', 'DataschemaService'];
            return PreviewService;
        })();
        preview.PreviewService = PreviewService;
        angular.module('app.preview').service('PreviewService', PreviewService);
    })(preview = app.preview || (app.preview = {}));
})(app || (app = {}));
//# sourceMappingURL=preview.service.js.map