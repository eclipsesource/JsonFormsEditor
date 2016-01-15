module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IHttpService = angular.IHttpService;
    import ToolboxService = app.toolbox.ToolboxService;

    export class FromUrlHookController {

        static $inject = ['$mdDialog', '$http', 'ToolboxService'];

        public url:string;

        constructor(private $mdDialog:IDialogService, private $http:IHttpService, private toolboxService:ToolboxService) {

        }

        complete():void {
            this.$http.get(this.url).success((json:any) => {
                this.toolboxService.loadSchema(json);
                this.$mdDialog.hide();
            }).error((error:any) => {
                console.log(error);
            });
        }

        cancel():void {
            this.$mdDialog.hide();
        }
    }
}