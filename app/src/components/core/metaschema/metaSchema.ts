module app.core.metaschema {

    //TODO Felix rework
    export class MetaSchema {

        private definitions:Definition[] = [];

        static fromJSON(json:any):MetaSchema {
            var metaSchema = new MetaSchema();

            if (json.hasOwnProperty('definitions')) {
                _.forOwn(json['definitions'], (value:{[key:string] : string|string[]|{}}, key:string) => {
                    if (value.hasOwnProperty('type')) {
                        if (value['type'] === 'object') {
                            var definition = new Definition(key, value);
                            metaSchema.definitions.push(definition);
                            metaSchema.definitions = _.union(metaSchema.definitions, definition.getChildElements());
                        }
                    }
                });
            }

            return metaSchema;
        }

        getDefinitions():Definition[] {
            return this.definitions;
        }

        getDefinition(name:String):Definition {
            return _.find(this.definitions, (definition:Definition) => {
                return definition.getName() === name;
            })
        }

        getNames():string[] {
            return _.map(this.definitions, (definition:Definition) => {
                return definition.getName();
            })
        }

        getLabels():string[] {
            return _.union(_.flatten(_.map(this.definitions, (definition:Definition) => {
                return definition.getTypeEnum();
            })))
        }

        getDefinitionFromLabel(label:String):Definition {
            return _.find(this.definitions, (definition:Definition) => {
                return _.contains(definition.getTypeEnum(), label);
            })
        }
    }
}

