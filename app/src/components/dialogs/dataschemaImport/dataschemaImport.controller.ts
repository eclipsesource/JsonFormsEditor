module app.dialogs.dataschemaimport {
    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;
    import TreeService = app.tree.TreeService;
    import IToastService = angular.material.IToastService;
    import IScope = angular.IScope;


    export class DataschemaImportController extends AbstractWizard {

        static $inject = ['$mdDialog', 'DataschemaImportService', 'ToolboxService', 'TreeService', '$scope', '$mdToast', '$rootScope'];


        constructor($mdDialog:IDialogService, public importService:DataschemaImportService, private toolboxService:ToolboxService,
                    private treeService:TreeService, private $scope:any, public $mdToast:IToastService, public $rootScope:IScope) {
            super($mdDialog, $rootScope);
            this.addSteps([new ChooseUploadStepController(this)]);
        }

        shallReset():boolean {
            return true;
        }

        showNotification(text:string):void {
            var parent = document.querySelector('.data-schema-import-dialog');
            var errorNotification = this.$mdToast.simple().textContent(text).position('bottom left').parent(parent).theme('error-toast');

            this.$mdToast.show(errorNotification);
            throw new Error(text);
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