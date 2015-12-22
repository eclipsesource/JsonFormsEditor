/**
 * Created by pancho111203 on 22/12/15.
 */
module app.header {

    import IDialogService = angular.material.IDialogService;

    export class ConfigDialogController {


        static $inject = ['$mdDialog', 'ConfigDialogService'];

        constructor(private $mdDialog:IDialogService, public configService: ConfigDialogService) {
        }

        hideConfigDialog():void {
            this.$mdDialog.hide();
        }
    }
}