module app.detail {
    export class DetailService {

        public currentElement : app.tree.TreeElement;

        setElement(element : app.tree.TreeElement) : void {
            this.currentElement = element;
        }

        fetchData() : any {
            return () => {
                return {
                    "id": this.currentElement ? this.currentElement.getId() : 0,
                    "title": this.currentElement ? this.currentElement.getTitle() : ""
                }
            }
        }

    }

    angular.module('app.detail').service('DetailService', DetailService);
}