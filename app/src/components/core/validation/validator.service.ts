/**
 * Created by pancho111203 on 6/04/16.
 */

declare var tv4;

module app.core {

    import Metaschema = app.core.metaschema.Metaschema;

    export class ValidatorService {

        static $inject = ['MetaschemaService'];

        constructor(private metaSchemaService: app.core.metaschema.MetaschemaService){
        }

        validateUISchema(uiSchema: any){
            if(tv4 === undefined){
                return;
            }
            uiSchema = JSON.parse(uiSchema);
            var metaschema: any = this.metaSchemaService.getJsonMetaschema();

            if(!metaschema){
                return;
            }

            console.log(uiSchema);
            console.log(metaschema);
            var validation = tv4.validateMultiple(uiSchema, metaschema);
            console.log(validation);
        }

    }
    angular.module('app.core').service('ValidatorService', ValidatorService);
}