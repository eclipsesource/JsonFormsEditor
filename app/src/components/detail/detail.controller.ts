/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {

    class DetailController {
        public data:any;
        public uiSchema:any;
        public schema:any;

        static $inject = ['$scope', 'DetailService'];

        constructor(public $scope, public detailService:app.detail.DetailService) {
            $scope.service = detailService;
            this.data = {
                "id": 1,
                "title": "Test"
            };

            $scope.$watch(this.detailService.currentElement, (newValue : app.tree.TreeElement) => {
                if(newValue){
                    this.data = {
                        "id": newValue.getId(),
                        "title": newValue.getTitle()
                    }
                }
            });


            this.schema = {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number"
                    },
                    "title": {
                        "type": "string"
                    }
                }
            };

            this.uiSchema = {
                "type": "VerticalLayout",
                "elements": [
                    {
                        "type": "Control",
                        "scope": {
                            "$ref": "#/properties/id"
                        }
                    },
                    {
                        "type": "Control",
                        "scope": {
                            "$ref": "#/properties/title"
                        }
                    }
                ]
            };
        }

        reset() : void {
            this.detailService.currentElement = null;
        }
    }

    angular.module('app.detail').controller('DetailController', DetailController);
}

