module app.core.metaschema {

    import DataschemaService = app.core.dataschema.DataschemaService;
    export class MetaSchema {

        private definitions: Definition[] = [];

        constructor(public dataschemaService: DataschemaService, json: any) {
            var schema: any;
            var uiSchema: any;
            var acceptedElements: string[];

            // TODO derive the schema, uiSchema and initialData of the different definitions automatically from the metaschema
            // Control definition
            schema = {
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
                        "enum": dataschemaService.getNames()
                    }
                },
                "required": [
                    "type",
                    "scope"
                ]
            };
            uiSchema = {
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
            acceptedElements = [];
            this.definitions.push(new Definition(schema, uiSchema, acceptedElements));

            // Layout Definition
            schema = {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "HorizontalLayout",
                            "VerticalLayout",
                            "Group"
                        ]
                    },
                    "label": {
                        "type": "string"
                    }
                },
                "required": [
                    "type"
                ]
            };
            uiSchema = {
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
                    }
                ]
            };
            acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];

            this.definitions.push(new Definition(schema, uiSchema, acceptedElements));

            // Categorization Definition
            schema = {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "Categorization"
                        ]
                    }
                },
                "required": [
                    "type"
                ]
            };
            uiSchema = {
                "type": "VerticalLayout",
                "elements": [
                    {
                        "type": "Control",
                        "label": "Type",
                        "scope": { "$ref": "#/properties/type" },
                    }
                ]
            };
            acceptedElements = ["Category"];

            this.definitions.push(new Definition(schema, uiSchema, acceptedElements));

            // Category Definition
            schema = {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "Category"
                        ]
                    },
                    "label": {
                        "type": "string"
                    }
                },
                "required": [
                    "type"
                ]
            };
            uiSchema = {
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
                    }
                ]
            };
            acceptedElements = ["Control", "VerticalLayout", "HorizontalLayout", "Group", "Categorization"];

            this.definitions.push(new Definition(schema, uiSchema, acceptedElements));
        }

        //small hack to reload data elements of the Controls. Refactor ASAP
        reloadData() {
            var def = this.getDefinition("Control");
            def.schema.properties.scope.enum = this.dataschemaService.getNames();
        }

        getDefinitions() : Definition[] {
            return this.definitions;
        }

        getDefinition(type: string) {
            var definition: Definition = null;
            for(var i = 0; i < this.definitions.length; i++) {
                for(var j = 0; j < this.definitions[i].getTypeEnum().length; j++) {
                    if(type == this.definitions[i].getTypeEnum()[j]) definition = this.definitions[i];
                }
            }
            return definition;
        }

    }
}

