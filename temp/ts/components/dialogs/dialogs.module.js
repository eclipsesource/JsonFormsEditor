var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var config = app.core.StaticConfig.config;
        var baseDeps = ['angularFileUpload'];
        var hooks = config['app.dialogs'];
        var deps = baseDeps.concat(hooks);
        angular.module('app.dialogs', deps);
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
