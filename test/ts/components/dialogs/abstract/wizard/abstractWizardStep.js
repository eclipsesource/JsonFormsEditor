var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var AbstractWizardStep = (function () {
            function AbstractWizardStep(wizard) {
                this.wizard = wizard;
            }
            AbstractWizardStep.prototype.isActive = function () {
                return this.wizard.currentStep() === this;
            };
            AbstractWizardStep.prototype.getDescription = function () {
                return "";
            };
            AbstractWizardStep.prototype.isAllowedToContinue = function () {
                return true;
            };
            return AbstractWizardStep;
        })();
        dialogs.AbstractWizardStep = AbstractWizardStep;
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=abstractWizardStep.js.map