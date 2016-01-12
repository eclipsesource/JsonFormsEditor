/**
 * Created by pancho111203 on 22/12/15.
 */
module app.core {
    export class ConfigService {
        /**
         * Used for filtering the control elements, to only show those, that are not used in the tree.
         * @type {boolean}
         */
        public enableFilter:boolean = true;

        /**
         * Used to express that this app is currently running in the preview-tab. Therefore some buttons must be hidden.
         * @type {boolean}
         */
        private previewTab:boolean = false;

        isPreviewTab():boolean {
            return this.previewTab;
        }

        setIsPreviewTab() : void {
            this.previewTab = true;
        }
    }
    angular.module('app.core').service('ConfigService', ConfigService);
}