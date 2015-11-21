module app.core.metaschema {

    export class Metaschema {

        private controls:string[] = [];
        private layouts:string[] = [];

        constructor(json:any) {
            _.forEach(json.definitions.control.properties.type.enum, (control:string) => {
                this.controls.push(control);
            });

            _.forEach(json.definitions.layout.properties.type.enum, (layout:string) => {
                this.layouts.push(layout);
            });
        }

        getControls():string[] {
            return this.controls;
        }

        getLayouts():string[] {
            return this.layouts;
        }

    }
}

