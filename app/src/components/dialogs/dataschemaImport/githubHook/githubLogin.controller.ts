/**
 * Created by pancho111203 on 12/02/16.
 */

module app.dialogs.dataschemaimport {
    class GithubLoginController{
        static $inject = ['$location'];
        constructor($location:any){
            console.log($location);
        }
    }
    angular.module('app.dialogs').controller('GithubLoginController', GithubLoginController);
}