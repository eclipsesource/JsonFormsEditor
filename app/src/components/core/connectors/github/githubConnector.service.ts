module app.core.connectors {

    import IHttpService = angular.IHttpService;
    import IIntervalService = angular.IIntervalService;
    import IWindowService = angular.IWindowService;
    import IPromise = angular.IPromise;

    export class GithubConnector {

        static $inject = ['$http', '$window', '$interval'];
        private clientId = "e259d761d8d0805e29ad";
        private clientSecret = "d34f0f9034dfdf25739e12c3f1861d084d5021ff";

        constructor(private $http:IHttpService, private $window:IWindowService, private $interval:IIntervalService) {

        }

        showPopupGithub(callback): void {
            var left = screen.width / 2 - 200;
            var top = screen.height /2 - 200;
            var popup = this.$window.open('/github/login', '', "top="+top+", left="+left+", width=400, height=500");


            window.onmessage = (event) => {
	    //TODO detect only pertinent message
                  var code = this.getAuthCode(event.data);
                  if(code){
                      popup.close();
                      this.getToken(code,callback);
                  }
            };

        }

        getAuthCode(url:string) {
            var error = url.match(/[&\?]error=([^&]+)/);
            if (error) return null;
            var match = url.match(/[&\?]code=([\w\/\-]+)/)[1];
            return match;
        }

        getToken(code:string, callback):void{
            console.log(code);
            var req = {
                "method": "POST",
                "url": "https://github.com/login/oauth/access_token",
                "headers": {
                    "Access-Control-Allow-Origin":"*"
                },
                "data": {
                    "code":code,
                    "client_id": this.clientId,
                    "client_secret": this.clientSecret
                }
            } as ng.IRequestConfig;


            this.$http(req).then((response) => {
                console.log('response');
                console.log(response);
                callback(response);
            }, (error) => {
                console.log('error');
                console.log(error);
                callback(null);
            });
        }

        selectRepo(repo:any):IPromise<any> {
            console.log('select Repo');
            return this.$http.get("/repos/:owner/:repo/contents/:path", {
            });
        }
    }

    angular.module('app.core').service('GithubConnector', GithubConnector);
}