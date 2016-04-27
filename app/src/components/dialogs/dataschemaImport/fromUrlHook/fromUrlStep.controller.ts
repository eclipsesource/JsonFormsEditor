module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;

    export class FromUrlHookController extends AbstractWizardStep {

        public url:string;

        constructor(wizard:AbstractWizard, private $http:IHttpService){
            super(wizard);
        }

        getTitle(index: number):string {
            return index+1+". URL";
        }

        getDescription(): string {
            return "Insert the URL from where you want to load your data-schema"
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
                    dataSchema: res.data
                };
                return result;
            });
        }
    }

}