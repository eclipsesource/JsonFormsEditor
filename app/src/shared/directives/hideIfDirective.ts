module app {

    // created custom type to solve problems accesing attrs properties
    interface hideIfAttrs extends ng.IAttributes{
        hideif:string;
    }

    // Code for directives in typescript from http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
    class HideIfDirective {
        link(scope:ng.IScope, element:any, attrs:hideIfAttrs) : void {
            scope.$watch(attrs.hideif, function (value) {
                element.css('visibility', value ? 'hidden' : 'visible');
            });
        }

        public static Factory() {
            return () => {
                return new HideIfDirective();
            };
        }
    }

    angular.module('app').directive('hideif', HideIfDirective.Factory());
}
