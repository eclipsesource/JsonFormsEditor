module app.tree {

  export enum LayoutType {
    HorizontalLayout, VerticalLayout, Group
  }

  export class Layout implements TreeElement {
    private nodes: TreeElement[];

    constructor(private id: number, private type: LayoutType) {
      this.nodes = [];
    }

    getId() : number { return this.id; }

    setId(newId: number) { this.id = newId; }

    getTitle() : string { return LayoutType[this.type]; }

    getNodes() : TreeElement[] { return this.nodes; }

    canHaveChildren() : boolean { return true; }

    addNode(element: TreeElement) : void {
      this.nodes.push(element);
    }
  }

}