/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />
/**
 * Created by pancho111203 on 7/12/15.
 */
var app;
(function (app) {
    var AppController = (function () {
        function AppController(treeService, $mdDialog, $scope) {
            this.treeService = treeService;
            this.$mdDialog = $mdDialog;
            this.$scope = $scope;
            $scope.editorOutput = treeService.exportUISchemaAsJSON();
            $scope.cancelDialog = $mdDialog.hide;
        }
        AppController.prototype.alertWithOutputUISchema = function () {
            this.$scope.editorOutput = this.treeService.exportUISchemaAsJSON();
            var options = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/tree/tree.output.html',
                clickOutsideToClose: true,
                controller: AppController
            };
            this.$mdDialog.show(options);
        };
        AppController.$inject = ['TreeService', '$mdDialog', '$scope'];
        return AppController;
    })();
    angular.module('app').controller("AppController", AppController);
})(app || (app = {}));
//# sourceMappingURL=app.controller.js.map