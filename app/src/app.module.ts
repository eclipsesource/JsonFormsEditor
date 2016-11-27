/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.header',
        'app.tree',
        'app.detail',
        'app.toolbox',
        'app.layouts',
        'app.preview',
        'app.dialogs',
        'app.demo',
        'ui.router',
        'ngMaterial',
        'ngclipboard'
    ]);
}





