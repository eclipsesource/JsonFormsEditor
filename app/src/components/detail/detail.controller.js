var app;
(function (app) {
    var detail;
    (function (detail) {
        var DetailController = (function () {
            function DetailController(detailService) {
                this.detailService = detailService;
            }
            DetailController.prototype.reset = function () {
                this.detailService.currentElement = null;
            };
            DetailController.$inject = ['DetailService'];
            return DetailController;
        })();
        angular.module('app.detail').controller('DetailController', DetailController);
    })(detail = app.detail || (app.detail = {}));
})(app || (app = {}));
//# sourceMappingURL=detail.controller.js.map