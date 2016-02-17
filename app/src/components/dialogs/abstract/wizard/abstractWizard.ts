module app.dialogs {

    import IDialogService = angular.material.IDialogService;

    export abstract class AbstractWizard extends AbstractDialog {

        private steps:AbstractWizardStep[] = [];
        private stepNumber:number = 0;
        private currentNotification:string = "";
        private notificationTimerId:number;

        constructor($mdDialog:IDialogService) {
            super($mdDialog);
        }

        addSteps(steps:AbstractWizardStep[]):void {
            _.forEach(steps, (step:AbstractWizardStep) => {
                this.steps.push(step);
            });
        }

        getSteps():AbstractWizardStep[] {
            return this.steps;
        }

        currentStep():AbstractWizardStep {
            return this.steps[this.stepNumber];
        }

        goTo(step:AbstractWizardStep):void {
            if (this.isNavigatableStep(step)) {
                this.stepNumber = this.steps.indexOf(step);

                if (this.shallReset() && !this.hasPrevious()) {
                    this.steps = [_.head(this.steps)];
                }
            }
        }

        isLastStep():boolean {
            return this.stepNumber === this.steps.length - 1;
        }

        submit():void {
            this.currentStep().submit().then(() => {
                this.hideDialog();
            });
        }

        hasNext():boolean {
            return this.stepNumber < this.steps.length - 1;
        }

        next():void {
	
          if (this.hasNext()) {
	        console.log('hasNext');
                if (this.currentStep().shallSubmit()) {
		    console.log('shallsubmit');
                    this.currentStep().submit().then(() => {
		        console.log('submittedddddddd');
                        this.stepNumber++;
                    });
                } else {
                    this.stepNumber++;
                }
            } else {
                this.submit();
            }
        }

        isNavigatableStep(step:AbstractWizardStep):boolean {
            return this.steps.indexOf(step) < this.stepNumber;
        }

        showNotification(text: string, time: number):void{
            clearTimeout(this.notificationTimerId);
            this.currentNotification = text;
            this.notificationTimerId = setTimeout(()=>{
                this.currentNotification = "";
            }, time);
        }

        getNotification():string{
            return this.currentNotification;
        }

        shouldDisplayNotification(): boolean{
            return this.currentNotification !== "";
        }

        hasPrevious():boolean {
            return this.stepNumber > 0;
        }

        previous():void {
            if (this.hasPrevious()) {
                this.stepNumber--;

                // if we are on the first step, and resetting is configured, remove all steps except the first
                if (this.shallReset() && !this.hasPrevious()) {
                    this.steps = [_.head(this.steps)];
                }
            }
        }

        getStyle():{} {
            return {
                'width': '' + 100/this.steps.length + '%',
                'text-align': this.steps.length > 1 ? 'center' : 'left'
            }
        }

        abstract shallReset():boolean;
    }
}