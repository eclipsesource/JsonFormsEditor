module app.core.connectors {

    import IHttpService = angular.IHttpService;
    import IIntervalService = angular.IIntervalService;
    import IWindowService = angular.IWindowService;
    import IPromise = angular.IPromise;

    import IQService = angular.IQService;

    export class GithubConnector {

        static $inject = ['$http', '$window', '$q'];
	
	private repoList;
	
        constructor(private $http:IHttpService, private $window:IWindowService, private $q: IQService) {
        }

        showPopupGithub(): IPromise<any> {
            var left = screen.width / 2 - 200;
            var top = screen.height /2 - 200;
            var popup = this.$window.open('/github/login', '', "top="+top+", left="+left+", width=400, height=500");
	    
	    var deferred = this.$q.defer();
	    
            window.onmessage = (event) => {
                //TODO detect only pertinent message
                popup.close();
                var data = event.data;
		this.repoList = JSON.parse(data.body);
		console.log(this.repoList);
		deferred.resolve();
            };
	    return deferred.promise;

        }

	getRepoList(): any{
	    return this.repoList;
	}

        selectRepo(repo:any):IPromise<any> {
            return this.$http.get("/repos/:owner/:repo/contents/:path", {
            });
        }
    }

    angular.module('app.core').service('GithubConnector', GithubConnector);
}