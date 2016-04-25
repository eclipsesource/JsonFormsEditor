var app;
(function (app) {
    var core;
    (function (core) {
        var model;
        (function (model) {
            var TreeElement = (function () {
                function TreeElement() {
                    this.errors = [];
                    this.rule = {
                        "effect": "",
                        "condition": {
                            "scope": "",
                            "expectedValue": ""
                        }
                    };
                    this.elements = [];
                    this.metaData = {};
                }
                TreeElement.prototype.getType = function () {
                    return this.type;
                };
                TreeElement.prototype.setType = function (newType) {
                    this.type = newType;
                };
                TreeElement.prototype.getDataType = function () {
                    return this.dataType;
                };
                TreeElement.prototype.setDataType = function (newDataType) {
                    this.dataType = newDataType;
                };
                TreeElement.prototype.getLongType = function () {
                    if (this.type == 'Control') {
                        return this.type + " (" + this.dataType + ")";
                    }
                    else {
                        return this.type;
                    }
                };
                TreeElement.prototype.getLabel = function () {
                    return this.label;
                };
                TreeElement.prototype.setLabel = function (newLabel) {
                    this.label = newLabel;
                };
                TreeElement.prototype.getScope = function () {
                    return this.scope;
                };
                TreeElement.prototype.setScope = function (newScope) {
                    this.scope = newScope;
                };
                TreeElement.prototype.initElements = function () {
                    this.elements = [];
                };
                TreeElement.prototype.getElements = function () {
                    return this.elements;
                };
                TreeElement.prototype.hasElements = function () {
                    return this.elements && this.elements.length > 0;
                };
                TreeElement.prototype.addElement = function (element) {
                    this.elements.push(element);
                };
                TreeElement.prototype.acceptsElement = function (type) {
                    if (!this.metaData['acceptedElements']) {
                        return false;
                    }
                    return this.metaData.acceptedElements.indexOf(type) >= 0;
                };
                TreeElement.prototype.setAcceptedElements = function (acceptedElements) {
                    this.metaData['acceptedElements'] = acceptedElements;
                };
                TreeElement.prototype.getAcceptedElements = function () {
                    return this.metaData['acceptedElements'];
                };
                TreeElement.prototype.isDeletable = function () {
                    return true;
                };
                TreeElement.prototype.clone = function () {
                    var result = new TreeElement();
                    result.type = _.clone(this.type);
                    result.dataType = _.clone(this.dataType);
                    result.label = _.clone(this.label);
                    result.scope = _.clone(this.scope);
                    result.elements = [];
                    _.forEach(this.elements, function (element) {
                        result.elements.push(element.clone());
                    });
                    result.metaData = _.clone(this.metaData);
                    return result;
                };
                TreeElement.prototype.toJSONString = function () {
                    var json = {};
                    json.type = this.type;
                    if (this.label && this.label.length > 0) {
                        json.label = this.label;
                    }
                    if (this.scope && this.scope.length > 0) {
                        json.scope = {};
                        json.scope.$ref = "#/properties/" + this.scope;
                    }
                    if (this.rule['effect'].length > 0 && this.rule['condition']['scope'].length > 0 && this.rule['condition']['expectedValue'].length > 0) {
                        json.rule = JSON.parse(JSON.stringify(this.rule));
                        json.rule.condition.scope = {};
                        json.rule.condition.scope.$ref = "#/properties/" + this.rule['condition'].scope;
                    }
                    if (this.metaData['acceptedElements']) {
                        json.elements = [];
                        for (var i = 0; i < this.elements.length; i++) {
                            json.elements.push(JSON.parse(this.elements[i].toJSONString()));
                        }
                    }
                    return JSON.stringify(json, function (key, value) {
                        return value;
                    }, 2);
                };
                TreeElement.prototype.resetErrors = function () {
                    this.errors = [];
                };
                TreeElement.prototype.addError = function (error) {
                    if (!~this.errors.indexOf(error)) {
                        this.errors.push(error);
                    }
                };
                TreeElement.prototype.getErrors = function () {
                    return this.errors;
                };
                TreeElement.prototype.isValid = function () {
                    if (this.errors.length <= 0) {
                        return true;
                    }
                    return false;
                };
                return TreeElement;
            })();
            model.TreeElement = TreeElement;
        })(model = core.model || (core.model = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=treeElement.js.map