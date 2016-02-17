module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;

    export class FromUrlHookController extends AbstractWizardStep {

        public url:string;

        constructor(wizard:AbstractWizard, private $http:IHttpService){
            super(wizard);
        }

        getTitle():string {
            return "URL";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/fromUrlHook/fromUrlStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        shallSubmit():boolean {
            return true;
        }

        submit():IPromise<any> {
            return this.$http.get(this.url).then((res)=>{
                var result = {
                    dataSchema: res
                };
                return result;
            });
        }
    }

}