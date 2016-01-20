module app.tree {

    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import LayoutsService = app.layouts.LayoutsService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    import IPromise = angular.IPromise;
    import IDeferred = angular.IDeferred;
    import ToolboxService = app.toolbox.ToolboxService;
    import IQService = angular.IQService;

    export class TreeService extends Observable<PreviewUpdateEvent> {

        static $inject = ['LayoutsService', 'ToolboxService', '$q'];

        public elements:TreeElement[] = [];

        constructor(private layoutsService:LayoutsService, private toolboxService:ToolboxService, private $q:IQService) {
            super();
            layoutsService.getElementByType('VerticalLayout').then((element:LayoutToolboxElement) => {
                var rootElement:TreeElement = element.convertToTreeElement();
                rootElement['root'] = 'root';
                this.elements.push(rootElement);
            });
        }

        exportUISchemaAsJSON():string {
            return JSON.stringify(this.elements[0], (key, value) => {

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

        generateTreeFromExistingUISchema(uiSchema:any) {
            this.elements.splice(0, this.elements.length);
            this.layoutsService.getElementByType(uiSchema.type).then((element:LayoutToolboxElement) => {
                var rootElement:TreeElement = element.convertToTreeElement();
                rootElement['root'] = 'root';
                for(var i = 0; i < uiSchema.elements.length; i++) {
                    this.generateTreeElement(rootElement, uiSchema.elements[i]);
                }
                this.elements.push(rootElement);
            });
        }

        private generateTreeElement(parent:TreeElement, uiSchema:any) {
            var treeElement:TreeElement;
            if (uiSchema.type == "Control") {
                this.toolboxService.increasePlacedTimes(this.toolboxService.getElementByScope(uiSchema.scope.$ref.substring(13)));
                treeElement = this.toolboxService.getElementByScope(uiSchema.scope.$ref.substring(13)).convertToTreeElement();
                treeElement.setLabel(uiSchema.label);
                parent.addElement(treeElement);
            } else {
                this.layoutsService.getElementByType(uiSchema.type).then((element:LayoutToolboxElement) => {
                    treeElement = element.convertToTreeElement();
                    for(var i = 0; i < uiSchema.elements.length; i++) {
                        this.generateTreeElement(treeElement, uiSchema.elements[i]);
                    }
                    parent.addElement(treeElement);
                });
            }

        }

    }

    angular.module('app.tree').service('TreeService', TreeService);

}