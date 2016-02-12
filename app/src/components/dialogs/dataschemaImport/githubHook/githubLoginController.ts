/**
 * Created by pancho111203 on 12/02/16.
 */

module app.dialogs.dataschemaimport{
    class GithubLoginController{
        constructor(){
            opener.postMessage(window.location.href, "github_login");
        }
    }
    angular.module('app.dialogs').controller('GithubLoginController', GithubLoginController);
}