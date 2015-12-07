/**
 * Created by pancho111203 on 7/12/15.
 */
module app{
    class AppController{
        static $inject = ["TreeService"];

        constructor(public treeService:any){
        }

        alertWithOutputUISchema(){
            alert(this.treeService.exportUISchemaAsJSON());
        }
    }

    angular.module('app').controller("AppController", AppController);
}

