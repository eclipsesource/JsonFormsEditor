module app.toolbox {

    class ToolboxBottomController {

        public newElementLabel:string = '';
        public newElementType:string;
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
                'enum': [],
                'formats': ['date-time']
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
            this.setNewElementType('string');
        }

        setNewElementType(type:string){
            this.newElementType = type;
            this.reset();
        }

        reset() {
            this.newElementConfig = JSON.parse(JSON.stringify(this.elementTypes[this.newElementType]));
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


        /**
         * Submits the current newElementLabel and newElementType and creates a new DataschemaPropery.
         * Returns true if the element was correctly added, false otherwise.
         */
        addNewElement():boolean {
            if (!this.newElementLabel) {
                return false;
            }

            if (this.newElementType == 'integer' || this.newElementType == 'number') {
                var numberEnum = [];
                for (var i = 0; i < this.newElementConfig['enum'].length; i++) {
                    numberEnum.push(Number(this.newElementConfig['enum'][i]));
                }
                this.newElementConfig['enum'] = numberEnum;
            }

            var added = this.toolboxService.addSchemaElement(this.newElementLabel, this.newElementType, this.newElementConfig);
            if (!added) {
                console.log('ERROR: failed to add the element into the schema');
            }
            this.newElementLabel = '';
            this.reset();
            return added;
        }

        addNewEnumElement():boolean {
            if (~this.enumOptions.indexOf(this.newEnumElementLabel)) {
                console.log('ERROR: element already exists');
                this.newEnumElementLabel = '';
                return false;
            }
            if (this.newElementType == 'integer' || this.newElementType == 'number') {
                var number = Number(this.newEnumElementLabel);
                if (isNaN(number)) {
                    console.log('ERROR: insert a number');
                    this.newEnumElementLabel = '';
                    return false;
                }
                if (this.newElementType == 'integer' && ~this.newEnumElementLabel.indexOf('.')) {
                    console.log('ERROR: insert an integer');
                    this.newEnumElementLabel = '';
                    return false;
                }
            }
            this.enumOptions.push(this.newEnumElementLabel);
            this.newEnumElementLabel = '';
            return true;
        }
    }

    angular.module('app.toolbox').controller('ToolboxBottomController', ToolboxBottomController);
}
