/// <reference path="../../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

/**
 * Created by pancho111203 on 4/12/15.
 */

module app.core.jsonschema{
    export class JsonSchemaService{
        fields:any[] = [];
        json:any = {};

        loadFromJson(json:any){
            this.json = json;
            this.fields = this.getPropertiesRecursive(json, '');
        }

        // From a json object, returns all the propertie names iinside it recursively and by adding a prefix with its location
        private getPropertiesRecursive(json: any, prefix: string) : any[] {
            var res: any[] = [];

            if(json.hasOwnProperty('properties')) {
                for(var key in json.properties) {
                    if(json.properties.hasOwnProperty(key)){

                        var name = prefix == '' ? key : prefix + '/' + key;

                        var childProps = this.getPropertiesRecursive(json.properties[key], name);
                        if(childProps.length > 0){
                            res = res.concat(childProps);
                        } else {
                            res.push({
                                'name':name,
                                'type':json.properties[key].type
                            });
                        }


                    }

                }
            }
            return res;
        }

        getNames(): string[] {
            return this.fields.map(function(obj){return obj['name'];});

        }

        getFields(): any[]{
            console.log(this.fields.length);
            return this.fields;
        }

        getFieldWithScope(scope: string): any {
            for(var i = 0; i < this.fields.length; i++){
                if(this.fields[i].name == scope) {
                    return this.fields[i];
                }
            }
            return null;
        }
        getDataSchema(): any {
           return this.json;
        }



        // if the 'name' already exists as a property, it gets modified with the new content
        // path is an array of string containing the name of the parent properties in order
        // eg. : ['person', 'appearance', 'head']
        // returns a boolean indicating if the addition was succesful(when false, it means the element was not added)
        addNewProperty(name: string, content:any, path: string[]) : boolean {
            if(!content.hasOwnProperty('type')){
                return false;
            }
            var cur = this.traverseJsonPath(path);
            if(cur==false){
                return false;
            }


            cur[name] = content;
            this.fields.push({
                name: name,
                type: content.type
            });
            return true;
        }

        addSubfolder(name:string, path: string[]): boolean {
            var sub = {
                'type': 'object',
                'properties': {}
            }

            var cur = this.traverseJsonPath(path);
            if(cur == false){
                return false;
            }

            cur[name] = sub;
            return true;
        }

        removeProperty(name: string, path: string[]): boolean {
            console.log(name+'  '+path);
            var cur = this.traverseJsonPath(path);

            console.log(cur);
            if(cur==false || !cur.hasOwnProperty(name)){
                return false;
            }

            return delete cur[name];
        }

        getPropertyContent(name: string, path: string[]): any {
            var cur = this.traverseJsonPath(path);
            if(cur == false || !cur.hasOwnProperty(name)) {
                return false;
            }
            return cur[name];

        }

        private traverseJsonPath(path: string[]): any {
            var cur = this.json;
            var index = 0;
            if(path.length==0){return cur.properties};
            while(index < path.length) {
                if(cur.hasOwnProperty('properties') && cur.properties.hasOwnProperty(path[index])) {
                    cur = cur.properties[path[index]];
                    index++;
                } else {
                    // path doesnt exist
                    return false;
                }
            }

            return cur;
        }
    }
    angular.module("app.core").service("JsonSchemaService", JsonSchemaService);
}

