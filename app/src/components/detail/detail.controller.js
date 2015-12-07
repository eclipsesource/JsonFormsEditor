/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
var app;
(function (app) {
    var detail;
    (function (detail) {
        var DetailController = (function () {
            function DetailController($scope, detailService) {
                this.$scope = $scope;
                this.detailService = detailService;
            }
            DetailController.prototype.reset = function () {
                this.detailService.currentElement = null;
            };
            DetailController.$inject = ['$scope', 'DetailService'];
            return DetailController;
        })();
        angular.module('app.detail').controller('DetailController', DetailController);
    })(detail = app.detail || (app.detail = {}));
})(app || (app = {}));
//# sourceMappingURL=detail.controller.js.map