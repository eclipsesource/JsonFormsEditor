module app.core.metaschema {

  import JsonSchemaService = app.core.jsonschema.JsonSchemaService;
  export class MetaSchemaService {

    static $inject = ['$http', 'JsonSchemaService'];

    private metaSchema: MetaSchema;


    constructor($http: ng.IHttpService, jsonSchemaService: JsonSchemaService) {
      //TODO implement using $http and promises, to get resource from static location on the server
      this.metaSchema = new MetaSchema(jsonSchemaService, jsonMetaSchema);
    }

    getMetaSchema() : MetaSchema {
      return this.metaSchema;
    }

  }

  angular.module('app.core').service('MetaSchemaService', MetaSchemaService);
}

var jsonMetaSchema = {
  "definitions": {
    "label": {
      "properties": {
        "text": {
          "type": "string"
        }
      }
    },
    "control": {
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
      },
      "required": [
        "type",
        "scope"
      ]
    },
    "layout": {
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
        },
        "elements": {
          "type": "array",
          "items": {
            "$ref": "#"
          }
        }
      },
      "required": [
        "type",
        "elements"
      ]
    },
    "categorization": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "Categorization"
          ]
        },
        "elements": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "Category"
                ]
              },
              "elements": {
                "type": "array",
                "items": {
                  "$ref": "#"
                }
              }
            },
            "required": [
              "type",
              "elements"
            ]
          }
        }
      },
      "required": [
        "type",
        "elements"
      ]
    }
  },
  "type": "object",
  "oneOf": [
    {
      "$ref": "#/definitions/categorization"
    },
    {
      "$ref": "#/definitions/layout"
    },
    {
      "$ref": "#/definitions/control"
    },
    {
      "$ref": "#/definitions/label"
    }
  ]
};