var app;
(function (app) {
    var core;
    (function (core) {
        var StaticConfig = (function () {
            function StaticConfig() {
            }
            // 'app.dialogs' -> select components for the schema loader wizard
            StaticConfig.config = { "app.dialogs": [
                    "app.dialogs.empty",
                    "app.dialogs.upload",
                    "app.dialogs.github",
                    "app.dialogs.url"
                ]
            };
            return StaticConfig;
        })();
        core.StaticConfig = StaticConfig;
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
