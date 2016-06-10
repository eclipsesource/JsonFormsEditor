module app.demo {

    import ToolboxService = app.toolbox.ToolboxService;
    import TreeService = app.tree.TreeService;
    import ValidatorService = app.core.ValidatorService;

    class DemoController {

        static $inject = ['$state', 'ToolboxService', 'TreeService', 'ValidatorService'];

        public text: string = 'Demo is loading...';

        constructor(private $state, private toolboxService: ToolboxService, private treeService: TreeService, private validatorService: ValidatorService) {
            window.addEventListener('message', (event) => {
                window.removeEventListener('message', () => {}, false);
                event.source.window.postMessage('ACK', event.origin);
                var dataschema = event.data.dataSchema;
                var uischema = event.data.uiSchema;
                if (!dataschema) {
                    this.text ='DataSchema is undefined!';
                    return;
                }
                if (!validatorService.validateDataschema(dataschema)) {
                    this.text = 'The Dataschema is not valid';
                    return;
                }
                toolboxService.loadSchema(dataschema);

                if (uischema) {
                    if (!validatorService.validateUISchema(uischema)) {
                        this.text = 'The UISchema is not valid';
                        return;
                    }
                    if (!validatorService.areSchemasCompatible(dataschema, uischema)) {
                        this.text = 'The Dataschema and UISchema are not compatible';
                        return;
                    }
                    treeService.generateTreeFromExistingUISchema(uischema);
                }

                $state.go('edit');

            }, false);
        }

    }

    angular.module('app.demo').controller('DemoController', DemoController);
}