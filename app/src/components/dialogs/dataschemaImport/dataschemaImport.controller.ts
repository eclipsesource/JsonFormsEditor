module app.dialogs.dataschemaimport {
    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;
    import TreeService = app.tree.TreeService;


    export class DataschemaImportController extends AbstractWizard {

        static $inject = ['$mdDialog', 'DataschemaImportService', 'ToolboxService', 'TreeService', '$scope'];


        constructor($mdDialog:IDialogService, public importService:DataschemaImportService, private toolboxService:ToolboxService, private treeService:TreeService, private $scope:any) {
            super($mdDialog);
            this.addSteps([new ChooseUploadStepController(this)]);
        }

        shallReset():boolean {
            return true;
        }

        showNotification(text:string, time:number):void {
            clearTimeout(this.notificationTimerId);
            this.currentNotification = text;
            this.notificationTimerId = setTimeout(()=> {

                this.$scope.$apply(()=> {
                    this.currentNotification = "";
                });
            }, time);
        }


        submit():void {
            this.currentStep().submit().then((json:any) => {
                var dataSchema = json.dataSchema;
                var uiSchema = json.uiSchema;
                if(!dataSchema){
                    throw new Error('DataSchema is undefined!');
                }
                this.toolboxService.loadSchema(dataSchema);

                if (uiSchema) {
                    this.treeService.generateTreeFromExistingUISchema(uiSchema);
                }

                this.hideDialog();
            });
        }
    }


}