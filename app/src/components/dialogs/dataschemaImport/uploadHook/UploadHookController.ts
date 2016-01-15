module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import ToolboxService = app.toolbox.ToolboxService;

    export class UploadHookController {

        public uploader;

        private json:any;

        static $inject = ['$mdDialog', 'FileUploader', 'ToolboxService'];

        constructor(private $mdDialog:IDialogService, FileUploader, private toolboxService:ToolboxService){
            this.uploader = new FileUploader();

            this.uploader.onAfterAddingFile = (file) => {
                var reader = new FileReader();

                reader.onload = () => {
                    this.json = JSON.parse(reader.result);
                };

                reader.readAsText(file._file);
            };
        }

        complete():void {
            if(this.json){
                this.toolboxService.loadSchema(this.json);
                this.$mdDialog.hide();
            }
        }

        cancel():void {
            this.$mdDialog.hide();
        }
    }
}