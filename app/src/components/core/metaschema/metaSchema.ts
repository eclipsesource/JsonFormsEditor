/// <reference path="../../../../../typings/lodash/lodash.d.ts" />

module app.core.metaschema {

    export class Metaschema {

        private definitions: string[];
        /*private controls:string[] = [];
        private layouts:string[] = [];*/

        constructor(json:any) {
            this.definitions = [];
            this.definitions.push("Control");
            this.definitions.push("HorizontalLayout");
            this.definitions.push("VerticalLayout");
            this.definitions.push("Group");
            this.definitions.push("Categorization");
            this.definitions.push("Category");
            _.forEach(json.definitions, (definition:string) => {

            })
            /*_.forEach(json.definitions.control.properties.type.enum, (control:string) => {
                this.controls.push(control);
            });

            _.forEach(json.definitions.layout.properties.type.enum, (layout:string) => {
                this.layouts.push(layout);
            });*/
        }

        getDefinitions() : string[] {
            return this.definitions;
        }

        /*getControls():string[] {
            return this.controls;
        }

        getLayouts():string[] {
            return this.layouts;
        }*/

    }
}

