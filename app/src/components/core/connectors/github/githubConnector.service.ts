module app.core.connectors {

    import IHttpService = angular.IHttpService;
    import IIntervalService = angular.IIntervalService;
    import IWindowService = angular.IWindowService;

    export class GithubConnector {

        static $inject = ['$http', '$window', '$interval'];
        private clientId = "eb3f6d895c1d6b03d2c0";

        constructor(private $http:IHttpService, private $window:IWindowService, private $interval:IIntervalService) {

        }

        showPopupGithub(): void{
            var left = screen.width / 2 - 200;
            var top = screen.height /2 - 200;
            var popup = this.$window.open('https://github.com/login/oauth/authorize?client_id='+this.clientId+'&scope=repos', '', "top="+top+", left="+left+", width=400, height=500");
            var interval = 1000;

            var i = this.$interval(function(){
                console.log(popup);
            }, interval);
        }

        getToken(callback):void{

        }
        login() {

        }
    }

    angular.module('app.core').service('GithubConnector', GithubConnector);
}