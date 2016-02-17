module app.core.connectors {

    import IHttpService = angular.IHttpService;
    import IIntervalService = angular.IIntervalService;
    import IWindowService = angular.IWindowService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import ILocationService = angular.ILocationService;

    export class GithubConnector {

        static $inject = ['$http', '$window', '$q', '$location'];

        private url;

        private repoList;

        private fileLoaders: FileLoader[];

        constructor(private $http:IHttpService, private $window:IWindowService, private $q:IQService, private $location:ILocationService) {
            this.url = $location.protocol() + "://" + $location.host() + ":" + $location.port();
        }

        addFileLoader(): number{
            return this.fileLoaders.push(new FileLoader());
        }

        getFileLoader(index:number):FileLoader{
            return this.fileLoaders[index];
        }

        showPopupGithub():IPromise<any> {
            var left = screen.width / 2 - 200;
            var top = screen.height / 2 - 200;
            var popup = this.$window.open('/github/login', '', "top=" + top + ", left=" + left + ", width=400, height=500");
            var deferred = this.$q.defer();

            window.onmessage = (event) => {
                //TODO detect only pertinent message
                popup.close();
                var data = event.data;
                this.repoList = JSON.parse(data.body);
                deferred.resolve();
            };
            return deferred.promise;

        }

        getRepoList():any {
            return this.repoList;
        }

        getBranchList(repoName:string):IPromise<any> {
            return this.$http.get(this.url + "/github/getBranchList?repoName=" + repoName, {});
        }

        getFilesFromBranch(repoName:string, branchName:string, fileSelectorId):IPromise<any> {

            return this.$http.get(this.url + "/github/getFilesFromBranch?repoName=" + repoName + "&branchName=" + branchName, {})
                .success((result:Array<any>) => {
                    this.fileLoaders[fileSelectorId].fileLevel = new GithubFileLevel(result, null);
                });
        }

        getFileLevel(fileSelectorId):GithubFileLevel {
            return this.fileLoaders[fileSelectorId].fileLevel;
        }

        goIntoFolder(file:GithubFile, fileSelectorId: string):IPromise<any> {

            if (file.getType() !== 'tree') {
                throw new Error('Calling method "goIntoFolder" with a regular file instead of a folder!');
            }
            // Here I'm reusing previously loaded fileLevels
            if (this.fileLoaders[fileSelectorId].fileLevel) {
                var child = this.fileLoaders[fileSelectorId].fileLevel.getChild(file.getName());
                if (child) {
                    this.fileLoaders[fileSelectorId].fileLevel = child;

                    var deferred = this.$q.defer();
                    deferred.resolve(child);
                    return deferred.promise;
                }
            }
            return this.$http.get(this.url + "/github/getFileLevel?url=" + file.getUrl())
                .success((result:Array<any>) => {
                    var previousLevel = this.fileLoaders[fileSelectorId].fileLevel;
                    this.fileLoaders[fileSelectorId].fileLevel = new GithubFileLevel(result, previousLevel);
                    previousLevel.addChild(file.getName(), this.fileLoaders[fileSelectorId].fileLevel);
                });
        }

        goToParentFolder(fileSelectorId):void {

            this.fileLoaders[fileSelectorId].fileLevel = this.fileLoaders[fileSelectorId].fileLevel.getParent();
        }

        hasParentFolder(fileSelectorId):boolean {
            return this.fileLoaders[fileSelectorId].fileLevel.hasParent();
        }

        loadFile(file:GithubFile, fileSelectorId):IPromise<any> {
            return this.$http.get(this.url + "/github/loadFile?url=" + file.getUrl())
                .then((result:any) => {
                    try{
                        this.fileLoaders[fileSelectorId].loadedFile = result.data;
                        this.fileLoaders[fileSelectorId].loadedFileContents = JSON.parse(atob(result.data.content));
                        return this.fileLoaders[fileSelectorId].loadedFileContents;
                    }catch(error){

                        throw new Error('Invalid Json Object! Select another one');
                    }
                });
        }
    }

    angular.module('app.core').service('GithubConnector', GithubConnector);
}