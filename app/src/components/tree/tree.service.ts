module app.tree {

    export class TreeService {

        static $inject = ['ElementsFactoryService'];

        public elements : any = [];

        constructor(elementsFactoryService: app.core.ElementsFactoryService){
            var rootElement: any = elementsFactoryService.getNewElement("VerticalLayout");
            rootElement.root = "root";
            this.elements.push(rootElement);
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