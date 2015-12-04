module app.tree {

    export interface TreeElement {
        getId() : number;
        setId(newId: number) : void;
        getTitle() : string;
        getNodes() : TreeElement[];
        getPropertiesSchema();
        getPropertiesUISchema();
        getPropertiesData();

        /**
         * Indicates wether the element shall be deletable. Can be overriden on a single object with the following syntax:
         *  <pre><code>
         *  object["isDeletable"] = function() { return false; };
         *  </code></pre>
         */
        isDeletable() : boolean;
    }
}