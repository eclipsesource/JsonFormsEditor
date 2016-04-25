var app;
(function (app) {
    var core;
    (function (core) {
        var connectors;
        (function (connectors) {
            var SocioCortexConnector = (function () {
                function SocioCortexConnector($http) {
                    this.$http = $http;
                    this.selectedEntityType = null;
                }
                SocioCortexConnector.prototype.isLoggedWithSocioCortex = function () {
                    return this.selectedEntityType != null;
                };
                SocioCortexConnector.prototype.login = function (serverURL, username, password) {
                    var _this = this;
                    this.serverURL = serverURL;
                    this.encodedLoginData = window.btoa(username + ":" + password);
                    return this.$http.get(serverURL + '/users/me', {
                        headers: { 'Authorization': 'Basic ' + this.encodedLoginData }
                    }).success(function (response) {
                        _this.$http.get(serverURL + '/workspaces', {
                            headers: { 'Authorization': 'Basic ' + _this.encodedLoginData }
                        }).success(function (response) {
                            _this.workspaces = response;
                        });
                    });
                };
                SocioCortexConnector.prototype.getWorkspaces = function () {
                    return this.workspaces;
                };
                SocioCortexConnector.prototype.selectWorkspace = function (workspace) {
                    var _this = this;
                    this.entityTypes = [];
                    return this.$http.get(this.serverURL + '/workspaces/' + workspace.id + '/entityTypes', {
                        headers: { 'Authorization': 'Basic ' + this.encodedLoginData }
                    }).success(function (response) {
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].name != "Text Page")
                                _this.entityTypes.push(response[i]);
                        }
                    });
                };
                SocioCortexConnector.prototype.getEntityTypes = function () {
                    return this.entityTypes;
                };
                SocioCortexConnector.prototype.selectEntityType = function (entityType) {
                    var _this = this;
                    this.selectedEntityType = null;
                    this.attributes = [];
                    return this.$http.get(this.serverURL + '/entityTypes/' + entityType.id, {
                        headers: { 'Authorization': 'Basic ' + this.encodedLoginData }
                    }).then(function (response) {
                        _this.selectedEntityType = response.data;
                        var propertiesReduced = response.data.attributeDefinitions;
                        for (var i = 0; i < propertiesReduced.length; i++) {
                            var nestedPromise = _this.$http.get(_this.serverURL + '/attributeDefinitions/' + propertiesReduced[i].id, {
                                headers: { 'Authorization': 'Basic ' + _this.encodedLoginData }
                            }).success(function (response) {
                                _this.attributes.push(response);
                            });
                            if (i == propertiesReduced.length - 1)
                                return nestedPromise;
                        }
                    });
                };
                SocioCortexConnector.prototype.generateJSONFromAttributes = function () {
                    var json = {
                        "type": "object",
                        "properties": {}
                    };
                    for (var i = 0; i < this.attributes.length; i++) {
                        json = this.generatePropertyFromAttribute(json, this.attributes[i]);
                    }
                    return json;
                };
                SocioCortexConnector.prototype.generatePropertyFromAttribute = function (json, attribute) {
                    var propertyName = attribute.name.toLowerCase().replace(/\s+/g, '_');
                    var propertyValue = {};
                    switch (attribute.attributeType) {
                        case "Text":
                            propertyValue.type = "string";
                            break;
                        case "Number":
                            propertyValue.type = "number";
                            break;
                        case "Enumeration":
                            propertyValue.type = "string";
                            propertyValue.enum = attribute.options.enumerationValues;
                            break;
                        case "Date":
                            propertyValue.type = "string";
                            propertyValue.format = "date-time";
                            break;
                        default:
                            propertyValue.type = "string";
                    }
                    json.properties[propertyName] = propertyValue;
                    return json;
                };
                SocioCortexConnector.prototype.getViewModel = function () {
                    if (!this.selectedEntityType.viewModel)
                        return null;
                    return JSON.parse(this.selectedEntityType.viewModel);
                };
                SocioCortexConnector.prototype.saveViewModel = function (uiSchema) {
                    this.selectedEntityType.viewModel = uiSchema;
                    return this.$http.put(this.serverURL + '/entityTypes/' + this.selectedEntityType.id, this.selectedEntityType, {
                        headers: { 'Authorization': 'Basic ' + this.encodedLoginData }
                    });
                };
                SocioCortexConnector.$inject = ['$http'];
                return SocioCortexConnector;
            })();
            connectors.SocioCortexConnector = SocioCortexConnector;
            angular.module('app.core').service('SocioCortexConnector', SocioCortexConnector);
        })(connectors = core.connectors || (core.connectors = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=sociocortexConnector.service.js.map