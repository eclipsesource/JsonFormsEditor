module app.tree {

    export class Control implements TreeElement {
        private propertiesSchema = {};
        private propertiesUISchema = {};
        private propertiesData = {};

        constructor(id:number) {
            // obtained from the "control" part of the metaSchema
            this.propertiesSchema = {
                "type": "object",
                "properties": {
                    "label": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": [
                            "Control"
                        ]
                    },
                    "scope": {
                        "type": "object",
                        "properties": {
                            "$ref": {
                                "type": "string"
                            }
                        }
                    }
                }
            };

            this.propertiesUISchema = {
                "type": "VerticalLayout",
                "elements": [
                    {
                        "type": "Control",
                        "label": "Label",
                        "scope": {"$ref": "#/properties/label"},
                    },
                    {
                        "type": "Control",
                        "label": "Type",
                        "scope": {"$ref": "#/properties/type"},
                    },
                    {
                        "type": "Control",
                        "label": "Scope",
                        "scope": {"$ref": "#/properties/scope/properties/$ref"},
                    }
                ]
            };

            this.propertiesData["id"] = id;
            this.propertiesData["type"] = "Control";
            this.propertiesData["label"] = "";
            this.propertiesData["scope"] = "";
        }

        getId():number {
            return this.propertiesData["id"];
        }

        setId(newId:number) {
            this.propertiesData["id"] = newId;
        }

        getTitle():string {
            return "Control";
        }

        getNodes():TreeElement[] {
            return null;
        }

        getPropertiesSchema() {
            return this.propertiesSchema;
        }

        getPropertiesUISchema() {
            return this.propertiesUISchema;
        }

        getPropertiesData() {
            return this.propertiesData;
        }
    }

}