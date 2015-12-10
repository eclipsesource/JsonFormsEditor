/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />

/**
 * Created by pancho111203 on 7/12/15.
 */
module app{
    class AppController{
        static $inject = ['TreeService', '$mdDialog', '$scope'];

        constructor(public treeService: any, public $mdDialog: ng.material.IDialogService, public $scope) {
          $scope.editorOutput = treeService.exportUISchemaAsJSON();
          $scope.cancelDialog = $mdDialog.hide;
          $scope.copyOutput = function() { 
            var code = document.querySelector('#output');
            var range = document.createRange();
            range.selectNode(code);
            window.getSelection().addRange(range);
            document.execCommand('copy');
            //window.getSelection().removeAllRanges();
          }
        }

        alertWithOutputUISchema() {
            this.$scope.editorOutput = this.treeService.exportUISchemaAsJSON();

            var options: ng.material.IDialogOptions = {
              parent: angular.element(document.body),
              templateUrl: 'app/src/components/tree/tree.output.html',
              clickOutsideToClose: true,
              controller: AppController
            };

            this.$mdDialog.show(options);
        }
    }

    angular.module('app').controller("AppController", AppController);
}

