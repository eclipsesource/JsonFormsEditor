module app.dialogs.dataschemaimport {

    class Runner {

        static $inject = ['FromUrlHookService'];

        constructor(fromUrlHook:FromUrlHookService) {

        }
    }

    angular.module('app.dialogs.url').run(Runner);
}