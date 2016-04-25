
angular.module('app.toolbox').directive('toolboxFocusInput', function(){
    return function(scope, elem, attrs){
        var inputId = attrs['toolboxFocusInput'];
        if(!inputId){
            return;
        }
        var input = document.getElementById(inputId);

        $(elem).on('click', function(){
            input.focus();
        });
    }
});