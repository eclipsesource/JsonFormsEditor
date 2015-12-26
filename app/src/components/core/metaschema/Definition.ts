module app.core.metaschema {

    // TODO Felix rework
    export class Definition {

        constructor(private name:string, private options:{[key:string] : string|string[]|{}}) {

        }

        getName():string {
            return this.name;
        }

        getTypeEnum():string[] {
            var result:string[] = [];

            if (this.options.hasOwnProperty('properties')) {
                if (this.options['properties'].hasOwnProperty('type')) {
                    if (this.options['properties']['type'].hasOwnProperty('enum')) {
                        result = this.options['properties']['type']['enum'];
                    }
                }
            }

            return result;
        }

        canContainElements():boolean {
            var result:boolean = false;

            if (this.options.hasOwnProperty('properties')) {
                if (this.options['properties'].hasOwnProperty('elements')) {
                    result = true;
                }
            }

            return result;
        }

        getChildElements():Definition[] {
            var result:Definition[] = [];

            if (this.canContainElements()) {
                var elements = this.options['properties']['elements'];

                if (elements.hasOwnProperty('type') && elements['type'] === 'array' && elements.hasOwnProperty('items')) {
                    var items = elements['items'];
                    if (items.hasOwnProperty('type')) {
                        if (items['type'] === 'array') {
                            if (!items.hasOwnProperty('$ref')) {
                                // a new object is introduced, otherwise $ref would be used

                            }
                        } else if (items['type'] === 'object') {
                            // we are sure that there is a new object introduced here
                            if (items.hasOwnProperty('properties') && items['properties'].hasOwnProperty('type')) {
                                if (items['properties']['type'].hasOwnProperty('enum')) {
                                    _.forEach(items['properties']['type']['enum'], (name:string) => {
                                       result.push(new Definition(name, items));
                                    });
                                }
                            }
                        }
                    }
                }
            }

            return result;
        }

        getSchema():{} {
            return {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "Control"
                        ]
                    },
                    "label": {
                        "type": "string"
                    },
                    "scope": {
                        "type": "string",
                        "enum": ["test"]
                    }
                },
                "required": [
                    "type",
                    "scope"
                ]
            };
        }

        getUISchema():{} {
            return {
                "type": "VerticalLayout",
                "elements": [
                    {
                        "type": "Control",
                        "label": "Label",
                        "scope": { "$ref": "#/properties/label" },
                    },
                    {
                        "type": "Control",
                        "label": "Type",
                        "scope": { "$ref": "#/properties/type" },
                    },
                    {
                        "type": "Control",
                        "label": "Scope",
                        "scope": { "$ref": "#/properties/scope" },
                    }
                ]
            };
        }

        getAcceptedElements():string[] {
            return ['VerticalLayout', 'HorizontalLayout', 'Categorization', 'Category', 'Group', 'Control'];
        }
    }
}
