module app.dialogs {

    import IDialogService = angular.material.IDialogService;

    export class ExportDialogController {

        static $inject = ['$mdDialog', 'uiSchema', 'dataSchema'];

        public selectedIndex:number = 0;

        constructor(private $mdDialog:IDialogService, public uiSchema:string, public dataSchema:string) {
        }

        getActiveSchema():string {
            switch (this.selectedIndex) {
                case 1:
                    return this.dataSchema;
                default:
                    return this.uiSchema;
            }
        }

        hideExportDialog():void {
            this.$mdDialog.hide();
        }
    }
}