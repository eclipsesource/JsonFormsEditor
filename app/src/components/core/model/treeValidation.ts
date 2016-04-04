/**
 * Created by pancho111203 on 4/04/16.
 */

module app.core {
    export class TreeError{
        constructor(public description:string, fatal:boolean){
        }
    }

    export abstract class Check{
        abstract validate():TreeError;

    }
}