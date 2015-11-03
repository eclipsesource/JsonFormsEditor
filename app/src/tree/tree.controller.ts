/// <reference path="../../../typings/angularjs/angular.d.ts" />

module app.tree {
    'use strict';
    class TreeController {

        public world : string;

        static $inject = ['$scope', 'TreeService'];

        constructor(private treeService : app.tree.TreeService){
            this.world = treeService.sayHello();
        }
    }

    angular.module('app.tree').controller('TreeController', TreeController);
}

