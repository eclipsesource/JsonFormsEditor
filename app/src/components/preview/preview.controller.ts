module app.preview {

    import ConfigDialogController = app.header.ConfigDialogController;
    import ConfigService = app.core.ConfigService;
    class PreviewController {

        public data:{} = {};

        static $inject = ['PreviewService'];

        constructor(public previewService:PreviewService, public configService:ConfigService) {
        }

        openInNewTab():void {
            this.previewService.openInNewTab();
        }
    }

    angular.module('app.preview').controller('PreviewController', PreviewController);
}