module app.detail {

    class DetailController {

        static $inject = ['DetailService'];

        constructor(public detailService:DetailService) {}

        reset() : void {
            this.detailService.reset();
        }

    }

    angular.module('app.detail').controller('DetailController', DetailController);
}