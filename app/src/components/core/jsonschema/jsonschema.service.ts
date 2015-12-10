/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

/**
 * Created by pancho111203 on 4/12/15.
 */

module app.core.jsonschema{
    export class JsonSchemaService{
        fields:string[] = [];

        constructor(){
            this.loadFromJson(exampleFieldSchema);
        }
        loadFromJson(json:any){
            this.fields = this.getPropertiesRecursive(json, '');
        }

        // From a json object, returns all the propertie names iinside it recursively and by adding a prefix with its location
        private getPropertiesRecursive(json: any, prefix: string) : string[] {
            var res: string[] = [];

            if(json.hasOwnProperty('properties')) {
                for(var key in json.properties) {
                    if(json.properties.hasOwnProperty(key)){

                        var name = prefix == '' ? key : prefix + '/' + key;

                        var childProps = this.getPropertiesRecursive(json.properties[key], name);
                        if(childProps.length > 0){
                            res = res.concat(childProps);
                        } else {
                            res.push(name);
                        }


                    }

                }
            }
            return res;
        }

        getFields(): string[]{
            return this.fields;
        }
    }
    angular.module("app.core").service("JsonSchemaService", JsonSchemaService);
}

//TODO flatten fieldschema to include all the properties (use lodash)

//TODO load from user
var exampleFieldSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a product",
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        },
        "tags": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        },
        "dimensions": {
            "type": "object",
            "properties": {
                "length": {"type": "number"},
                "width": {"type": "number"},
                "height": {"type": "number"}
            },
            "required": ["length", "width", "height"]
        },
        "warehouseLocation": {
            "description": "Coordinates of the warehouse with the product",
            "$ref": "http://json-schema.org/geo"
        }
    },
    "required": ["id", "name", "price"]
};