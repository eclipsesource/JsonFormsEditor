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
            this.elements = [];
            this.layoutsService.getElementByType(uiSchema.type).then((element:LayoutToolboxElement) => {
                var rootElement:TreeElement = element.convertToTreeElement();
                rootElement['root'] = 'root';
                for(var i = 0; i < uiSchema.elements.length; i++) {
                    this.generateTreeElement(uiSchema.elements[i]).then((childElement:TreeElement) => {
                        rootElement.addElement(childElement);
                    });
                }
                this.elements.push(rootElement);
            });
        }

        private generateTreeElement(uiSchema:any):IPromise<TreeElement> {
            var treeElement:TreeElement;
            if (uiSchema.type == "Control") {
                treeElement = this.toolboxService.getElementByScope(uiSchema.scope.$ref).convertToTreeElement();
                treeElement.setLabel(uiSchema.label);
                var deffered:IDeferred<TreeElement> = this.$q.defer();

                deffered.resolve(treeElement);

                return deffered.promise;
            } else {
                this.layoutsService.getElementByType(uiSchema.type).then((element:LayoutToolboxElement) => {
                    treeElement = element.convertToTreeElement();
                    for(var i = 0; i < uiSchema.elements.length; i++) {
                        this.generateTreeElement(uiSchema.elements[i]).then((childElement:TreeElement) => {
                            treeElement.addElement(childElement);
                            if (i == uiSchema.elements.length - 1) {
                                var deffered:IDeferred<TreeElement> = this.$q.defer();

                                deffered.resolve(treeElement);

                                return deffered.promise;
                            }
                        });
                    }
                });
            }
        }

    }

    angular.module('app.tree').service('TreeService', TreeService);

}