module app.dialogs.dataschemaimport {

    export interface ImportHook {
        getTitle():string;

        getDescription():string;

        openDialog():void;
    }
}