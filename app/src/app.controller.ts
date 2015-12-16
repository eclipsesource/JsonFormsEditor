/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />

/**
 * Created by pancho111203 on 7/12/15.
 */
module app{
    class AppController{
        static $inject = ['TreeService', 'JsonSchemaService', '$mdDialog', '$scope'];

        constructor(
          public treeService: any, 
          public JsonSchemaService: any, 
          public $mdDialog: ng.material.IDialogService, 
          public $scope) {

          /*$scope.editorOutput = {
              "type": "VerticalLayout",
              "elements": [
                  {
                      "type": "Control",
                      "scope": {
                          "$ref": "#/properties/name"
                      },
                      "label": "Name"
                  },
                  {
                      "type": "Control",
                      "scope": {
                          "$ref": "#/properties/price"
                      },
                      "label": "Price"
                  }
              ]
          };*/
            $scope.editorOutput = this.treeService.exportUISchemaAsJSON();
          $scope.editorSchema = JsonSchemaService.getUISchema();
          $scope.editorData = {};
          $scope.cancelDialog = $mdDialog.hide;
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

        previewForm() {
          angular.element('#preview')[0].click();
        }
    }

    angular.module('app').controller("AppController", AppController);
}

