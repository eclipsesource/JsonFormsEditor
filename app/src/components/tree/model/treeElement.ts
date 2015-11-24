module app.tree {

    export interface TreeElement {
        getId() : number;
        getTitle() : string;
        getNodes() : TreeElement[];
        canHaveChildren() : boolean;
    }
}