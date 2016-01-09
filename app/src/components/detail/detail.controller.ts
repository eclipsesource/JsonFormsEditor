module app.detail {

    import IScope = angular.IScope;
    import TreeService = app.tree.TreeService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    class DetailController {

        static $inject = ['DetailService', '$scope', 'TreeService'];

        constructor(public detailService:DetailService, $scope:IScope, treeService:TreeService) {
            $scope.$on('modelChanged', () => {
                console.log(JSON.parse(treeService.exportUISchemaAsJSON()));
               treeService.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(treeService.exportUISchemaAsJSON())));
            });
        }

        reset() : void {
            this.detailService.reset();
        }

    }

    angular.module('app.detail').controller('DetailController', DetailController);
}