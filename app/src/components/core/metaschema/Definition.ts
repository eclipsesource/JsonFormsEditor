module app.core.metaschema {

  export class Definition {

    constructor(public schema: any, public uiSchema: any, public acceptedElements: any) {}

    getTypeEnum() : string[] {
      return this.schema.properties.type.enum;
    }

  }
}
