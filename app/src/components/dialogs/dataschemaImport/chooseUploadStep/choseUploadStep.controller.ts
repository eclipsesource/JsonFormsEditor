module app.dialogs.dataschemaimport {
    import AbstractWizardStep = app.dialogs.AbstractWizardStep;
    import IPromise = angular.IPromise;

    export class ChooseUploadStepController extends AbstractWizardStep {

        hasNavigation():boolean {
            return false;
        }


        getTitle(index:number, stepNumber:number):string {
            if(stepNumber===0){
                return "Welcome to the JSON Forms Editor!";
            }
            return index+1+". Welcome";
        }

        getDescription():string{
            return "Please select and option to continue";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/chooseUploadStep/chooseUploadStep.html";
        }

        shallSubmit():boolean {
            return false;
        }

        submit():IPromise<any> {
            return undefined;
        }

    }
}