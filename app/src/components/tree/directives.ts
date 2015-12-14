module app.tree {

    // created custom type to solve problems accesing attrs properties
    interface myAttrs extends ng.IAttributes{
        hideIf:string;
    }

    // Code for directives in typescript from http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
    class HideIfDirective {
        public link:(scope:ng.IScope, element:any, attrs:myAttrs) => void;

        constructor() {
            HideIfDirective.prototype.link = (scope:ng.IScope, element:any, attrs:myAttrs) => {
                scope.$watch(attrs.hideIf, function (value) {
                    element.css('visibility', value ? 'visible' : 'hidden');
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

    angular.module('app.tree').directive('hideIf', HideIfDirective.Factory());
}
