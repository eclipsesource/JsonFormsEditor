module app.layouts {
    import LayoutToolboxElement = app.core.model.LayoutToolboxElement;
    import IPromise = angular.IPromise;
    import IDeferred = angular.IDeferred;
    import ElementConfig = app.core.elementsConfig.ElementConfig;
    import MetaschemaService = app.core.metaschema.MetaschemaService;
    import ElementsConfigService = app.core.elementsConfig.ElementsConfigService;
    import IQService = angular.IQService;
    import Metaschema = app.core.metaschema.Metaschema;
    import Definition = app.core.metaschema.Definition;

    export class LayoutsService {

        public elements:LayoutToolboxElement[];

        static $inject = ['$q', 'MetaschemaService', 'ElementsConfigService'];

        constructor(private $q:IQService, private metaschemaService:MetaschemaService, private elementsConfigService:ElementsConfigService) {
            this.getElements().then((elements : LayoutToolboxElement[]) => {
               this.elements = elements;
            });
        }

        public getElementByType(type:string):IPromise<LayoutToolboxElement> {
            var deffered:IDeferred<LayoutToolboxElement> = this.$q.defer();

            this.getElements().then((elements:LayoutToolboxElement[]) => {
                deffered.resolve(_.find(elements, (element:LayoutToolboxElement) => {
                    return element.getType() === type;
                }));
            });

            return deffered.promise;
        }

        private getElements():IPromise<LayoutToolboxElement[]> {
            var deffered:IDeferred<LayoutToolboxElement[]> = this.$q.defer();

            this.metaschemaService.getMetaschema().then((schema:Metaschema) => {
                this.elementsConfigService.getElements().then((configElements:ElementConfig[]) => {
                    var result:LayoutToolboxElement[] = [];

                    _.forEach(schema.getDefinitions(), (definition:Definition) => {
                        _.forEach(definition.getTypeLabels(), (type:string)=> {
                            //Ignore control, as it's handled on the controltoolbox
                            if (type === 'Control') {
                                return;
                            }
                            var configElement = _.find(configElements, (element:ElementConfig) => {
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
        }
    }

    angular.module('app.layouts').service('LayoutsService', LayoutsService);
}