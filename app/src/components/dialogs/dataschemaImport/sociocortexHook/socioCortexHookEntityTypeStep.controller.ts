module app.dialogs.dataschemaimport {

    import SocioCortexConnector = app.core.connectors.SocioCortexConnector;
    import IQService = angular.IQService;
    import IDeferred = angular.IDeferred;

    export class SocioCortexEntityTypeStepController extends AbstractWizardStep {

        public selectedEntityType;

        constructor(wizard:AbstractWizard, public sociocortexConnector:SocioCortexConnector, private $q:IQService){
            super(wizard);
        }

        getTitle():string {
            return "EntityType";
        }

        getTemplate():string {
            return "app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexHookEntityTypeStep.html";
        }

        hasNavigation():boolean {
            return true;
        }

        submit():angular.IPromise<any> {
            return this.sociocortexConnector.selectEntityType(this.selectedEntityType).then(() => {
                var deffered :IDeferred<any>= this.$q.defer();

                deffered.resolve(this.sociocortexConnector.generateJSONFromAttributes());

                return deffered.promise;
            });
        }

        shallSubmit():boolean {
            return true;
        }

        selectEntityType(entityType):void {
            this.selectedEntityType = entityType;
            this.wizard.next();
        }
    }
}