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
            if(this.elements[0] === null || typeof this.elements[0] === "undefined"){
                return "";
            }
            return this.elements[0].toJSONString();
        }

        generateTreeFromExistingUISchema(uiSchema:any) {
            this.elements.splice(0, this.elements.length);
            this.layoutsService.getElementByType(uiSchema.type).then((element:LayoutToolboxElement) => {
                var rootElement:TreeElement = element.convertToTreeElement();
                rootElement['root'] = 'root';
                for (var i = 0; i < uiSchema.elements.length; i++) {
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
                    for (var i = 0; i < uiSchema.elements.length; i++) {
                        this.generateTreeElement(treeElement, uiSchema.elements[i]);
                    }
                    parent.addElement(treeElement);
                });
            }

        }

    }

    angular.module('app.tree').service('TreeService', TreeService);

}