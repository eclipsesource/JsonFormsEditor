var app;
(function (app) {
    var core;
    (function (core) {
        var connectors;
        (function (connectors) {
            var GithubFileLevel = (function () {
                function GithubFileLevel(initialData, parentLevel) {
                    this.parentLevel = parentLevel;
                    this.childs = {};
                    this.files = initialData.map(function (obj) { return new connectors.GithubFile(obj); });
                }
                GithubFileLevel.prototype.getFiles = function () {
                    return this.files;
                };
                GithubFileLevel.prototype.getParent = function () {
                    return this.parentLevel;
                };
                GithubFileLevel.prototype.hasParent = function () {
                    return this.parentLevel !== null;
                };
                GithubFileLevel.prototype.getChild = function (name) {
                    return this.childs[name];
                };
                GithubFileLevel.prototype.addChild = function (name, child) {
                    this.childs[name] = child;
                };
                return GithubFileLevel;
            })();
            connectors.GithubFileLevel = GithubFileLevel;
        })(connectors = core.connectors || (core.connectors = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
