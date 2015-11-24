module app.tree {

  export enum LayoutType {
    HorizontalLayout, VerticalLayout
  }

  export class Layout implements TreeElement {
    constructor(private id: number, private type: LayoutType, private nodes: TreeElement[]) {}

    getId() : number { return this.id; }

    getTitle() : string { return LayoutType[this.type]; }

    getNodes() : TreeElement[] { return this.nodes; }

    canHaveChildren() :boolean { return true; }
  }

}