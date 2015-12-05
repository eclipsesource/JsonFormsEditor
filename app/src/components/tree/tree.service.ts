/// <reference path="model/treeElement.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module app.tree {

    export class TreeService {

        public elements : TreeElement[] = [];
        private id: number;

        constructor(){
            var root = new TreeElement(0, "VerticalLayout");
            root["isDeletable"] = function() {
                return false;
            };
            this.elements.push(root);
            this.id = 1;
        }

        getNewId() : number {
            return this.id++;
        }

    }

    angular.module('app.tree')
        .service('TreeService', TreeService);

}