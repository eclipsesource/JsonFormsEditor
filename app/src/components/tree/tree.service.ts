module app.tree {

    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxService = app.toolbox.ToolboxService;

    export class TreeService {

        static $inject = ['ToolboxService'];

        public elements:TreeElement[] = [];

        constructor(private toolboxService:ToolboxService) {
            toolboxService.getExpertElementOfType('VerticalLayout').then((element:LayoutToolboxElement) => {
                var rootElement:TreeElement = element.convertToTreeElement();
                rootElement['root'] = 'root';
                this.elements.push(rootElement);
            });
        }

        exportUISchemaAsJSON():string {
            return JSON.stringify(this.elements[0], function (key, value) {

                if (value == "") {
                    return undefined;
                }

                if (key == "scope") {
                    return {"$ref": "#/properties/" + value};
                }

                switch (key) {
                    case "id":
                    case "$$hashKey":
                    case 'root':
                    case "metaData":
                        return undefined;
                        break;
                }

                return value;
            }, 2 /* two spaces as indentation */);
        }

    }

    angular.module('app.tree').service('TreeService', TreeService);

}