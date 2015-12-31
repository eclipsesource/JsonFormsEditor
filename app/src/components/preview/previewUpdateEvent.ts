module app.preview {
    export class PreviewUpdateEvent {

        constructor(private schema:{}, private uiSchema:{}) {

        }

        containsSchema():boolean {
            return this.schema != null && this.schema != undefined;
        }

        containsUiSchema():boolean {
            return this.uiSchema != null && this.uiSchema != undefined;
        }

        getSchema():{} {
            return this.schema;
        }

        getUiSchema():{} {
            return this.uiSchema;
        }
    }
}