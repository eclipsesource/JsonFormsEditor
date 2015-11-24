/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {

    class DetailController {
        public data:any;
        public uiSchema:any;
        public schema:any;

        static $inject = ['$scope', 'DetailService'];

        constructor($scope : ng.IScope, public detailService:app.detail.DetailService) {
            this.data = {
                "id": 1,
                "title": "Test"
            };

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
            }
        }
    }

    angular.module('app.detail').controller('DetailController', DetailController);
}

