/**
 * Created by pancho111203 on 22/12/15.
 */
module app.header {
    export class ConfigDialogService {
        public enableFilter: boolean = true;
    }
    angular.module('app.header').service('ConfigDialogService', ConfigDialogService);
}