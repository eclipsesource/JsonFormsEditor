module app.dialogs.dataschemaimport {

    import IDialogService = angular.material.IDialogService;
    import IHttpService = angular.IHttpService;
    import ToolboxService = app.toolbox.ToolboxService;

    export class SociocortexHookController {

        static $inject = ['$mdDialog', '$http', 'ToolboxService'];

        public selectedIndex:number = 0;

        public username:string;
        public password:string;
        public workspaces:any = [];
        public workspaceClicked:any;
        public entityTypes:any = [];
        public entityTypeClicked:any;
        public attributes:any = [];

        constructor(private $mdDialog:IDialogService, private $http:IHttpService, private toolboxService:ToolboxService) {

        }

        login():void {
            this.workspaces = [];
            this.entityTypes = [];
            this.attributes = [];

            var encodedLoginData = window.btoa(this.username + ":" + this.password);

            this.$http.get('http://server.sociocortex.com/api/v1/workspaces', {
                headers: {'Authorization': 'Basic ' + encodedLoginData}
            }).success((response:any) => {
                this.workspaces = response;
                this.selectedIndex++;
            }).error((error:any) => {
                console.log(error);
            });
        }

        workspaceOnClick(workspace:any) {
            this.entityTypes = [];
            this.attributes = [];

            this.workspaceClicked = workspace;

            this.$http.get('http://server.sociocortex.com/api/v1/workspaces/' + workspace.id + '/entityTypes')
            .success((response:any) => {
                for (var i = 0; i < response.length; i++) {
                    if (response[i].name != "Text Page")
                        this.entityTypes.push(response[i]);
                }
                this.selectedIndex++;
            }).error((error:any) => {
                console.log(error);
            })
        }

        entityTypeOnClick(entityType:any) {
            this.attributes = [];

            this.entityTypeClicked = entityType;

            this.$http.get('http://server.sociocortex.com/api/v1/entityTypes/' + entityType.id)
                .success((response:any) => {
                    this.attributes.push({'name': response.name + ' Name', 'attributeType': 'Text'});
                    var propertiesReduced = response.attributeDefinitions;
                    for (var i = 0; i < propertiesReduced.length; i++) {
                        this.$http.get('http://server.sociocortex.com/api/v1/attributeDefinitions/' + propertiesReduced[i].id)
                            .success((response:any) => {
                                this.attributes.push(response);
                            }).error((error:any) => {
                                console.log(error);
                        });
                    }
                    this.selectedIndex++;
                }).error((error:any) => {
                    console.log(error);
            });
        }

        complete():void {
            /*this.$http.get(this.url).success((json:any) => {
                this.toolboxService.loadSchemaElements(json);
                this.$mdDialog.hide();
            }).error((error:any) => {
                console.log(error);
            });*/
            var json:any = this.generateJSONFromAttributes();
            this.toolboxService.loadSchema(json);
            console.log(json);
            this.$mdDialog.hide();
        }

        cancel():void {
            this.$mdDialog.hide();
        }

        private generateJSONFromAttributes():any {
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
    }
}