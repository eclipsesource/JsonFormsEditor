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

        exportUISchemaAsJSON() : string{
            return JSON.stringify(this.elements[0], function(key, value){

                if(value==""){
                    return undefined;
                }

                switch(key){

                    case "id":
                    case "acceptedElements":
                    case "$$hashKey":
                        return undefined;
                        break;

                }

                return value;
            });
        }

    }

    angular.module('app.tree')
        .service('TreeService', TreeService);

}