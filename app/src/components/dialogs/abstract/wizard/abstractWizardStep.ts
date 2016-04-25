module app.dialogs {

    import IPromise = angular.IPromise;

    export abstract class AbstractWizardStep {

        constructor(public wizard:AbstractWizard) {

        }

        isActive():boolean {
            return this.wizard.currentStep() === this;
        }

        abstract getTitle(index?:number, stepNumber?:number):string;

        abstract getTemplate():string;

        abstract hasNavigation():boolean;

        abstract shallSubmit():boolean;

        abstract submit():IPromise<any>;

        navigatingToPrevious(){
        }

        getDescription(): string{
            return "";
        }

        isAllowedToContinue(): boolean {
            return true;
        }
    }
}