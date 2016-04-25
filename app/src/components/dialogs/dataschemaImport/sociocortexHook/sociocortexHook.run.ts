module app.dialogs.dataschemaimport {

    class Runner {

        static $inject = ['SociocortexHookService'];

        constructor(sociocortexHook:SociocortexHookService){

        }
    }

    angular.module('app.dialogs.sociocortex').run(Runner);
}