module app.dialogs.dataschemaimport {
    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;
    import TreeService = app.tree.TreeService;
    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;

    export class DataschemaImportController extends AbstractWizard {

        static $inject = ['$mdDialog', 'DataschemaImportService', 'ToolboxService', 'SocioCortexConnector', 'TreeService', '$scope'];
	

        constructor($mdDialog:IDialogService, public importService:DataschemaImportService, private toolboxService:ToolboxService, private socioCortexConnector:SocioCortexConnector, private treeService:TreeService, private $scope: any) {
            super($mdDialog);
            this.addSteps([new ChooseUploadStepController(this)]);
        }

        shallReset():boolean {
            return true;
        }

	showNotification(text: string, time: number):void{
            clearTimeout(this.notificationTimerId);
            this.currentNotification = text;
	    console.log(this.currentNotification);
            this.notificationTimerId = setTimeout(()=>{

		this.$scope.$apply(()=>{
			this.currentNotification = "";
		});
            }, time);
        }

        
        submit():void {
            this.currentStep().submit().then((json:any) => {
                this.toolboxService.loadSchema(json);
                if (this.socioCortexConnector.isLoggedWithSocioCortex()) {
                    var uiSchema:any = this.socioCortexConnector.getViewModel();
                    if (uiSchema) {
                        this.treeService.generateTreeFromExistingUISchema(uiSchema);
                    }
                }
                this.hideDialog();
            });
        }
    }


}