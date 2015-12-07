/**
 * Created by pancho111203 on 7/12/15.
 */
var app;
(function (app) {
    var AppController = (function () {
        function AppController(treeService) {
            this.treeService = treeService;
        }
        AppController.prototype.alertWithOutputUISchema = function () {
            alert(this.treeService.exportUISchemaAsJSON());
        };
        AppController.$inject = ["TreeService"];
        return AppController;
    })();
    angular.module('app').controller("AppController", AppController);
})(app || (app = {}));
//# sourceMappingURL=app.controller.js.map