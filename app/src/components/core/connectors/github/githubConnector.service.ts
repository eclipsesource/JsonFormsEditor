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
                  popup.close();		
		  var code = event.data;
		  callback(code);  
            };

        }

        selectRepo(repo:any):IPromise<any> {
            console.log('select Repo');
            return this.$http.get("/repos/:owner/:repo/contents/:path", {
            });
        }
    }

    angular.module('app.core').service('GithubConnector', GithubConnector);
}