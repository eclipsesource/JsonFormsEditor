/**
 * Created by pancho111203 on 17/02/16.
 */
var app;
(function (app) {
    var core;
    (function (core) {
        var connectors;
        (function (connectors) {
            var FileLoader = (function () {
                function FileLoader() {
                }
                return FileLoader;
            })();
            connectors.FileLoader = FileLoader;
        })(connectors = core.connectors || (core.connectors = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=FileLoader.js.map