/**
 * Created by pancho111203 on 17/02/16.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var connectors;
        (function (connectors) {
            var GithubFile = (function () {
                function GithubFile(json) {
                    this.json = json;
                }
                GithubFile.prototype.getName = function () {
                    return this.json.path;
                };
                GithubFile.prototype.getType = function () {
                    return this.json.type;
                };
                GithubFile.prototype.getUrl = function () {
                    return this.json.url;
                };
                return GithubFile;
            })();
            connectors.GithubFile = GithubFile;
        })(connectors = core.connectors || (core.connectors = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
