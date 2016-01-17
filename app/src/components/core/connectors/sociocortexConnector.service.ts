module app.core.connectors {
    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    export class SocioCortexConnector {

        private workspaces;

        static $inject = ['$http'];

        constructor(private $http:IHttpService){

        }

        login(username:string, password:string):IPromise<any>{
            var encodedLoginData = window.btoa(username + ":" + password);

            return this.$http.get('http://server.sociocortex.com/api/v1/workspaces', {
                headers: {'Authorization': 'Basic ' + encodedLoginData}
            }).success((response) => {
                this.workspaces = response;
            });
        }

        getWorkspaces(){
            return this.workspaces;
        }

    }

    angular.module('app.core').service('SocioCortexConnector', SocioCortexConnector);
}