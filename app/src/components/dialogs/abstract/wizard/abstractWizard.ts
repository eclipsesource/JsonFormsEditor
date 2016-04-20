module app.dialogs {

    import IDialogService = angular.material.IDialogService;
    import IScope = angular.IScope;

    export abstract class AbstractWizard extends AbstractDialog {

        private steps:AbstractWizardStep[] = [];
        private stepNumber:number = 0;
        public currentNotification:string = "";
        protected notificationTimerId:number;

        constructor($mdDialog:IDialogService, public $rootScope:IScope) {
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

        currentStepNumber():number {
            return this.stepNumber;
        }

        shouldDisplayNotification(): boolean{
            return this.currentNotification !== "";
        }

        abstract showNotification(text: string):void;

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

        getTextNextButton():string{
            if(this.isLastStep()){
                return 'OK';
            }else{
                return 'Next';
            }
        }

        canSkip():boolean{
            return false;
        }
        skip():void{
        }

        submit():void {
            this.currentStep().submit().then(() => {
                this.hideDialog();
            });
        }

        hasNext():boolean {
            return this.stepNumber < this.steps.length - 1;
        }

        isAllowedToContinue(): boolean {
            return this.currentStep().isAllowedToContinue();
        }

        next():void {
            if(!this.isAllowedToContinue()){
                console.log("Can't continue yet");
                return;
            }
            if (this.hasNext()) {
                if (this.currentStep().shallSubmit()) {
                    this.currentStep().submit().then(() => {
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