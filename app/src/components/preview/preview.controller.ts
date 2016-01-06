module app.preview {

    class PreviewController {

        public data:{} = {};

        static $inject = ['PreviewService'];

        constructor(public previewService:PreviewService) {
        }

        openInNewTab():void {
            this.previewService.openInNewTab();
        }
    }

    angular.module('app.preview').controller('PreviewController', PreviewController);
}