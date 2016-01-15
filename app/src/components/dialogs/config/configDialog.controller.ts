/**
 * Created by pancho111203 on 22/12/15.
 */
module app.dialogs {

    import IDialogService = angular.material.IDialogService;
    import ConfigService = app.core.ConfigService;

    export class ConfigDialogController extends AbstractDialog {

        static $inject = ['$mdDialog', 'ConfigService'];

        constructor($mdDialog:IDialogService, public configService:ConfigService) {
            super($mdDialog);
        }

    }
}