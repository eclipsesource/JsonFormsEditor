module app.core.connectors {

    import IHttpService = angular.IHttpService;

    export class GithubConnector {

        static $inject = ['$http'];

        constructor(private $http:IHttpService) {

        }

        login() {

        }
    }

    angular.module('app.core').service('githubConnector', GithubConnector);
}