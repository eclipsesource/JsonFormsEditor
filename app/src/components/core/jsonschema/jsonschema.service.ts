module app.core {
    export interface IJsonschemaService {

    }

    class JsonschemaService implements IJsonschemaService {

    }

    angular.module('app.core').service('JsonSchemaService', JsonschemaService);
}