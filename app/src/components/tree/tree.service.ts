module app.tree {

    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import LayoutsService = app.layouts.LayoutsService;
    import PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
    import IPromise = angular.IPromise;
    import IDeferred = angular.IDeferred;
    import ToolboxService = app.toolbox.ToolboxService;
    import IQService = angular.IQService;
    import TreeServiceMemento = app.core.undo.TreeServiceMemento;
    import ValidatorService = app.core.ValidatorService;

    export class TreeService extends Observable<PreviewUpdateEvent> implements Originator<TreeServiceMemento> {
        static $inject = ['LayoutsService', 'ToolboxService', '$q', 'ValidatorService'];

        public elements:TreeElement[] = [];
        public uischemaValid:boolean = true;

        constructor(private layoutsService:LayoutsService, private toolboxService:ToolboxService, private $q:IQService,
            private validatorService: ValidatorService) {
            super();
            layoutsService.getElementByType('VerticalLayout').then((element:LayoutToolboxElement) => {
                var rootElement:TreeElement = element.convertToTreeElement();
                rootElement['root'] = 'root';
                this.elements.push(rootElement);
                this.validateTree();
            });
        }

        validateAndExport() {

        }

        exportUISchemaAsJSON():string {
            if(this.elements[0] === null || typeof this.elements[0] === "undefined"){
                return "";
            }

            this.validateTree();

            return this.elements[0].toJSONStringDepurated();
        }

        isUISchemaValid():boolean {
            return this.uischemaValid;
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
                this.toolboxService.increasePlacedTimes(this.toolboxService.getElementByScope(uiSchema.scope.$ref.substring(13)).getScope());
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

        setMemento(memento:TreeServiceMemento) {
            this.elements[0]['elements']=memento.getElements()[0]['elements'];
        }

        createMemento():TreeServiceMemento {
            var elements:TreeElement[] = [];

            _.forEach(this.elements, (element:TreeElement) => {
               elements.push(element.clone());
            });

            return new TreeServiceMemento(elements);
        }

        modifiedTree():void {
            var uischema = this.exportUISchemaAsJSON();
            if (!uischema) {
                uischema = "{}"
            }
            this.notifyObservers(new PreviewUpdateEvent(null, JSON.parse(uischema)));
        }

        validateTree():void {
            this.uischemaValid = true;
            var allElements = this.getAllElements();
            for (var i = 0; i < allElements.length; i++) {
                this.validatorService.validateTreeElement(allElements[i]).then((valid) => {
                    if (this.uischemaValid) {
                        this.uischemaValid = valid;
                    }
                });
            }
        }

        getAllElements(): TreeElement[]{
            var res: TreeElement[] = [];
            for(var i = 0; i < this.elements.length; i++){
                res.push(this.elements[i]);
                this.getChildElements(this.elements[i], res);
            }
            return res;
        }

        getChildElements(element: TreeElement, res: TreeElement[]){
            var childs = element.elements;
            if(!childs){
                return;
            }
            for(var i = 0; i < childs.length; i++){
                res.push(childs[i]);
                this.getChildElements(childs[i], res);
            }
        }
    }

    angular.module('app.tree').service('TreeService', TreeService);

}