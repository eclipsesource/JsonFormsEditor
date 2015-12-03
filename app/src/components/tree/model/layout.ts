module app.tree {

  export class Layout implements TreeElement {
    private nodes: TreeElement[];
    private propertiesSchema = {};
    private propertiesUISchema = {};
    private propertiesData = {};

    constructor(private id: number, private type: string) {
      this.nodes = [];

      // obtained from the "control" part of the metaSchema
      this.propertiesSchema = {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "type": {
            "type": "string",
            "enum": [
              "HorizontalLayout",
              "VerticalLayout",
              "Group"
            ]
          },
          "label": {
            "type": "string"
          }
        }
      };

      this.propertiesUISchema = {
        "type": "VerticalLayout",
        "elements": [
          {
            "type": "Control",
            "label": "Id",
            "scope": { "$ref": "#/properties/id" },
          },
          {
            "type": "Control",
            "label": "Type",
            "scope": { "$ref": "#/properties/type" },
          },
          {
            "type": "Control",
            "label": "Label",
            "scope": { "$ref": "#/properties/label" },
          }
        ]
      };

      this.propertiesData["id"] = id;
      this.propertiesData["type"] = type;
      this.propertiesData["label"] = "";
    }

    getId() : number { return this.propertiesData["id"]; }

    setId(newId: number) { this.propertiesData["id"] = newId; }

    getTitle() : string { return this.propertiesData["type"]; }

    getNodes() : TreeElement[] { return this.nodes; }

    getPropertiesSchema() { return this.propertiesSchema; }

    getPropertiesUISchema() { return this.propertiesUISchema; }

    getPropertiesData() { return this.propertiesData; }
  }

}