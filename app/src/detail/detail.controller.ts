/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {

    class DetailController {
        public data : any;
        public uiSchema : any;
        public schema : any;

        static $inject = ['$stateParams', 'TreeElementService'];

        constructor($stateParams : any, treeElementService : app.tree.TreeService){
            var id = $stateParams['id'];

            this.data = treeElementService.getElement(id);
        }
    }

    angular.module('app.detail').controller('DetailController', DetailController);
}

