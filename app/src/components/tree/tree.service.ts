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

        constructor(private layoutsService:LayoutsService, private toolboxService:ToolboxService, private $q:IQService,
            private validatorService: ValidatorService) {
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

        modifiedTree(){
            var validation = this.validatorService.validateUISchema(this.exportUISchemaAsJSON());
            if(!validation || validation.valid === undefined || validation.errors === undefined){
                return;
            }
            if(validation.valid === false){
                validation.errors.forEach((error)=>{
                    this.processError(error);
                });
            }
        }

        processError(error: any){
            if(!error){
                return;
            }
            var dataPath = error.dataPath;
            var message = error.message;
            var subErrors = error.subErrors || [];

            if(dataPath === undefined || message === undefined){
                return;
            }

            this.getElementByPath(dataPath).addError(message);

            for(var i = 0; i < subErrors.length; i++){
                this.processError(subErrors[i]);
            }

        }

        getElementByPath(path: string): TreeElement{
            var element: TreeElement = this.elements[0];
            var split = path.split('/');
            if(split===undefined )split = [];
            for(var i = 0; i< split.length; i++){
                if(split[i]===''){
                    continue;
                }

                //check if the value is neither a number nor 'elements'
                if(isNaN(parseInt(split[i])) && split[i] !== 'elements'){
                    break;
                }
                element = element[split[i]];
            }

            return element;
        }
    }

    angular.module('app.tree').service('TreeService', TreeService);

}