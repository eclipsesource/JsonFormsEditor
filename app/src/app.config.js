/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />
var app;
(function (app) {
    var AppConfig = (function () {
        function AppConfig($stateProvider, $urlRouterProvider, $mdThemingProvider, ngClipProvider) {
            $stateProvider.state('edit', {
                url: '/edit',
                views: {
                    'treeContainer': {
                        controller: 'MyTreeController',
                        controllerAs: 'tree',
                        templateUrl: 'app/src/components/tree/tree.html'
                    },
                    'toolboxContainer': {
                        controller: 'ToolboxController',
                        controllerAs: 'toolbox',
                        templateUrl: 'app/src/components/toolbox/toolbox.html'
                    },
                    'detailContainer': {
                        controller: 'DetailController',
                        controllerAs: 'detail',
                        templateUrl: 'app/src/components/detail/detail.html'
                    }
                }
            });
            $urlRouterProvider.otherwise('/edit');
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo', { 'default': '800' })
                .accentPalette('blue', { 'default': '500' })
                .warnPalette('red', { 'default': '600' });
            ngClipProvider.setPath("resource/ZeroClipboard.swf");
        }
        AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', 'ngClipProvider'];
        return AppConfig;
    })();
    angular.module('app').config(AppConfig);
})(app || (app = {}));
//# sourceMappingURL=app.config.js.map