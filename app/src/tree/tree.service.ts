module app.tree {

    export class TreeService {

        public elements : TreeElement[] = [new TreeElement(1, TreeElementType.Label, [new TreeElement(2, TreeElementType.Button, [new TreeElement(3, TreeElementType.TextField, [])]), new TreeElement(4, TreeElementType.Label, [])])];

        removeElement(elem : TreeElement){
            this.elements.splice(this.elements.indexOf(elem), 1);
        }

        addElement(elem: TreeElement){
            this.elements.push(elem);
        }

        getElement(id : number) : TreeElement {
            return new TreeElement(id, TreeElementType.Button, []);
        }

    }

    angular.module('app.tree')
        .service('TreeService', TreeService);

}