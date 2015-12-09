/// <reference path="../../../../typings/lodash/lodash.d.ts" />
var app;
(function (app) {
    var core;
    (function (core) {
        var ElementsFactoryService = (function () {
            function ElementsFactoryService(metaSchemaService) {
                this.id = 0;
                this.elements = {};
                var metaSchema = metaSchemaService.getMetaSchema();
                var elementType;
                for (var i = 0; i < metaSchema.getDefinitions().length; i++) {
                    for (var j = 0; j < metaSchema.getDefinitions()[i].getTypeEnum().length; j++) {
                        elementType = metaSchema.getDefinitions()[i].getTypeEnum()[j];
                        this.elements[elementType] = JSON.parse(JSON.stringify(metaSchema.getDefinitions()[i].initialData));
                        this.elements[elementType].type = elementType;
                        this.elements[elementType].id = -1;
                    }
                }
            }
            ElementsFactoryService.prototype.getNewId = function () {
                return this.id++;
            };
            ElementsFactoryService.prototype.getElementsAsArray = function () {
                var elementsAsArray = [];
                _.forEach(this.elements, function (element) {
                    elementsAsArray.push(element);
                });
                return elementsAsArray;
            };
            ElementsFactoryService.prototype.getNewElement = function (type) {
                var element = this.getFakeElement(type);
                element.id = this.getNewId();
                return element;
            };
            ElementsFactoryService.prototype.getFakeElement = function (type) {
                return JSON.parse(JSON.stringify(this.elements[type]));
            };
            ElementsFactoryService.$inject = ['MetaSchemaService'];
            return ElementsFactoryService;
        })();
        core.ElementsFactoryService = ElementsFactoryService;
        angular.module('app.core').service('ElementsFactoryService', ElementsFactoryService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=ElementsFactoryService.js.map