module app.dialogs {

    import IDialogService = angular.material.IDialogService;
    import ValidatorService = app.core.ValidatorService;

    export class ExportDialogController extends AbstractDialog {

        static $inject = ['$scope', '$mdDialog', 'ValidatorService', 'uiSchema', 'dataSchema'];

        public selectedIndex:number = 0;

        public url;
        public activeSchemaFileName:string;

        public isUISchemaValid:boolean = true;
        public validationErrorMessage:string = "The UI Schema contains validation errors";
        
        constructor($scope, public $mdDialog:IDialogService, private validatorService:ValidatorService, public uiSchema:string, public dataSchema:string) {
            super($mdDialog);
            this.onChangeActiveTab();

            var validation = this.validatorService.validateUISchema(uiSchema);
            this.isUISchemaValid = validation && validation.valid;

            $scope.$watch(() => { return this.selectedIndex; }, (current, old) => {
                if (current != old) this.onChangeActiveTab();
            });
        }

        getActiveSchema():string {
            switch (this.selectedIndex) {
                case 1:
                    return this.dataSchema;
                default:
                    return this.uiSchema;
            }
        }

        getActiveSchemaFileName():string {
            switch (this.selectedIndex) {
                case 1:
                    return "data_schema.json";
                default:
                    return "ui_schema.json";
            }
        }

        onChangeActiveTab() {
            var schema:string = this.getActiveSchema();
            var blob = new Blob([schema], {type: 'text/plain'});
            this.url = window.URL.createObjectURL(blob);

            this.activeSchemaFileName = this.getActiveSchemaFileName();
        }

        downloadSchema() {
            document.getElementById("a").click();
        }

        hideExportDialog():void {
            this.$mdDialog.hide();
        }
    }
}