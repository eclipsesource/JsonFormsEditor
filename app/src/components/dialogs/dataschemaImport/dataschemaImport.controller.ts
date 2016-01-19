module app.dialogs.dataschemaimport {
    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;

    export class DataschemaImportController extends AbstractWizard {

        static $inject = ['$mdDialog', 'DataschemaImportService', 'ToolboxService'];

        constructor($mdDialog:IDialogService, public importService:DataschemaImportService, private toolboxService:ToolboxService) {
            super($mdDialog);
            this.addSteps([new ChooseUploadStepController(this)]);
        }

        shallReset():boolean {
            return true;
        }


        submit():void {
            this.currentStep().submit().then((json:any) => {
                this.toolboxService.loadSchema(json);
                this.hideDialog();
            });
        }
    }


}