module app.toolbox {


    //TODO change scrolling in toolbox to let bottom bar and top tabs stay static

    import GeneralToolboxElement = app.core.model.GeneralToolboxElement;
    import ControlToolboxElement = app.core.model.ControlToolboxElement;
    import TreeElement = app.core.model.TreeElement;
    import ToolboxElement = app.core.model.ToolboxElement;


    class ToolboxController {

        public currentAddElementLabel:string = '';

        private elementTypes = ['string', 'number', 'boolean'];

        public currentAddElementIndex:number = 0;

        public filterDataToolbox:boolean = true;

        static $inject = ['$scope', '$filter', 'ToolboxService'];

        constructor($scope, public $filter, public toolboxService:ToolboxService) {
            $scope.treeOptionsToolbox = {
                accept: function (sourceNodeScope, destNodesScope, destIndex) {
                    return false;
                },
                dropped: function (e) {
                    console.log(e);
                    //if the element is being dragged into the toolbar itself, return
                    if (e.dest.nodesScope.$modelValue == e.source.nodesScope.$modelValue) {
                        return;
                    }

                    // Convert the ToolboxElement into a TreeElement
                    var index = e.dest.index;
                    var modelDest:ToolboxElement = e.dest.nodesScope.$modelValue[index];

                    var modelSource:ToolboxElement = e.source.nodeScope.$modelValue;
                    if (modelSource instanceof ControlToolboxElement) {
                        var control:ControlToolboxElement = modelSource;
                        control.increasePlacedTimes();
                    }
                    e.dest.nodesScope.$modelValue[index] = modelDest.insertIntoTree(TreeElement.getNewId());

                }

            };
        }

        shouldHide(element:ToolboxElement):boolean {
            if (!this.filterDataToolbox) {
                return false;
            }
            if (element instanceof ControlToolboxElement) {
                if (element.isAlreadyPlaced()) {
                    return true;
                }
            }
            return false;
        }

        changeAddType() {
            this.currentAddElementIndex = (this.currentAddElementIndex + 1) % this.elementTypes.length;
        }

        typeOfNewElement():string {
            return this.elementTypes[this.currentAddElementIndex];
        }


        //TODO support different scopes(inside folders)
        //TODO add more data into content(required, min chars, etc)
        addNewElement() {
            var content = {
                type: this.typeOfNewElement()
            };

            this.toolboxService.addSchemaElement(this.currentAddElementLabel, content);
        }

        removeDataElement(element:ControlToolboxElement) {
            if (this.canRemoveDataElement(element)) {
                this.toolboxService.removeSchemaElement(element.getScope());
            }
        }

        canRemoveDataElement(element:ControlToolboxElement):boolean {
            return !element.isAlreadyPlaced();
        }
    }

    angular.module('app.toolbox').controller('ToolboxController', ToolboxController)
}

