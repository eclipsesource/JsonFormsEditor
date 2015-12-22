module app.toolbox {


    //TODO change scrolling in toolbox to let bottom bar and top tabs stay static

    import GeneralToolboxElement = app.core.GeneralToolboxElement;
    import ControlToolboxElement = app.core.ControlToolboxElement;
    import TreeElement = app.core.TreeElement;
    import ToolboxElement = app.core.ToolboxElement;
    import ConfigDialogService = app.header.ConfigDialogService;


    class ToolboxController {

        public currentAddElementLabel: string = '';
        public currentAddElementType: string = 'string';
        public elementTypes = ['string', 'number', 'boolean'];


        private tab:number = 1;

        static $inject = ['$scope', '$filter', 'ToolboxService', 'ConfigDialogService'];

        constructor($scope, public $filter, public toolboxService: ToolboxService, public configService: ConfigDialogService) {

            var _this = this;
            $scope.treeOptionsToolbox = {
                accept: function (sourceNodeScope, destNodesScope, destIndex) {
                    return false;
                },
                dropped: function(e) {
                    console.log(e);
                    //if the element is being dragged into the toolbar itself, return
                    if(e.dest.nodesScope.$modelValue == e.source.nodesScope.$modelValue) {
                        return;
                    }

                    // Convert the ToolboxElement into a TreeElement
                    var index = e.dest.index;
                    var modelDest: ToolboxElement = e.dest.nodesScope.$modelValue[index];

                    var modelSource: ToolboxElement = e.source.nodeScope.$modelValue;
                    if(modelSource instanceof ControlToolboxElement) {
                        var control: ControlToolboxElement = modelSource;
                        control.increasePlacedTimes();
                    }
                    e.dest.nodesScope.$modelValue[index] = modelDest.insertIntoTree(TreeElement.getNewId());

                }

            };
        }

        shouldHide(element: ToolboxElement): boolean {
            if(!this.configService.enableFilter){
                return false;
            }
            if(element instanceof ControlToolboxElement){
                if(element.isAlreadyPlaced()){
                    return true;
                }
            }
            return false;
        }

        isSet(checkTab):boolean {
            return this.tab == checkTab;
        }

        setTab(activeTab) {
            this.tab = activeTab;
        }

        changeAddType(type: string) {

            this.currentAddElementType = type;

        }

        typeOfNewElement(): string {
            return this.currentAddElementType;
        }


        //TODO support different scopes(inside folders)
        //TODO add more data into content(required, min chars, etc)
        addNewElement() {
            document.getElementById("inputLabel").focus();

            var content = {
                type: this.typeOfNewElement()
            };

            this.toolboxService.addSchemaElement(this.currentAddElementLabel, content);

            this.currentAddElementLabel = '';
        }

        removeDataElement(element: ControlToolboxElement) {
            if(this.canRemoveDataElement(element)){
                this.toolboxService.removeSchemaElement(element.getScope());
            }
        }

        canRemoveDataElement(element: ControlToolboxElement): boolean {
            if(element.isAlreadyPlaced()) {
                return false;
            }
            return true;
        }

    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}

