/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
var app;
(function (app) {
    var tree;
    (function (tree) {
        'use strict';
        var TreeConfig = (function () {
            function TreeConfig($stateProvider) {
                $stateProvider.state('tree', {
                    views: {
                        'middle_container': {
                            controller: 'MyTreeController',
                            controllerAs: 'tree',
                            templateUrl: 'app/src/components/tree/tree.html'
                        }
                    }
                })
                    .state('tree.detail', {
                    url: '/detail/:nodeId',
                    views: {
                        'detail@': {
                            controller: 'DetailController',
                            controllerAs: 'detail',
                            templateUrl: 'app/src/components/detail/detail.html'
                        }
                    }
                });
            }
            TreeConfig.$inject = ["$stateProvider"];
            return TreeConfig;
        })();
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
//# sourceMappingURL=tree.config.js.map