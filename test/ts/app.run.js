var app;
(function (app) {
    var DataschemaImportController = app.dialogs.dataschemaimport.DataschemaImportController;
    var Runner = (function () {
        function Runner($mdDialog, $location, $window) {
            if ($location.path() === '') {
                var options = {
                    parent: angular.element(document.body),
                    templateUrl: 'app/src/components/dialogs/dataschemaImport/dataschemaImport.html',
                    controller: DataschemaImportController,
                    controllerAs: 'dialog'
                };
                $mdDialog.show(options);
            }
            $window.onbeforeunload = function () {
                return "Using the back- or refresh button shuts down this application.";
            };
        }
        Runner.$inject = ['$mdDialog', '$location', '$window'];
        return Runner;
    })();
    angular.module('app').run(Runner);
})(app || (app = {}));
