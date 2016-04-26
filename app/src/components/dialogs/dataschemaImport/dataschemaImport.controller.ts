module app.dialogs.dataschemaimport {
    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;
    import TreeService = app.tree.TreeService;
    import IToastService = angular.material.IToastService;
    import IScope = angular.IScope;
    import ValidatorService = app.core.ValidatorService;


    export class DataschemaImportController extends AbstractWizard {

        static $inject = ['$mdDialog', 'DataschemaImportService', 'ValidatorService', 'ToolboxService', 'TreeService', '$scope', '$mdToast', '$rootScope'];


        constructor($mdDialog:IDialogService, public importService:DataschemaImportService, public validatorService:ValidatorService, private toolboxService:ToolboxService,
                    private treeService:TreeService, private $scope:any, public $mdToast:IToastService, public $rootScope:IScope) {
            super($mdDialog, $rootScope, validatorService);
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
                var dataschema = json.dataSchema;
                var uischema = json.uiSchema;
                if (!dataschema){
                    throw new Error('DataSchema is undefined!');
                }
                if (!this.validatorService.validateDataschema(dataschema)) {
                 var error = 'The Dataschema is not valid';
                 this.showNotification(error);
                 throw new Error(error);
                 }
                this.toolboxService.loadSchema(dataschema);

                if (uischema) {
                    if (!this.validatorService.validateUISchema(uischema)) {
                     var error = 'The UISchema is not valid';
                     this.showNotification(error);
                     throw new Error(error);
                     }
                    this.treeService.generateTreeFromExistingUISchema(uischema);
                }

                this.hideDialog();
            });
        }
    }


}