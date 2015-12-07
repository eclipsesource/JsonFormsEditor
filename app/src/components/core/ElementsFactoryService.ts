/// <reference path="../../../../typings/lodash/lodash.d.ts" />

module app.core {

    export class ElementsFactoryService {

        static $inject = ['MetaSchemaService'];

        private id:number = 0;
        private elements:any = {};

        constructor(metaSchemaService:app.core.metaschema.MetaSchemaService) {
            var metaSchema:app.core.metaschema.MetaSchema = metaSchemaService.getMetaSchema();
            var elementType:string;
            for (var i = 0; i < metaSchema.getDefinitions().length; i++) {
                for (var j = 0; j < metaSchema.getDefinitions()[i].getTypeEnum().length; j++) {
                    elementType = metaSchema.getDefinitions()[i].getTypeEnum()[j];
                    this.elements[elementType] = JSON.parse(JSON.stringify(metaSchema.getDefinitions()[i].initialData));
                    this.elements[elementType].type = elementType;
                    this.elements[elementType].id = -1;
                }
            }
        }

        getNewId():number {
            return this.id++;
        }

        getElementsAsArray():any {
            var elementsAsArray:any = [];
            _.forEach(this.elements, (element:any) => {
                elementsAsArray.push(element);
            });
            return elementsAsArray;
        }

        getNewElement(type:string):any {
            var element:any = JSON.parse(JSON.stringify(this.elements[type]));
            element.id = this.id++;
            return element;
        }

    }

    angular.module('app.core').service('ElementsFactoryService', ElementsFactoryService);

}