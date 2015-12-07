/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

/**
 * Created by pancho111203 on 4/12/15.
 */

module app.core.jsonschema{
    export class JsonSchemaService{
        fields:string[] = [];

        constructor(){
            this.loadFromJson(exampleFieldSchema);
            this.fields.push("");
            //TODO improve system of default selection of scope
        }
        loadFromJson(json:any){
            for(var key in json.properties){
                if(json.properties.hasOwnProperty(key)){
                    this.fields.push(key);
                }
            }
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
    "type":"object",
    "properties":{
        "firstName":{
            "type":"string",

        },
        "lastName":{
            "type":"string"
        }
    }
};

