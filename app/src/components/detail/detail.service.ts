module app.detail {
    export class DetailService {

        public currentElement : app.tree.TreeElement;
        public schema: any;
        public uischema: any;
        public data: any;

        setElement(element : app.tree.TreeElement) : void {
            this.currentElement = element;

            switch(this.currentElement.data["type"]) {
                case "Control":
                    this.schema = {
                        "type": "object",
                        "properties": {
                            "label": {
                                "type": "string"
                            },
                            "type": {
                                "type": "string"
                            },
                            "scope": {
                                "type": "string"
                            }
                        }
                    };
                    break;
                case "VerticalLayout":
                case "HorizontalLayout":
                case "Group":
                    this.schema = {
                        "type": "object",
                        "properties": {
                            "label": {
                                "type": "string"
                            },
                            "type": {
                                "type": "string",
                                "enum": [
                                    "HorizontalLayout",
                                    "VerticalLayout",
                                    "Group"
                                ]
                            }
                        }
                    };
            }

            switch(this.currentElement.data["type"]) {
                case "Control":
                    this.uischema = {
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
                    break;
                case "VerticalLayout":
                case "HorizontalLayout":
                case "Group":
                    this.uischema = {
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
            }

            this.data = this.currentElement.data;
        }

    }

    angular.module('app.detail').service('DetailService', DetailService);
}