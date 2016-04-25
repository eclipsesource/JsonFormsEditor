var app;
(function (app) {
    var dialogs;
    (function (dialogs) {
        var AbstractDialog = (function () {
            function AbstractDialog($mdDialog) {
                this.$mdDialog = $mdDialog;
            }
            AbstractDialog.prototype.hideDialog = function () {
                this.$mdDialog.hide();
            };
            return AbstractDialog;
        })();
        dialogs.AbstractDialog = AbstractDialog;
    })(dialogs = app.dialogs || (app.dialogs = {}));
})(app || (app = {}));
//# sourceMappingURL=abstractDialog.js.map