var app;
(function (app) {
    var core;
    (function (core) {
        var connectors;
        (function (connectors) {
            var GithubConnector = (function () {
                function GithubConnector($http, $window, $q, $location) {
                    this.$http = $http;
                    this.$window = $window;
                    this.$q = $q;
                    this.$location = $location;
                    this.url = $location.protocol() + "://" + $location.host() + ":" + $location.port();
                    this.fileLoaders = [];
                    // We need one fileLoader per schema (ui-schema and data-schema)
                    this.addFileLoader();
                    this.addFileLoader();
                }
                GithubConnector.prototype.addFileLoader = function () {
                    return this.fileLoaders.push(new connectors.FileLoader());
                };
                GithubConnector.prototype.getFileLoader = function (index) {
                    return this.fileLoaders[index];
                };
                GithubConnector.prototype.showPopupGithub = function () {
                    var _this = this;
                    var left = screen.width / 2 - 200;
                    var top = screen.height / 2 - 200;
                    var popup = this.$window.open('/github/login', '', "top=" + top + ", left=" + left + ", width=400, height=500");
                    var deferred = this.$q.defer();
                    window.onmessage = function (event) {
                        //TODO detect only pertinent message
                        popup.close();
                        var data = event.data;
                        _this.repoList = JSON.parse(data.body);
                        deferred.resolve();
                    };
                    return deferred.promise;
                };
                GithubConnector.prototype.getRepoList = function () {
                    return this.repoList;
                };
                GithubConnector.prototype.getBranchList = function (repoName) {
                    return this.$http.get(this.url + "/github/getBranchList?repoName=" + repoName, {});
                };
                GithubConnector.prototype.getFilesFromBranch = function (repoName, branchName) {
                    var _this = this;
                    return this.$http.get(this.url + "/github/getFilesFromBranch?repoName=" + repoName + "&branchName=" + branchName, {})
                        .success(function (result) {
                        _this.fileLevel = new connectors.GithubFileLevel(result, null);
                    });
                };
                GithubConnector.prototype.getFileLevel = function () {
                    return this.fileLevel;
                };
                GithubConnector.prototype.goIntoFolder = function (file) {
                    var _this = this;
                    if (file.getType() !== 'tree') {
                        throw new Error('Calling method "goIntoFolder" with a regular file instead of a folder!');
                    }
                    // Here I'm reusing previously loaded fileLevels
                    if (this.fileLevel) {
                        var child = this.fileLevel.getChild(file.getName());
                        if (child) {
                            this.fileLevel = child;
                            return this.$q.when(child);
                        }
                    }
                    return this.$http.get(this.url + "/github/getFileLevel?url=" + file.getUrl())
                        .success(function (result) {
                        var previousLevel = _this.fileLevel;
                        _this.fileLevel = new connectors.GithubFileLevel(result, previousLevel);
                        previousLevel.addChild(file.getName(), _this.fileLevel);
                    });
                };
                GithubConnector.prototype.goToParentFolder = function () {
                    this.fileLevel = this.fileLevel.getParent();
                };
                GithubConnector.prototype.hasParentFolder = function () {
                    return this.fileLevel.hasParent();
                };
                GithubConnector.prototype.loadFile = function (file, fileSelectorId) {
                    var _this = this;
                    return this.$http.get(this.url + "/github/loadFile?url=" + file.getUrl())
                        .then(function (result) {
                        try {
                            _this.fileLoaders[fileSelectorId].loadedFile = result.data;
                            _this.fileLoaders[fileSelectorId].loadedFileContents = JSON.parse(atob(result.data.content));
                            return _this.fileLoaders[fileSelectorId].loadedFileContents;
                        }
                        catch (error) {
                            throw new Error('Invalid Json Object! Select another one');
                        }
                    });
                };
                GithubConnector.$inject = ['$http', '$window', '$q', '$location'];
                return GithubConnector;
            })();
            connectors.GithubConnector = GithubConnector;
            angular.module('app.core').service('GithubConnector', GithubConnector);
        })(connectors = core.connectors || (core.connectors = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
