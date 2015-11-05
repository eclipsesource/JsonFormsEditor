/// <reference path="../../../app/src/tree/model/treeElement.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.tree {

    export class TreeService {

        public elements : TreeElement[] = [];
        public id: number = 0;

        constructor(){

            var parent : TreeElement = this.addElementInside(null, TreeElementType.VerticalLayout);
            this.addElementInside(parent, TreeElementType.HorizontalLayout);
        }

        removeElement(elem : TreeElement){
            this.elements.splice(this.elements.indexOf(elem), 1);
        }

        addElementInside(elem: TreeElement, type: TreeElementType) : TreeElement{

            var element = new TreeElement(this.id, type, []);
            this.id++;

            if(elem == null){
                this.elements.push(element);
            } else {
                elem.nodes.push(element);
            }

            return element;
        }

        //not tested
        getElement(id : number) : TreeElement {


            return new TreeElement(id, TreeElementType.Button, []);
        }

        getElementRec(id : number, el: TreeElement) : TreeElement{
            if(el.id == id){
                return el;
            }else {
                var res;
                for(var node in el.nodes){
                    if(node.id == id){
                        return node;
                    }
                    res = this.getElementRec(id, node);
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