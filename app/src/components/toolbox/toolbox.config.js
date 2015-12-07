/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
var app;
(function (app) {
    var toolbox;
    (function (toolbox) {
        'use strict';
        var ToolboxConfig = (function () {
            function ToolboxConfig($stateProvider) {
                $stateProvider.state('toolbox', {
                    views: {
                        'toolbox': {
                            controller: 'ToolboxController',
                            controllerAs: 'toolbox',
                            templateUrl: 'app/src/components/toolbox/toolbox.html'
                        }
                    }
                });
            }
            ToolboxConfig.inject = ['$stateProvider'];
            return ToolboxConfig;
        })();
        angular.module('app.toolbox').config(ToolboxConfig);
    })(toolbox = app.toolbox || (app.toolbox = {}));
})(app || (app = {}));
//# sourceMappingURL=toolbox.config.js.map