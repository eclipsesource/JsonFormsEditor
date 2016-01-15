module app.dialogs.dataschemaimport {

    export class DataschemaImportService {

        private hooks:ImportHook[] = [];

        registerImportHook(hook:ImportHook) {
            this.hooks.push(hook);
        }

        getHooks():ImportHook[] {
            return this.hooks;
        }

    }

    angular.module('app.dialogs').service('DataschemaImportService', DataschemaImportService)

}