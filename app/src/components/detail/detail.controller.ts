module app.detail {

    class DetailController {

        static $inject = ['DetailService'];

        constructor(public detailService:app.detail.DetailService) {}

        reset() : void {
            this.detailService.currentElement = null;
        }

    }

    angular.module('app.detail').controller('DetailController', DetailController);
}