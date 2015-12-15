module app.tree {

    // created custom type to solve problems accesing attrs properties
    interface myAttrs extends ng.IAttributes{
        hideif:string;
    }

    // Code for directives in typescript from http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
    class HideIfDirective {
        public link:(scope:ng.IScope, element:any, attrs:myAttrs) => void;

        constructor() {
            HideIfDirective.prototype.link = (scope:ng.IScope, element:any, attrs:myAttrs) => {
                scope.$watch(attrs.hideif, function (value) {
                    element.css('visibility', value ? 'hidden' : 'visible');
                });
            };
        }

        public static Factory() {
            var directive = () => {
                return new HideIfDirective();
            };

            return directive;
        }
    }

    angular.module('app.tree').directive('hideif', HideIfDirective.Factory());
}
