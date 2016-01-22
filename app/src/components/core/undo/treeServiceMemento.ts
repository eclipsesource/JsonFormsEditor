module app.core.undo {
    import TreeElement = app.core.model.TreeElement;

    export class TreeServiceMemento extends Memento {

        constructor(private elements:TreeElement[]) {
            super();
        }

        getElements():TreeElement[] {
            return this.elements;
        }
    }
}