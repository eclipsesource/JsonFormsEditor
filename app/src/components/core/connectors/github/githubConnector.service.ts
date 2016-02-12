module app.core.connectors {

    import IHttpService = angular.IHttpService;
    import IIntervalService = angular.IIntervalService;
    import IWindowService = angular.IWindowService;
    import IPromise = angular.IPromise;

    export class GithubConnector {

        static $inject = ['$http', '$window', '$interval'];
        private clientId = "eb3f6d895c1d6b03d2c0";
        private clientSecret = "b487be2a04025ca68c25dadcde394d83e241b907";

        constructor(private $http:IHttpService, private $window:IWindowService, private $interval:IIntervalService) {

        }

        showPopupGithub(callback): void {
            var left = screen.width / 2 - 200;
            var top = screen.height /2 - 200;
            var popup = this.$window.open('https://github.com/login/oauth/authorize?client_id='+this.clientId+'&scope=repos', '', "top="+top+", left="+left+", width=400, height=500");
            var interval = 1000;

            var i = this.$interval(function(){
                var code = this.getAuthCode(window.location.href);
                if (code) {
                    popup.close();
                    this.$interval.cancel(i);
                    this.getToken(code, callback);
                }else {
                    if (popup.closed) this.$interval.cancel(i);
                }

            }, interval);
        }

        getAuthCode(url:string) {
            var error = url.match("/[&\?]error=([^&]+)/");
            if (error) return null;
            return url.match("/[&\?]code=([\w\/\-]+)/")[1];
        }

        getToken(code:string, callback):void{
            this.$http.post("github.com/login/oauth/access_token", {
                "code":code,
                "client_id": this.clientId,
                "client_secret": this.clientSecret
            }).success((response:any) => {
                callback(response);
            }).error((error:any) => {
                console.log(error);
                callback(null);
            });
        }

        selectRepo(repo:any):IPromise<any> {
            return this.$http.get("/repos/:owner/:repo/contents/:path", {
            });
        }
    }

    angular.module('app.core').service('GithubConnector', GithubConnector);
}