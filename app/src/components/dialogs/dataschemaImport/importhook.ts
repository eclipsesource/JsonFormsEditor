module app.dialogs.dataschemaimport {

    export interface ImportHook {
        getTitle():string;

        getIconFont():string;

        openDialog(wizard:AbstractWizard):void;
    }
}