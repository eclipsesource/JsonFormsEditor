/**
 * Created by pancho111203 on 20/12/15.
 */

module app.toolbox {

    import DataschemaService = app.core.dataschema.DataschemaService;
    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import ToolboxElement = app.core.model.ToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import DataschemaProperty = app.core.dataschema.DataschemaProperty;
    import Metaschema = app.core.metaschema.Metaschema;
    import Definition = app.core.metaschema.Definition;
    import MetaschemaService = app.core.metaschema.MetaschemaService;
    import IPromise = angular.IPromise;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;
    import ElementsConfigService = app.core.elementsConfig.ElementsConfigService;
    import ElementConfig = app.core.elementsConfig.ElementConfig;
    import LayoutsService = app.layouts.LayoutsService;

    export class ToolboxService {
        static $inject = ['DataschemaService', '$q', 'LayoutsService'];

        public elements:ControlToolboxElement[] = [];


        constructor(public dataschemaService:DataschemaService, private $q:IQService, private layoutsService:LayoutsService) {
            this.loadSchemaElements(demoSchema);
        }

        /**
         * Adds a new DataschemaProperty into the dataschema and adds the corresponding ToolboxElement.
         * @param property the DataschemaProperty to add
         * @param path the path to the property in the dataschema, e.g. ['person', 'adress']
         * @returns {boolean} true, if the addition was successful
         */
        addSchemaElement(property:DataschemaProperty, path:string[]):boolean {
            // TODO Fix the validation, so that there cannot be 2 schema elements with the same name in the same path of the toolbox(nor in dataschema)
            if (this.dataschemaService.containsProperty(property) || !property.isValid()) {
                return false;
            }

            if (this.dataschemaService.addNewProperty(property, path)) {
                var element:ControlToolboxElement = new ControlToolboxElement(property.getName(), property.getType(), property.getName());
                this.elements.push(element);
                return true;
            } else {
                return false;
            }
        }

        /**
         * Removes the ControlToolboxElement from the Dataschema.
         *
         * @param element the element to be removed.
         * @returns {boolean} returns true, if the element was successfully removed
         */
        removeSchemaElement(element:ControlToolboxElement):boolean {
            var {name, path} = this.convertScopeToPathAndName(element.getScope());
            if (this.dataschemaService.removeProperty(name, path)) {
                return _.remove(this.elements, element).length === 1;
            } else {
                return false;
            }
        }

        /**
         * Used for retrieving the data element associated with the given TreeElement.
         * @param treeElement
         * @returns {IPromise<ToolboxElement>}
         */
        getAssociatedToolboxElement(treeElement:TreeElement):IPromise<ToolboxElement> {
            var deffered:IDeferred<LayoutToolboxElement> = this.$q.defer();

            if (treeElement.getType() != 'Control') {
                //Layouts
                this.layoutsService.getElementByType(treeElement.getType()).then((element:LayoutToolboxElement)=> {
                    deffered.resolve(element);
                });
            } else {
                //Controls
                deffered.resolve(this.getElementByScope(treeElement.getScope()));
            }

            return deffered.promise;
        }

        private loadSchemaElements(jsonWithDataSchema:any) {
            this.dataschemaService.loadFromJson(jsonWithDataSchema);

            var schemaProperties:DataschemaProperty[] = this.dataschemaService.getProperties();
            _.forEach(schemaProperties, (property:DataschemaProperty) => {
                this.elements.push(new ControlToolboxElement(this.convertScopeToLabel(property.getName()), property.getType(), property.getName()));
            });
        }

        private convertScopeToPathAndName(scope:string):{name:string, path:string[]} {
            var path:string[] = scope.split('/');
            var name:string = path[path.length - 1];

            path.splice(path.length - 1, 1);

            return {
                name: name,
                path: path
            }
        }

        private convertScopeToLabel(scope:string):string {
            var name = scope.split('/').pop();

            return _.startCase(name);
        }

        private getElementByScope(scope:string):ControlToolboxElement {
            return _.find(this.elements, (element:ControlToolboxElement) => {
                return element.getScope() === scope;
            });
        }
    }

    angular.module('app.toolbox').service('ToolboxService', ToolboxService);
}

var demoSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 3
        },
        "age": {
            "type": "integer"
        },
        "gender": {
            "type": "string",
            "enum": ["Male", "Female"]
        },
        "height": {
            "type": "number"
        }
    }
};
