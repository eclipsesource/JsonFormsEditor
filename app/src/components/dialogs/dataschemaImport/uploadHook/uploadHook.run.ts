module app.dialogs.dataschemaimport {

    class Runner {

        static $inject = ['UploadHookService'];

        constructor(uploadHook:UploadHookService){

        }
    }

    angular.module('app.dialogs').run(Runner);
}