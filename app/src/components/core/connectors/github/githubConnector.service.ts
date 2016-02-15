module app.core.connectors {

    import IHttpService = angular.IHttpService;
    import IIntervalService = angular.IIntervalService;
    import IWindowService = angular.IWindowService;
    import IPromise = angular.IPromise;

    export class GithubConnector {

        static $inject = ['$http', '$window'];

        constructor(private $http:IHttpService, private $window:IWindowService) {
        }

        showPopupGithub(callback): void {
            var left = screen.width / 2 - 200;
            var top = screen.height /2 - 200;
            var popup = this.$window.open('/github/login', '', "top="+top+", left="+left+", width=400, height=500");


            window.onmessage = (event) => {
                //TODO detect only pertinent message
                popup.close();
                var data = event.data;
                callback(data);
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