var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var AbstractWizard = (function (_super) {
            __extends(AbstractWizard, _super);
            function AbstractWizard($mdDialog, $rootScope) {
                _super.call(this, $mdDialog);
                this.$rootScope = $rootScope;
                this.steps = [];
                this.stepNumber = 0;
                this.currentNotification = "";
            }
            AbstractWizard.prototype.addSteps = function (steps) {
                var _this = this;
                _.forEach(steps, function (step) {
                    _this.steps.push(step);
                });
            };
            AbstractWizard.prototype.getSteps = function () {
                return this.steps;
            };
            AbstractWizard.prototype.currentStep = function () {
                return this.steps[this.stepNumber];
            };
            AbstractWizard.prototype.currentStepNumber = function () {
                return this.stepNumber;
            };
            AbstractWizard.prototype.shouldDisplayNotification = function () {
                return this.currentNotification !== "";
            };
            AbstractWizard.prototype.goTo = function (step) {
                if (this.isNavigatableStep(step)) {
                    this.stepNumber = this.steps.indexOf(step);
                    if (this.shallReset() && !this.hasPrevious()) {
                        this.steps = [_.head(this.steps)];
                    }
                }
            };
            AbstractWizard.prototype.isLastStep = function () {
                return this.stepNumber === this.steps.length - 1;
            };
            AbstractWizard.prototype.getTextNextButton = function () {
                if (this.isLastStep()) {
                    return 'OK';
                }
                else {
                    return 'Next';
                }
            };
            AbstractWizard.prototype.canSkip = function () {
                return false;
            };
            AbstractWizard.prototype.skip = function () {
            };
            AbstractWizard.prototype.submit = function () {
                var _this = this;
                this.currentStep().submit().then(function () {
                    _this.hideDialog();
                });
            };
            AbstractWizard.prototype.hasNext = function () {
                return this.stepNumber < this.steps.length - 1;
            };
            AbstractWizard.prototype.isAllowedToContinue = function () {
                return this.currentStep().isAllowedToContinue();
            };
            AbstractWizard.prototype.next = function () {
                var _this = this;
                if (!this.isAllowedToContinue()) {
                    console.log("Can't continue yet");
                    return;
                }
                if (this.hasNext()) {
                    if (this.currentStep().shallSubmit()) {
                        this.currentStep().submit().then(function () {
                            _this.stepNumber++;
                        });
                    }
                    else {
                        this.stepNumber++;
                    }
                }
                else {
                    this.submit();
                }
            };
            AbstractWizard.prototype.isNavigatableStep = function (step) {
                return this.steps.indexOf(step) < this.stepNumber;
            };
            AbstractWizard.prototype.hasPrevious = function () {
                return this.stepNumber > 0;
            };
            AbstractWizard.prototype.previous = function () {
                if (this.hasPrevious()) {
                    this.stepNumber--;
                    // if we are on the first step, and resetting is configured, remove all steps except the first
                    if (this.shallReset() && !this.hasPrevious()) {
                        this.steps = [_.head(this.steps)];
                    }
                }
            };
            AbstractWizard.prototype.getStyle = function () {
                return {
                    'width': '' + 100 / this.steps.length + '%',
                    'text-align': this.steps.length > 1 ? 'center' : 'left'
                };
            };
            return AbstractWizard;
        })(dialogs.AbstractDialog);
        dialogs.AbstractWizard = AbstractWizard;
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=abstractWizard.js.map