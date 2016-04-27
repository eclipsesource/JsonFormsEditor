module app.toolbox {

    class ToolboxBottomController {

        public newElementLabel:string = '';
        public newElementType:string = null;
        public newElementConfig:{} = {};

        public showAdvanced:boolean = false;
        public showEnum:boolean = false;

        public newEnumElementLabel:string = '';
        public enumOptions = [];

        public elementTypes = {
            'string': {
                'allowsAdvanced': true,
                'required': false,
                'allowsEnum': true,
                'enum': []
            },
            'integer': {
                'allowsAdvanced': true,
                'required': false,
                'allowsEnum': true,
                'enum': []
            },
            'number': {
                'allowsAdvanced': true,
                'required': false,
                'allowsEnum': true,
                'enum': []
            },
            'boolean': {
                'allowsAdvanced': true,
                'required': false,
                'allowsEnum': false
            },
            'object': {
                'allowsAdvanced': false
            }
        };

        static $inject = ['ToolboxService'];

        constructor(public toolboxService:ToolboxService) {
        }

        setNewElementType(type:string){
            this.newElementType = type;
            this.newElementConfig = JSON.parse(JSON.stringify(this.elementTypes[type]));
            this.resetAdvanced();
        }

        resetAdvanced() {
            this.setShowAdvanced(false);
            this.newEnumElementLabel = '';
            this.enumOptions = [];
        }

        setShowAdvanced(show:boolean) {
            this.showAdvanced = show;
            this.showEnum = false;
        }

        //TODO support different scopes(inside folders)
        //TODO add more data into content(required, min chars, etc)
        /**
         * Submits the current newElementLabel and newElementTypeLabel and creates a new DataschemaPropery.
         */
        addNewElement() {
            if (this.newElementType == 'integer' || this.newElementType == 'number') {
                var numberEnum = [];
                for (var i = 0; i < this.newElementConfig['enum'].length; i++) {
                    numberEnum.push(Number(this.newElementConfig['enum'][i]));
                }
                this.newElementConfig['enum'] = numberEnum;
            }

            if (!this.toolboxService.addSchemaElement(this.newElementLabel, this.newElementType, this.newElementConfig)) {
                console.log('ERROR: failed to add the element into the schema');
            }
            this.newElementLabel = '';
            this.resetAdvanced();
        }

        addEnumElement() {
            if (~this.enumOptions.indexOf(this.newEnumElementLabel)) {
                console.log('ERROR: element already exists');
                this.newEnumElementLabel = '';
                return;
            }
            if (this.newElementType == 'integer' || this.newElementType == 'number') {
                var number = Number(this.newEnumElementLabel);
                if (isNaN(number)) {
                    console.log('ERROR: insert a number');
                    this.newEnumElementLabel = '';
                    return;
                }
                if (this.newElementType == 'integer' && ~this.newEnumElementLabel.indexOf('.')) {
                    console.log('ERROR: insert an integer');
                    this.newEnumElementLabel = '';
                    return;
                }
            }
            this.enumOptions.push(this.newEnumElementLabel);
            this.newEnumElementLabel = '';
        }
    }

    angular.module('app.toolbox').controller('ToolboxBottomController', ToolboxBottomController);
}
