module app.tree {

    export interface TreeElement {
        getId() : number;
        setId(newId: number) : void;
        getTitle() : string;
        getNodes() : TreeElement[];
        canHaveChildren() : boolean;
    }
}