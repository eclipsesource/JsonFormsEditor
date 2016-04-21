module app.detail {

    import IScope = angular.IScope;
    import TreeService = app.tree.TreeService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;

    class DetailController {

        static $inject = ['DetailService', '$scope', 'TreeService'];

        constructor(public detailService:DetailService, $scope:IScope, treeService:TreeService) {
            $scope.$on('modelChanged', () => {
                treeService.modifiedTree();
            });
        }

    }

    angular.module('app.detail').controller('DetailController', DetailController);
}