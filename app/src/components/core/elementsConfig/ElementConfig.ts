module app.core.elementsConfig {
    export class ElementConfig {
        constructor(private typeLabel:string, private description:string, private iconFont:string) {

        }

        getTypeLabel():string {
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