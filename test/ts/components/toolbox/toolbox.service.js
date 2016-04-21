/**
 * Created by pancho111203 on 20/12/15.
 */
var app;
(function (app) {
    var toolbox;
    (function (toolbox) {
        var ControlToolboxElement = app.core.model.ControlToolboxElement;
        var ToolboxServiceMemento = app.core.undo.ToolboxServiceMemento;
        var ToolboxService = (function () {
            function ToolboxService(dataschemaService, $q, layoutsService) {
                this.dataschemaService = dataschemaService;
                this.$q = $q;
                this.layoutsService = layoutsService;
                this.elements = [];
                this.currentPath = [];
                this.placedTimes = {};
            }
            /**
             * Adds a new DataschemaProperty into the dataschema and adds the corresponding ToolboxElement.
             * @param property the DataschemaProperty to add
             * @param path the path to the property in the dataschema, e.g. ['person', 'adress']
             * @returns {boolean} true, if the addition was successful
             */
            ToolboxService.prototype.addSchemaElement = function (label, type, config) {
                if (this.dataschemaService.addNewProperty(label, type, config, this.currentPath)) {
                    var element = new ControlToolboxElement(this.dataschemaService.convertNameToLabel(label), type, this.generateScope(label, this.currentPath));
                    this.elements.push(element);
                    return true;
                }
                else {
                    return false;
                }
            };
            ToolboxService.prototype.generateScope = function (label, path) {
                var scope = '';
                if (path.length <= 0) {
                    scope = label;
                }
                else {
                    scope = path.join('/properties/') + '/properties/' + label;
                }
                return scope;
            };
            ToolboxService.prototype.accessFolder = function (folderName) {
                this.currentPath.push(folderName);
                //If folder exists
                if (this.dataschemaService.getFolderAt(this.currentPath)) {
                    this.loadSchemaElements();
                }
                else {
                    this.currentPath.pop();
                }
            };
            ToolboxService.prototype.previousFolder = function () {
                this.currentPath.pop();
                this.loadSchemaElements();
            };
            /**
             * Removes the ControlToolboxElement from the Dataschema.
             *
             * @param element the element to be removed.
             * @returns {boolean} returns true, if the element was successfully removed
             */
            ToolboxService.prototype.removeSchemaElement = function (element) {
                var name = element.getScope();
                var path = this.currentPath;
                if (this.canBeRemoved(element) && this.dataschemaService.removeProperty(name, path)) {
                    return _.remove(this.elements, element).length === 1;
                }
                else {
                    return false;
                }
            };
            ToolboxService.prototype.decreasePlacedTimes = function (scope) {
                var splitted = scope.split('/');
                if (splitted.length > 1) {
                    splitted.pop();
                    // The second pop is to remove the properties subfolder from the scope string
                    splitted.pop();
                    this.decreasePlacedTimes(splitted.join('/'));
                }
                if (!this.placedTimes.hasOwnProperty(scope)) {
                    console.log("ERROR: Placed times of the element is -1");
                    this.placedTimes[scope] = -1;
                }
                else {
                    this.placedTimes[scope] = this.placedTimes[scope] - 1;
                }
            };
            ToolboxService.prototype.increasePlacedTimes = function (scope) {
                var splitted = scope.split('/');
                if (splitted.length > 1) {
                    splitted.pop();
                    // The second pop is to remove the properties subfolder from the scope string
                    splitted.pop();
                    this.increasePlacedTimes(splitted.join('/'));
                }
                //if the element hasnt been added yet to the placedTimesArray
                if (!this.placedTimes.hasOwnProperty(scope)) {
                    this.placedTimes[scope] = 1;
                }
                else {
                    this.placedTimes[scope] = this.placedTimes[scope] + 1;
                }
            };
            ToolboxService.prototype.canBeRemoved = function (element) {
                if (this.placedTimes[element.getScope()] > 0) {
                    return false;
                }
                else {
                    return true;
                }
            };
            ToolboxService.prototype.isAlreadyPlaced = function (element) {
                if (element.datatype === "object" || this.canBeRemoved(element)) {
                    return false;
                }
                return true;
            };
            /**
             * Used for retrieving the data element associated with the given TreeElement.
             * @param treeElement
             * @returns {IPromise<ToolboxElement>}
             */
            ToolboxService.prototype.getAssociatedToolboxElement = function (treeElement) {
                var deffered = this.$q.defer();
                if (treeElement.getType() != 'Control') {
                    //Layouts
                    this.layoutsService.getElementByType(treeElement.getType()).then(function (element) {
                        deffered.resolve(element);
                    });
                }
                else {
                    //Controls
                    deffered.resolve(this.getElementByScope(treeElement.getScope()));
                }
                return deffered.promise;
            };
            /**
             * Used to load a schema into the dataschemaservice(without loading the elements for the toolbar)
             * @param json the json file to load
             */
            ToolboxService.prototype.loadSchema = function (json) {
                this.dataschemaService.loadFromJson(json);
                this.loadSchemaElements();
            };
            /**
             * Used to load the schema elements for the toolbar from a specified folder (uses currentPath)
             */
            ToolboxService.prototype.loadSchemaElements = function () {
                this.elements = this.dataschemaService.convertPropertiesToControls(this.currentPath);
            };
            ToolboxService.prototype.getElementByScope = function (scope) {
                return _.find(this.elements, function (element) {
                    return element.getScope() === scope;
                });
            };
            ToolboxService.prototype.setMemento = function (memento) {
                this.elements = memento.getElements();
                this.placedTimes = memento.getPlacedTimes();
            };
            ToolboxService.prototype.createMemento = function () {
                // we cannot just clone the whole array, since this doesn't preserve the functions on ControlToolboxElement
                var elementsCopy = [];
                _.forEach(this.elements, function (element) {
                    elementsCopy.push(element.clone());
                });
                return new ToolboxServiceMemento(elementsCopy, _.clone(this.placedTimes, true));
            };
            ToolboxService.$inject = ['DataschemaService', '$q', 'LayoutsService'];
            return ToolboxService;
        })();
        toolbox.ToolboxService = ToolboxService;
        angular.module('app.toolbox').service('ToolboxService', ToolboxService);
    })(toolbox = app.toolbox || (app.toolbox = {}));
})(app || (app = {}));
