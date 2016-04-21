/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var tree;
    (function (tree) {
        'use strict';
        angular.module('app.tree', [
            'ui.tree'
        ]);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
