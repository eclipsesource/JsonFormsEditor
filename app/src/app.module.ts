/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.header',
        'app.tree',
        'app.toolbox',
        'app.layouts',
        'ngMaterial',
        'ngClipboard',
        'app.detail',
        'jsonforms'
    ]);
}





