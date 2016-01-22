module app.core.undo {
    import ControlToolboxElement = app.core.model.ControlToolboxElement;

    export class ToolboxServiceMemento extends Memento {
        constructor(private elements:ControlToolboxElement[], private placedTimes:{}) {
            super();
        }

        getElements():ControlToolboxElement[] {
            return this.elements;
        }

        getPlacedTimes():{} {
            return this.placedTimes;
        }
    }
}