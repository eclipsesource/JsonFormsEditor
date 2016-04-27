declare var tv4;
declare var JsonRefs;

module app.core {

    import Metaschema = app.core.metaschema.Metaschema;
    import TreeElement = app.core.model.TreeElement;
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;

    export class ValidatorService {

        static $inject = ['MetaschemaService', '$q'];

        constructor(private metaschemaService: app.core.metaschema.MetaschemaService, private $q: IQService) {
        }

        validateDataschema(dataschema:string):boolean {
            if (!tv4) {
                return true;
            }
            if (!dataschema) {
                return true;
            }
            return tv4.validate(dataschema, this.dataschemaMetaschema);
        }

        validateUISchema(uischema:{}):boolean{
            if (!tv4) {
                return true;
            }
            if (!uischema) {
                return true;
            }
            var metaschema: any = this.metaschemaService.getJsonMetaschema();

            if (!metaschema) {
                return true;
            }
            return tv4.validate(uischema, metaschema);
        }

        areSchemasCompatible(dataschema:{}, uischema:{}):boolean {
            var compatible = true;
            var refs = JsonRefs.findRefs(uischema);
            _.forEach(refs, (ref) => {
                var segments = ref.split('/');
                segments.shift();
                var dataschemaProperty = _.get(dataschema, segments);
                if (!dataschemaProperty || dataschemaProperty['type'] == 'object') {
                    compatible = false;
                    return;
                }
            });
            return compatible;
        }

        validateTreeElement(treeElement:TreeElement):IPromise<boolean> {
            var deferred = this.$q.defer();

            this.metaschemaService.getMetaschema().then((metaschema:Metaschema) => {
                var elementMetaschema = metaschema.getDefinitionByTypeLabel(treeElement.getType()).getMetaschema();

                treeElement.resetErrors();
                var elementUISchema = treeElement.toJSONStringDepurated();
                var valid = tv4.validate(JSON.parse(elementUISchema), elementMetaschema);

                if (!valid) {
                    this.proccessError(treeElement, tv4.error);
                }

                deferred.resolve(valid);
            });

            return deferred.promise;
        }

        private proccessError(treeElement:TreeElement, error:any) {
            var message = error.message;
            var subErrors = error.subErrors || [];

            treeElement.addError(message);

            for (var i = 0; i < subErrors.length; i++) {
                this.proccessError(treeElement, subErrors[i]);
            }
        }

        private dataschemaMetaschema = {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Modified JSON Schema draft v4 that includes the optional '$ref' and 'format'",
            "definitions": {
                "schemaArray": {
                    "type": "array",
                    "minItems": 1,
                    "items": { "$ref": "#" }
                },
                "positiveInteger": {
                    "type": "integer",
                    "minimum": 0
                },
                "positiveIntegerDefault0": {
                    "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
                },
                "simpleTypes": {
                    "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
                },
                "stringArray": {
                    "type": "array",
                    "items": { "type": "string" },
                    "minItems": 1,
                    "uniqueItems": true
                }
            },
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "format": "uri"
                },
                "$schema": {
                    "type": "string",
                    "format": "uri"
                },
                "$ref": {
                    "type": "string"
                },
                "format": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "default": { },
                "multipleOf": {
                    "type": "number",
                    "minimum": 0,
                    "exclusiveMinimum": true
                },
                "maximum": {
                    "type": "number"
                },
                "exclusiveMaximum": {
                    "type": "boolean",
                    "default": false
                },
                "minimum": {
                    "type": "number"
                },
                "exclusiveMinimum": {
                    "type": "boolean",
                    "default": false
                },
                "maxLength": { "$ref": "#/definitions/positiveInteger" },
                "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
                "pattern": {
                    "type": "string",
                    "format": "regex"
                },
                "additionalItems": {
                    "anyOf": [
                        { "type": "boolean" },
                        { "$ref": "#" }
                    ],
                    "default": { }
                },
                "items": {
                    "anyOf": [
                        { "$ref": "#" },
                        { "$ref": "#/definitions/schemaArray" }
                    ],
                    "default": { }
                },
                "maxItems": { "$ref": "#/definitions/positiveInteger" },
                "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
                "uniqueItems": {
                    "type": "boolean",
                    "default": false
                },
                "maxProperties": { "$ref": "#/definitions/positiveInteger" },
                "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
                "required": { "$ref": "#/definitions/stringArray" },
                "additionalProperties": {
                    "anyOf": [
                        { "type": "boolean" },
                        { "$ref": "#" }
                    ],
                    "default": { }
                },
                "definitions": {
                    "type": "object",
                    "additionalProperties": { "$ref": "#" },
                    "default": { }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": { "$ref": "#" },
                    "default": { }
                },
                "patternProperties": {
                    "type": "object",
                    "additionalProperties": { "$ref": "#" },
                    "default": { }
                },
                "dependencies": {
                    "type": "object",
                    "additionalProperties": {
                        "anyOf": [
                            { "$ref": "#" },
                            { "$ref": "#/definitions/stringArray" }
                        ]
                    }
                },
                "enum": {
                    "type": "array",
                    "minItems": 1,
                    "uniqueItems": true
                },
                "type": {
                    "anyOf": [
                        { "$ref": "#/definitions/simpleTypes" },
                        {
                            "type": "array",
                            "items": { "$ref": "#/definitions/simpleTypes" },
                            "minItems": 1,
                            "uniqueItems": true
                        }
                    ]
                },
                "allOf": { "$ref": "#/definitions/schemaArray" },
                "anyOf": { "$ref": "#/definitions/schemaArray" },
                "oneOf": { "$ref": "#/definitions/schemaArray" },
                "not": { "$ref": "#" }
            },
            "dependencies": {
                "exclusiveMaximum": [ "maximum" ],
                "exclusiveMinimum": [ "minimum" ]
            },
            "default": { }
        }

    }
    angular.module('app.core').service('ValidatorService', ValidatorService);
}