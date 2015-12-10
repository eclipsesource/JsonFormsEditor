/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />
var app;
(function (app) {
    'use strict';
    angular.module('app', [
        'app.core',
        'app.tree',
        'app.detail',
        'app.toolbox',
        'ngMaterial',
        'ngClipboard'
    ]);
})(app || (app = {}));
//# sourceMappingURL=app.module.js.map