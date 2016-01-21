module app {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;
    import DataschemaImportController = app.dialogs.dataschemaimport.DataschemaImportController;
    import ILocationService = angular.ILocationService;

    class Runner {

        static $inject = ['$mdDialog', '$location'];

        constructor($mdDialog:IDialogService, $location:ILocationService) {
            if ($location.path() === '/edit') {
                var options:IDialogOptions = {
                    parent: angular.element(document.body),
                    templateUrl: 'app/src/components/dialogs/dataschemaImport/dataschemaImport.html',
                    controller: DataschemaImportController,
                    controllerAs: 'dialog'
                };

                $mdDialog.show(options);
            }
        }
    }

    angular.module('app').run(Runner);
}