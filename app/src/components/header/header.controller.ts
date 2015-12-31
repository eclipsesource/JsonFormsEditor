module app.header {

    import TreeService = app.tree.TreeService;
    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;

    class HeaderViewController {

        static $inject = ['TreeService', '$mdDialog'];

        constructor(private treeService:TreeService, private $mdDialog:IDialogService) {
        }

        showExportDialog():void {
            var exportDialogContent = this.treeService.exportUISchemaAsJSON();

            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/header/exportDialog.html',
                clickOutsideToClose: true,
                controller: ExportDialogController,
                controllerAs: 'dialog',
                locals: {
                    content: exportDialogContent
                }
            };

            this.$mdDialog.show(options);
        }

        showConfigDialog():void {
            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/header/configDialog.html',
                clickOutsideToClose: true,
                controller: ConfigDialogController,
                controllerAs: 'config'
            };

            this.$mdDialog.show(options);
        }
    }

    angular.module('app.header').controller('HeaderViewController', HeaderViewController);
}

