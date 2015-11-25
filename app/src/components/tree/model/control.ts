module app.tree {

  export class Control implements TreeElement {
    constructor(private id: number) {}

    getId() : number { return this.id; }

    setId(newId: number) { this.id = newId; }

    getTitle() : string { return "Control"; }

    getNodes() : TreeElement[] { return null; }

    canHaveChildren() : boolean { return false; }
  }

}