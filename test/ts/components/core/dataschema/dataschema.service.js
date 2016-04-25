/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../model/toolboxElementControl.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var core;
    (function (core) {
        var dataschema;
        (function (dataschema) {
            var PreviewUpdateEvent = app.preview.PreviewUpdateEvent;
            var ControlToolboxElement = app.core.model.ControlToolboxElement;
            var DataschemaService = (function (_super) {
                __extends(DataschemaService, _super);
                function DataschemaService() {
                    _super.apply(this, arguments);
                    this.json = {
                        "type": "object",
                        "properties": {}
                    };
                }
                /**
                 * Initializes the dataschema from JSON.
                 * @param json a dataschema json structure.
                 */
                DataschemaService.prototype.loadFromJson = function (json) {
                    this.json = json;
                };
                /**
                 * Converts all properties of the current foldeer into control elements
                 * @param path - an array of strings indicating the position in the folder hierarchy
                 * @returns {ControlToolboxElement[]}
                 */
                DataschemaService.prototype.convertPropertiesToControls = function (path) {
                    var _this = this;
                    if (path === void 0) { path = []; }
                    var result = [];
                    var parent = this.getFolderAt(path);
                    if (!parent.hasOwnProperty('properties')) {
                        return [];
                    }
                    parent = parent.properties;
                    _.forEach(parent, function (property, name) {
                        result.push(new ControlToolboxElement(_this.convertNameToLabel(name), property.type, _this.generateScope(name, path)));
                    });
                    return result;
                };
                DataschemaService.prototype.generateScope = function (label, path) {
                    var scope = '';
                    if (path.length <= 0) {
                        scope = label;
                    }
                    else {
                        scope = path.join('/properties/') + '/properties/' + label;
                    }
                    return scope;
                };
                DataschemaService.prototype.convertNameToLabel = function (name) {
                    return _.startCase(name);
                };
                /**
                 * Returns the dataschema as JSON-object structure.
                 * @returns {any}
                 */
                DataschemaService.prototype.getDataSchema = function () {
                    return this.json;
                };
                DataschemaService.prototype.exportDataSchemaAsString = function () {
                    return JSON.stringify(this.json, function (key, value) { return value; }, 2);
                };
                DataschemaService.prototype.getPropertiesNames = function () {
                    var propertiesNames = [];
                    _.forOwn(this.json['properties'], function (value, key) {
                        DataschemaService.retrievePropertiesNames(propertiesNames, key, value);
                    });
                    return propertiesNames;
                };
                DataschemaService.retrievePropertiesNames = function (propertiesNames, name, property) {
                    if (property['properties']) {
                        _.forOwn(property['properties'], function (value, key) {
                            DataschemaService.retrievePropertiesNames(propertiesNames, name + "/properties/" + key, value);
                        });
                    }
                    else {
                        propertiesNames.push(name);
                    }
                };
                /**
                 * Adds a new Property to the data-schema.
                 *
                 * @param property The property to add. If the name of the property already exists it gets updated.
                 * @param path path is an array of string containing the name of the parent properties in order eg. : ['person', 'appearance', 'head']
                 * @returns {boolean} indicating if the addition was succesful(when false, it means the element was not added)
                 */
                DataschemaService.prototype.addNewProperty = function (label, type, config, path) {
                    config = config || {};
                    var property = {};
                    property.type = type;
                    if (!(label && type)) {
                        console.log('ERROR: label or type undefined');
                        return false;
                    }
                    var parent = this.getFolderAt(path);
                    if (!parent || !parent.hasOwnProperty('properties')) {
                        console.log('ERROR: the path accessed is not a folder');
                        return false;
                    }
                    parent = parent.properties;
                    // Check if there is a property with same name already
                    if (parent.hasOwnProperty(label)) {
                        console.log('ERROR: a property with the same name exists already in the current folder');
                        return false;
                    }
                    //Initialize properties object if its a folder
                    if (type == 'object') {
                        property.properties = {};
                    }
                    if (config['required'] === true) {
                        this.addPropertyToRequired(label, parent);
                    }
                    if (config['hasEnum'] === true) {
                        property['enum'] = config['enum'];
                    }
                    parent[label] = property;
                    this.notifyObservers(new PreviewUpdateEvent(this.getDataSchema(), null));
                    return true;
                };
                DataschemaService.prototype.addPropertyToRequired = function (label, parent) {
                    if (!parent['required']) {
                        parent.required = [];
                    }
                    if (!~parent.required.indexOf(label)) {
                        parent.required.push(label);
                    }
                };
                /**
                 * Removes a Property from the data-schema.
                 *
                 * @param name the name of the property.
                 * @param path path is an array of string containing the name of the parent properties in order eg. : ['person', 'appearance', 'head']
                 * @returns {boolean} indicating if the removal was succesful(when false, it means the element was not added)
                 */
                DataschemaService.prototype.removeProperty = function (name, path) {
                    var parent = this.getFolderAt(path);
                    if (parent === null || !parent.hasOwnProperty('properties') || !parent.properties.hasOwnProperty(this.getElementNameFromScope(name))) {
                        return false;
                    }
                    var res = delete parent.properties[name];
                    this.notifyObservers(new PreviewUpdateEvent(this.getDataSchema(), null));
                    return res;
                };
                DataschemaService.prototype.getElementNameFromScope = function (scope) {
                    return scope.split('/').pop();
                };
                /**
                 * Retrieves the folder at the specified path in the data-schema.
                 * @param path the path to the folder: e.g. ['person','adress','street']
                 * @returns {DataschemaProperty} the property or null, if no property was found at the path
                 */
                DataschemaService.prototype.getFolderAt = function (path) {
                    var currentElement = this.json;
                    var index = 0;
                    if (path.length === 0) {
                        return currentElement;
                    }
                    while (index < path.length) {
                        if (currentElement.hasOwnProperty('properties') && currentElement.properties.hasOwnProperty(path[index])) {
                            currentElement = currentElement.properties[path[index]];
                            if (currentElement.type != 'object') {
                                return null;
                            }
                            index++;
                        }
                        else {
                            // path doesnt exist
                            return null;
                        }
                    }
                    return currentElement;
                };
                return DataschemaService;
            })(Observable);
            dataschema.DataschemaService = DataschemaService;
            angular.module("app.core").service("DataschemaService", DataschemaService);
        })(dataschema = core.dataschema || (core.dataschema = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=dataschema.service.js.map