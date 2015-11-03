module app.tree {

    export class TreeService {
        sayHello() : string {
            return "world!";
        }
    }

    angular.module('app.tree')
        .service('TreeService', TreeService);

}