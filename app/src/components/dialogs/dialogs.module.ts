
module app.dialogs {
    var config:any = app.core.StaticConfig.config;

    var baseDeps = ['angularFileUpload'];
    var hooks = config['app.dialogs'];

    var deps = baseDeps.concat(hooks);


    angular.module('app.dialogs', deps);
}

