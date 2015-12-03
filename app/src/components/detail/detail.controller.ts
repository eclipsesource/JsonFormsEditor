/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {

    class DetailController {
        static $inject = ['$scope', 'DetailService'];

        constructor(public $scope, public detailService:app.detail.DetailService) {

        }

        reset() : void {
            this.detailService.currentElement = null;
        }
    }

    angular.module('app.detail').controller('DetailController', DetailController);
}

