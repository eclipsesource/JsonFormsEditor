module app.detail {

    import IScope = angular.IScope;
    import TreeService = app.tree.TreeService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    import ValidatorService = app.core.ValidatorService;

    class DetailController {

        static $inject = ['DetailService', '$scope', 'TreeService', 'ValidatorService'];

        constructor(public detailService:DetailService, $scope:IScope, treeService:TreeService, private validatorService:ValidatorService) {
            $scope.$on('modelChanged', () => {
                treeService.modifiedTree();
                this.validatorService.validateTreeElement(this.detailService.currentElement);
            });
        }

    }

    angular.module('app.detail').controller('DetailController', DetailController);
}