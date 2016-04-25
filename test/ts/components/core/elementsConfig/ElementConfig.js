var app;
(function (app) {
    var core;
    (function (core) {
        var elementsConfig;
        (function (elementsConfig) {
            var ElementConfig = (function () {
                function ElementConfig(typeLabel, description, iconFont) {
                    this.typeLabel = typeLabel;
                    this.description = description;
                    this.iconFont = iconFont;
                }
                ElementConfig.prototype.getTypeLabel = function () {
                    return this.typeLabel;
                };
                ElementConfig.prototype.getDescription = function () {
                    return this.description;
                };
                ElementConfig.prototype.getIconFont = function () {
                    return this.iconFont;
                };
                return ElementConfig;
            })();
            elementsConfig.ElementConfig = ElementConfig;
        })(elementsConfig = core.elementsConfig || (core.elementsConfig = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=ElementConfig.js.map