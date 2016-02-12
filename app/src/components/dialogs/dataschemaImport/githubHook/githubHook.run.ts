module app.dialogs.dataschemaimport {

    class Runner {

        static $inject = ['GithubHookService'];

        constructor(githubHook:GithubHookService){

        }
    }

    angular.module('app.dialogs').run(Runner);
}