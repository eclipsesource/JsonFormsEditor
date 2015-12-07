module app.core.metaschema {

  export class Definition {

    constructor(public schema: any, public uiSchema: any, public initialData: any) {}

    getTypeEnum() : string[] {
      return this.schema.properties.type.enum;
    }

  }
}
