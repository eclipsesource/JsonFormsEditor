module app.core.connectors {
    import IHttpService = angular.IHttpService;
    import IPromise = angular.IPromise;
    export class SocioCortexConnector {

        private serverURL:string;
        private encodedLoginData:string;

        private workspaces;
        private entityTypes;
        private selectedEntityType:any = null;
        private attributes;

        static $inject = ['$http'];

        constructor(private $http:IHttpService) {

        }

        isLoggedWithSocioCortex():boolean {
            return this.selectedEntityType != null;
        }

        login(serverURL:string, username:string, password:string):IPromise<any> {
            this.serverURL = serverURL;

            this.encodedLoginData = window.btoa(username + ":" + password);

            return this.$http.get(serverURL + '/users/me', {
                headers: {'Authorization': 'Basic ' + this.encodedLoginData}
            }).success((response) => {
                this.$http.get(serverURL + '/workspaces', {
                    headers: {'Authorization': 'Basic ' + this.encodedLoginData}
                }).success((response) => {
                    this.workspaces = response;
                });
            });
        }

        getWorkspaces() {
            return this.workspaces;
        }

        selectWorkspace(workspace:any):IPromise<any> {
            this.entityTypes = [];
            return this.$http.get(this.serverURL + '/workspaces/' + workspace.id + '/entityTypes', {
                    headers: {'Authorization': 'Basic ' + this.encodedLoginData}
                }).success((response:any) => {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].name != "Text Page")
                            this.entityTypes.push(response[i]);
                    }
                });
        }

        getEntityTypes() {
            return this.entityTypes;
        }

        selectEntityType(entityType:any):IPromise<any> {
            this.selectedEntityType = null;
            this.attributes = [];

            return this.$http.get(this.serverURL + '/entityTypes/' + entityType.id, {
                    headers: {'Authorization': 'Basic ' + this.encodedLoginData}
                }).then((response:any) => {
                    this.selectedEntityType = response.data;
                    //this.attributes.push({'name': response.data.name + ' Name', 'attributeType': 'Text'});
                    var propertiesReduced = response.data.attributeDefinitions;
                    for (var i = 0; i < propertiesReduced.length; i++) {
                        var nestedPromise:IPromise<any> = this.$http.get(this.serverURL + '/attributeDefinitions/' + propertiesReduced[i].id, {
                                headers: {'Authorization': 'Basic ' + this.encodedLoginData}
                            }).success((response:any) => {
                                this.attributes.push(response);
                            });
                        if (i == propertiesReduced.length - 1) return nestedPromise;
                    }
                });
        }

        public generateJSONFromAttributes():any {
            var json:any = {
                "type": "object",
                "properties": {}
            };

            for (var i = 0; i < this.attributes.length; i++) {
                json = this.generatePropertyFromAttribute(json, this.attributes[i]);
            }

            return json;
        }

        private generatePropertyFromAttribute(json:any, attribute:any):any {
            var propertyName:string = attribute.name.toLowerCase().replace(/\s+/g, '_');

            var propertyValue:any = {};
            switch (attribute.attributeType) {
                case "Text":
                    propertyValue.type = "string";
                    break;
                case "Number":
                    propertyValue.type = "number";
                    break;
                case "Enumeration":
                    propertyValue.type = "string";
                    propertyValue.enum = attribute.options.enumerationValues;
                    break;
                case "Date":
                    propertyValue.type = "string";
                    propertyValue.format = "date-time";
                    break;
                default:
                    propertyValue.type = "string";
            }

            json.properties[propertyName] = propertyValue;

            return json;
        }

        getViewModel() {
            if (!this.selectedEntityType.viewModel) return null;
            return JSON.parse(this.selectedEntityType.viewModel);
        }

        saveViewModel(uiSchema:string):IPromise<any> {
            this.selectedEntityType.viewModel = uiSchema;
            return this.$http.put(this.serverURL + '/entityTypes/' + this.selectedEntityType.id, this.selectedEntityType, {
                headers: {'Authorization': 'Basic ' + this.encodedLoginData}
            });
        }
    }

    angular.module('app.core').service('SocioCortexConnector', SocioCortexConnector);
}