var app;
(function (app) {
    var detail;
    (function (detail) {
        var PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
        var DetailController = (function () {
            function DetailController(detailService, $scope, treeService) {
                this.detailService = detailService;
                $scope.$on('modelChanged', function () {
                    treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(treeService.exportUISchemaAsJSON())));
                });
            }
            DetailController.$inject = ['DetailService', '$scope', 'TreeService'];
            return DetailController;
        })();
        angular.module('app.detail').controller('DetailController', DetailController);
    })(detail = app.detail || (app.detail = {}));
})(app || (app = {}));
