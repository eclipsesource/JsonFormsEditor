module app.tree {

    export class TreeService {
        sayHello() : string {
            return "hello";
        }
    }

    angular.module('app.tree')
        .service('TreeService', TreeService);

}