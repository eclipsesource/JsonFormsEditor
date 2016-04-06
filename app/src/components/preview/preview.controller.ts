module app.preview {

    import ConfigService = app.core.ConfigService;
    class PreviewController {

        public data:{} = {};

        static $inject = ['PreviewService'];

        constructor(public previewService:PreviewService, public configService:ConfigService) {
        }

        shouldShowNewTabButton(): boolean {
            var split = window.location.href.split('?');
            if(!split){
                return true;
            }
            var queries = _.last(split);
            if(!queries){
                return true;
            }
            if(~queries.indexOf('newTab')){
                return false;
            }
            return true;
        }

        openInNewTab():void {
            this.previewService.openInNewTab();
        }
    }

    angular.module('app.preview').controller('PreviewController', PreviewController);
}