module app.core.elementsConfig {
    export class ElementConfig {
        constructor(private typeLabel:string, private description:string, private iconFont:string) {

        }

        getName():string {
            return this.typeLabel;
        }

        getDescription():string {
            return this.description;
        }

        getIconFont():string {
            return this.iconFont;
        }
    }
}