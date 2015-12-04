module app.detail {
    export class DetailService {

        public currentElement : app.tree.TreeElement;

        setElement(element : app.tree.TreeElement) : void {
            this.currentElement = element;
        }

        getSchema() : any {
            switch(this.currentElement.data["type"]) {
                case "Control":
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
                                "type": "object",
                                "properties": {
                                    "$ref": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    };
                case "VerticalLayout":
                case "HorizontalLayout":
                case "Group":
                    return {
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
                        }
                    };
            }
        }

        getUISchema() : any {
            switch(this.currentElement.data["type"]) {
                case "Control":
                    return {
                        "type": "VerticalLayout",
                        "elements": [
                            {
                                "type": "Control",
                                "label": "Type",
                                "scope": { "$ref": "#/properties/type" },
                            },
                            {
                                "type": "Control",
                                "label": "Label",
                                "scope": { "$ref": "#/properties/label" },
                            },
                            {
                                "type": "Control",
                                "label": "Scope",
                                "scope": { "$ref": "#/properties/scope/properties/$ref" },
                            }
                        ]
                    };
                case "VerticalLayout":
                case "HorizontalLayout":
                case "Group":
                    return {
                        "type": "VerticalLayout",
                        "elements": [
                            {
                                "type": "Control",
                                "label": "Type",
                                "scope": { "$ref": "#/properties/type" },
                            },
                            {
                                "type": "Control",
                                "label": "Label",
                                "scope": { "$ref": "#/properties/label" },
                            }
                        ]
                    };
            }
        }

        getData() : any {
            return this.currentElement.data;
        }

    }

    angular.module('app.detail').service('DetailService', DetailService);
}