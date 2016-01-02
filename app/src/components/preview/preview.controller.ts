module app.preview {

    class PreviewController {

        public data:{} = {};

        static $inject = ['PreviewService'];

        constructor(public previewService:PreviewService) {
        }
    }

    angular.module('app.preview').controller('PreviewController', PreviewController);
}