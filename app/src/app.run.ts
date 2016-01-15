module app {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;
    import DataschemaImportController = app.dialogs.dataschemaimport.DataschemaImportController;

    class Runner {

        static $inject = ['$mdDialog'];

        constructor($mdDialog:IDialogService) {
            var options:IDialogOptions = {
                parent: angular.element(document.body),
                templateUrl: 'app/src/components/dialogs/dataschemaImport/dataschemaImport.html',
                controller: DataschemaImportController,
                controllerAs: 'dialog'
            };

            $mdDialog.show(options);
        }
    }

    angular.module('app').run(Runner);
}