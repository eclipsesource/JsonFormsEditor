/**
 * Created by pancho111203 on 17/02/16.
 */

module app.core.connectors{
    export class GithubFile{
        constructor(private json: any){
        }
        getName(): string{
            return this.json.path;
        }
        getType(): string{
            return this.json.type;
        }
        getUrl(): string{
            return this.json.url;
        }
    }
}