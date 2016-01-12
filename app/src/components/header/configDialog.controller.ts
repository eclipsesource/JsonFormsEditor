/**
 * Created by pancho111203 on 22/12/15.
 */
module app.header {

    import IDialogService = angular.material.IDialogService;
    import ConfigService = app.core.ConfigService;

    export class ConfigDialogController {

        static $inject = ['$mdDialog', 'ConfigService'];

        constructor(private $mdDialog:IDialogService, public configService:ConfigService) {
        }

        hideConfigDialog():void {
            this.$mdDialog.hide();
        }
    }
}