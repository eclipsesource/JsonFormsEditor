var app;
(function (app) {
    // Code for directives in typescript from http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
    var HideIfDirective = (function () {
        function HideIfDirective() {
        }
        HideIfDirective.prototype.link = function (scope, element, attrs) {
            scope.$watch(attrs.hideif, function (value) {
                element.css('visibility', value ? 'hidden' : 'visible');
            });
        };
        HideIfDirective.Factory = function () {
            return function () {
                return new HideIfDirective();
            };
        };
        return HideIfDirective;
    })();
    angular.module('app').directive('hideif', HideIfDirective.Factory());
})(app || (app = {}));
