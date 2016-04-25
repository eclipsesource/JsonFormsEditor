declare var tv4;

module app.core {

    import Metaschema = app.core.metaschema.Metaschema;
    import TreeElement = app.core.model.TreeElement;
    import IQService = angular.IQService;
    import IPromise = angular.IPromise;

    export class ValidatorService {

        static $inject = ['MetaschemaService', '$q'];

        constructor(private metaschemaService: app.core.metaschema.MetaschemaService, private $q: IQService){
        }

        validateUISchema(uiSchema: any): any{
            if(tv4 === undefined){
                return;
            }
            if(!uiSchema){
                return;
            }
            uiSchema = JSON.parse(uiSchema);
            var metaschema: any = this.metaschemaService.getJsonMetaschema();

            if(!metaschema){
                return;
            }
            return tv4.validateMultiple(uiSchema, metaschema);
        }

        validateTreeElement(treeElement:TreeElement):IPromise<boolean> {
            var deferred = this.$q.defer();

            this.metaschemaService.getMetaschema().then((metaschema:Metaschema) => {
                var elementMetaschema = metaschema.getDefinitionByTypeLabel(treeElement.getType()).getMetaschema();

                treeElement.resetErrors();
                var elementUISchema = treeElement.toJSONStringDepurated();
                var valid = tv4.validate(JSON.parse(elementUISchema), elementMetaschema);

                if (!valid) {
                    this.proccessError(treeElement, tv4.error);
                }

                deferred.resolve(valid);
            });

            return deferred.promise;
        }

        private proccessError(treeElement:TreeElement, error:any) {
            var message = error.message;
            var subErrors = error.subErrors || [];

            treeElement.addError(message);

            for (var i = 0; i < subErrors.length; i++) {
                this.proccessError(treeElement, subErrors[i]);
            }
        }

    }
    angular.module('app.core').service('ValidatorService', ValidatorService);
}