module app {

    import IDialogService = angular.material.IDialogService;
    import IDialogOptions = angular.material.IDialogOptions;
    import DataschemaImportController = app.dialogs.dataschemaimport.DataschemaImportController;
    import ILocationService = angular.ILocationService;
    import IWindowService = angular.IWindowService;

    class Runner {

        static $inject = ['$mdDialog', '$location', '$window'];

        constructor($mdDialog:IDialogService, $location:ILocationService, $window:IWindowService) {
            if ($location.path() === '') {
                var options:IDialogOptions = {
                    parent: angular.element(document.body),
                    templateUrl: 'app/src/components/dialogs/dataschemaImport/dataschemaImport.html',
                    controller: DataschemaImportController,
                    controllerAs: 'dialog'
                };

                $mdDialog.show(options);
            }

            $window.onbeforeunload = () => {
                return "Using the back- or refresh button shuts down this application.";
            }
        }
    }

    angular.module('app').run(Runner);
}