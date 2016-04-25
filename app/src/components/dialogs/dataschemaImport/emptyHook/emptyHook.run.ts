module app.dialogs.dataschemaimport {

    class Runner {

        static $inject = ['EmptyHookService'];

        constructor(emptyHookService:EmptyHookService) {

        }
    }

    angular.module('app.dialogs.empty').run(Runner);
}
