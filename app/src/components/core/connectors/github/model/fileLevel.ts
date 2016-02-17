module app.core.connectors{
    export class GithubFileLevel{
	private files: GithubFile[];
	private childs: any = {};
	constructor(initialData: Array<any>, private parentLevel: GithubFileLevel){
	    this.files = initialData.map(function (obj) {
		    return new GithubFile(obj);
		});
	}	      	
	getFiles():GithubFile[]{
	    return this.files;
	}

	getParent():GithubFileLevel{
	 
	    return this.parentLevel;
	}
	hasParent():boolean{
	    return this.parentLevel!==null;
	}
	getChild(name:string):GithubFileLevel{
	    return this.childs[name];
	}
        addChild(name: string, child: GithubFileLevel): void{
            this.childs[name] = child;
	}
     	       
    }
}