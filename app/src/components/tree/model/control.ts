module app.tree {

  export class Control implements TreeElement {
    constructor(private id: number) {}

    getId() : number { return this.id; }

    getTitle() : string { return "Control"; }

    getNodes() : TreeElement[] { return null; }

    canHaveChildren() : boolean { return false; }
  }

}