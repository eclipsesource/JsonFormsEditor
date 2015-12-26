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
    }
}

