/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {

    class DetailController {
        public uiSchema:any;
        public schema:any;

        static $inject = ['$scope', 'DetailService'];

        constructor(public $scope, public detailService:app.detail.DetailService) {
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

