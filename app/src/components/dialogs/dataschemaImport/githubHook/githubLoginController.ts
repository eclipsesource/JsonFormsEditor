/**
 * Created by pancho111203 on 12/02/16.
 */

module app.dialogs.dataschemaimport{
    class GithubLoginController{
        constructor(){
            //TODO make it more secure and put identifier
            opener.postMessage(window.location.href, "*");
        }
    }
    angular.module('app.dialogs').controller('GithubLoginController', GithubLoginController);
}