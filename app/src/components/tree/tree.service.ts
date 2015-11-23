/// <reference path="model/treeElement.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module app.tree {

    export class TreeService {

        public elements : TreeElement[] = [];
        public id: number = 0;

        constructor(){

            var parent : TreeElement = this.addElementInside(null, TreeElementType.VerticalLayout);
            this.addElementInside(parent, TreeElementType.HorizontalLayout);
        }

        removeElement(elem : TreeElement){
            if(elem.parent != null){
                elem.parent.nodes.splice(elem.parent.nodes.indexOf(elem), 1);
            } else {
                this.elements.splice(this.elements.indexOf(elem), 1);
            }
        }

        addElementInside(elem: TreeElement, type: TreeElementType) : TreeElement{

            var element = new TreeElement(this.id, type, [], elem);
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