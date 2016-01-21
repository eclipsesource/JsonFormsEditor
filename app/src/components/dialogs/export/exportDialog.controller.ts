module app.dialogs {

    import IDialogService = angular.material.IDialogService;

    export class ExportDialogController extends AbstractDialog {

        static $inject = ['$scope', '$mdDialog', 'uiSchema', 'dataSchema'];

        public selectedIndex:number = 0;

        public url;
        public activeSchemaName:string;
        
        constructor($scope, public $mdDialog:IDialogService, public uiSchema:string, public dataSchema:string) {
            super($mdDialog);
            this.onChangeActiveTab();
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

        getActiveSchemaName():string {
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

            this.activeSchemaName = this.getActiveSchemaName();
        }

        downloadSchema() {
            document.getElementById("a").click();
        }

        hideExportDialog():void {
            this.$mdDialog.hide();
        }
    }
}