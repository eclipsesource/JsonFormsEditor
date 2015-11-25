/// <reference path="model/treeElement.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module app.tree {

    export class TreeService {

        public elements : TreeElement[] = [];
        private id: number;

        constructor(){
            var root = new Layout(0, LayoutType.VerticalLayout);
            root.addNode(new Layout(1, LayoutType.HorizontalLayout));
            this.elements.push(root);
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
            if(el.getId() == id){
                return el;
            }else {
                var res;
                for(var i = 0; el.getNodes() && i < el.getNodes().length; i++){
                    res = this.getElementRec(id, el.getNodes()[i]);
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