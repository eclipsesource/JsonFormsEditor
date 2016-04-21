var app;
(function (app) {
    var layouts;
    (function (layouts) {
        var LayoutToolboxElement = app.core.model.LayoutToolboxElement;
        var LayoutsService = (function () {
            function LayoutsService($q, metaschemaService, elementsConfigService) {
                var _this = this;
                this.$q = $q;
                this.metaschemaService = metaschemaService;
                this.elementsConfigService = elementsConfigService;
                this.getElements().then(function (elements) {
                    _this.elements = elements;
                });
            }
            LayoutsService.prototype.getElementByType = function (type) {
                var deffered = this.$q.defer();
                this.getElements().then(function (elements) {
                    deffered.resolve(_.find(elements, function (element) {
                        return element.getType() === type;
                    }));
                });
                return deffered.promise;
            };
            LayoutsService.prototype.getElements = function () {
                var _this = this;
                var deffered = this.$q.defer();
                this.metaschemaService.getMetaschema().then(function (schema) {
                    _this.elementsConfigService.getElements().then(function (configElements) {
                        var result = [];
                        _.forEach(schema.getDefinitions(), function (definition) {
                            _.forEach(definition.getTypeLabels(), function (type) {
                                //Ignore control, as it's handled on the controltoolbox
                                if (type === 'Control') {
                                    return;
                                }
                                var configElement = _.find(configElements, function (element) {
                                    return element.getTypeLabel() === type;
                                });
                                var element = new LayoutToolboxElement(type, type, configElement);
                                element.setAcceptedElements(definition.getAcceptedElements());
                                result.push(element);
                            });
                        });
                        deffered.resolve(result);
                    });
                });
                return deffered.promise;
            };
            LayoutsService.$inject = ['$q', 'MetaschemaService', 'ElementsConfigService'];
            return LayoutsService;
        })();
        layouts.LayoutsService = LayoutsService;
        angular.module('app.layouts').service('LayoutsService', LayoutsService);
    })(layouts = app.layouts || (app.layouts = {}));
})(app || (app = {}));
