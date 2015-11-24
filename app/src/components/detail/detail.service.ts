module app.detail {
    export class DetailService {

        public currentElement : app.tree.TreeElement;

        setElement(element : app.tree.TreeElement) : void {
            this.currentElement = element;
        }

    }

    angular.module('app.detail').service('DetailService', DetailService);
}