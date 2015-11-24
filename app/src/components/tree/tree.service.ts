/// <reference path="model/treeElement.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module app.tree {

    export class TreeService {

        public elements : TreeElement[] = [];
        private id: number;

        constructor(){
            this.elements.push(new TreeElement(0, TreeElementType.VerticalLayout, [new TreeElement(1, TreeElementType.HorizontalLayout, [])]));
            this.id = 2;
        }

        getNewId() : number {
            return this.id++;
        }

        //not tested
        getElement(id : number) : TreeElement {
            var res = null;
            for(var i = 0; i < this.elements.length; i++) {
                res = this.getElementRec(id, this.elements[i]);
                if(res != null)
                    return res;
            }
            return null;
        }

        getElementRec(id : number, el: TreeElement) : TreeElement{
            if(el.id == id){
                return el;
            }else {
                var res;
                for(var i = 0; i < el.nodes.length; i++){
                    res = this.getElementRec(id, el.nodes[i]);
                    if(res != null){
                        return res;
                    }
                }
            }
            return null;
        }

    }

    angular.module('app.tree')
        .service('TreeService', TreeService);

}